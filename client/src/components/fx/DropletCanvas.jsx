import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* 0→1 ramp of p across [a, b] */
const ramp = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));

/* real teardrop silhouette: spherical belly, tapering tail pulled upward.
   Built as a lathe profile — x(t) closes to the axis at both ends. */
function makeTeardropGeometry() {
    const points = [];
    const N = 72;
    for (let i = 0; i <= N; i++) {
        const t = i / N; // 0 = bottom of the drop, 1 = tail tip
        // rounder belly, shorter softer tail — real raindrop, not cartoon
        const x = Math.sin(Math.PI * t) * (1 - 0.4 * t * t);
        const y = -Math.cos(Math.PI * t) + Math.pow(t, 3.2) * 0.55;
        points.push(new THREE.Vector2(x, y));
    }
    return new THREE.LatheGeometry(points, 96);
}

/* read the current CSS water + background colors, track theme switches */
function useThemeColors() {
    const [colors, setColors] = useState({ water: "#A78BFF", bg: "#050109" });

    useEffect(() => {
        const read = () => {
            const style = getComputedStyle(document.documentElement);
            setColors({
                water: style.getPropertyValue("--color-water").trim() || "#A78BFF",
                bg: style.getPropertyValue("--color-bg").trim() || "#050109",
            });
        };
        read();
        const observer = new MutationObserver(read);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });
        return () => observer.disconnect();
    }, []);

    return colors;
}

/**
 * The 3D scene: a glassy droplet falls onto a glowing dot; on impact the
 * dot squashes and three rings ripple outward on a tilted plane so the
 * expansion reads with real perspective. Everything is scrubbed from the
 * framer-motion progress MotionValue — no internal timeline.
 */
function Scene({ progress, accent, bg }) {
    const dropRef = useRef();
    const dotRef = useRef();
    const ringRefs = [useRef(), useRef(), useRef()];
    const teardrop = useMemo(() => makeTeardropGeometry(), []);

    const RINGS = [
        { start: 0.36, end: 0.6, max: 2.6, peak: 0.75 },
        { start: 0.4, end: 0.66, max: 2.0, peak: 0.55 },
        { start: 0.44, end: 0.72, max: 1.4, peak: 0.4 },
    ];

    useFrame((state) => {
        const p = progress.get();
        const t = state.clock.elapsedTime;

        /* --- falling droplet: falls, reaches, then MERGES into the dot --- */
        if (dropRef.current) {
            const fall = ramp(p, 0.02, 0.3);
            // liquid attraction: just before contact the drop reaches for the dot
            const attract = ramp(p, 0.26, 0.3);
            // absorption: volume flows into the dot instead of popping away
            const absorb = ramp(p, 0.3, 0.4);
            dropRef.current.position.y = (1 - fall) * 5.5 - absorb * 0.04;
            const stretch = 1 + Math.sin(fall * Math.PI) * 0.35 + attract * 0.3;
            // widen slightly while draining down to nothing — surface-tension merge
            const shrink = 1 - absorb;
            const w = 0.07 * (1 + absorb * 0.4) * shrink;
            dropRef.current.scale.set(w, Math.max(0.07 * stretch * shrink, 0.001), w);
            // gentle sway so the tail silhouette reads in 3D
            dropRef.current.rotation.z = Math.sin(t * 2.2) * 0.06;
            dropRef.current.rotation.y = t * 0.6;
            dropRef.current.visible = p < 0.4 && p > 0.005;
        }

        /* --- the dot: anticipates, swells as it absorbs, settles, fades --- */
        if (dotRef.current) {
            const pulse = 1 + Math.sin(t * 2.6) * 0.12;
            // slight swell in anticipation as the drop closes in
            const bulge = 1 + ramp(p, 0.26, 0.3) * 0.15;
            // grows while drinking the droplet's volume
            const absorbed = 1 + ramp(p, 0.3, 0.4) * 0.55;
            // soft wobble settle after the merge: 1 → 1.18 → 0.94 → 1
            const k = ramp(p, 0.4, 0.52);
            const settle =
                k <= 0 ? 1 :
                1 + Math.sin(k * Math.PI * 2) * 0.18 * (1 - k);
            const fade = 1 - ramp(p, 0.5, 0.58);
            dotRef.current.scale.setScalar(0.045 * pulse * bulge * absorbed * settle);
            dotRef.current.material.opacity = fade;
            dotRef.current.visible = fade > 0.01;
        }

        /* --- perspective ripple rings --- */
        RINGS.forEach((ring, i) => {
            const mesh = ringRefs[i].current;
            if (!mesh) return;
            const k = ramp(p, ring.start, ring.end);
            mesh.scale.setScalar(0.05 + k * ring.max);
            mesh.material.opacity = k <= 0 ? 0 : (1 - k) * ring.peak;
            mesh.visible = k > 0 && k < 1;
        });
    });

    return (
        <>
            {/* backdrop plane matching the page bg — transmission must have
                something in-scene to refract or the glass interior goes black */}
            <mesh position={[0, 0, -14]}>
                <planeGeometry args={[80, 50]} />
                <meshBasicMaterial color={bg} />
            </mesh>

            <ambientLight intensity={0.55} />
            <directionalLight position={[4, 6, 5]} intensity={1.4} />
            <directionalLight position={[-5, -2, 3]} intensity={0.5} />
            <pointLight position={[0, 0, -4]} intensity={1.2} color={accent} />

            {/* liquid glass droplet — env-lit, tinted by absorption */}
            <mesh ref={dropRef} geometry={teardrop}>
                <meshPhysicalMaterial
                    color="#ffffff"
                    transmission={1}
                    thickness={1.6}
                    roughness={0.03}
                    ior={1.33}
                    clearcoat={1}
                    clearcoatRoughness={0.05}
                    iridescence={0.35}
                    iridescenceIOR={1.3}
                    attenuationColor={accent}
                    attenuationDistance={1.6}
                    envMapIntensity={1.3}
                />
            </mesh>

            {/* glowing landing dot */}
            <mesh ref={dotRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color={accent}
                    emissive={accent}
                    emissiveIntensity={1.8}
                    transparent
                />
            </mesh>

            {/* ripple rings on a tilted plane for 3D perspective */}
            <group rotation={[-1.15, 0, 0]}>
                {RINGS.map((_, i) => (
                    <mesh ref={ringRefs[i]} key={i} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1, 0.012, 12, 128]} />
                        <meshBasicMaterial color={accent} transparent opacity={0} />
                    </mesh>
                ))}
            </group>
        </>
    );
}

export default function DropletCanvas({ progress }) {
    const { water: accent, bg } = useThemeColors();

    return (
        <Canvas
            className="droplet-canvas"
            dpr={[1.5, 3]}
            gl={{ antialias: true, alpha: true }}
            camera={{ position: [0, 0.4, 8], fov: 32 }}
            onCreated={({ gl, scene }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                /* studio environment map — transmission and clearcoat need
                   something to refract/reflect or the glass reads as plastic */
                const pmrem = new THREE.PMREMGenerator(gl);
                scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
                pmrem.dispose();
            }}
        >
            <Scene progress={progress} accent={accent} bg={bg} />
        </Canvas>
    );
}
