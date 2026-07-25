import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ramp = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));

/* track theme so the space adapts: glowing stars at night,
   ink specks on paper by day */
function useThemeMode() {
    const [mode, setMode] = useState(
        document.documentElement.dataset.theme === "day" ? "day" : "night"
    );
    useEffect(() => {
        const read = () =>
            setMode(document.documentElement.dataset.theme === "day" ? "day" : "night");
        const observer = new MutationObserver(read);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });
        return () => observer.disconnect();
    }, []);
    return mode;
}

const PALETTES = {
    night: { base: "#FFFFFF", aqua: "#A78BFF", magenta: "#DD62ED" },
    day: { base: "#1A1226", aqua: "#6A34C9", magenta: "#9B00C8" },
};

/* one long tube of stars the camera flies through */
function Stars({ mode }) {
    const N = 2400;
    const { positions, colors } = useMemo(() => {
        const pos = new Float32Array(N * 3);
        const col = new Float32Array(N * 3);
        const palette = PALETTES[mode];
        const base = new THREE.Color(palette.base);
        const aqua = new THREE.Color(palette.aqua);
        const magenta = new THREE.Color(palette.magenta);
        for (let i = 0; i < N; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
            pos[i * 3 + 2] = 12 - Math.random() * 85;
            const roll = Math.random();
            const c = roll < 0.12 ? aqua : roll < 0.2 ? magenta : base;
            // vary brightness so depth reads
            const f = 0.45 + Math.random() * 0.55;
            col[i * 3] = c.r * f;
            col[i * 3 + 1] = c.g * f;
            col[i * 3 + 2] = c.b * f;
        }
        return { positions: pos, colors: col };
    }, [mode]);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={N} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={N} array={colors} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                vertexColors
                size={0.09}
                sizeAttenuation
                transparent
                opacity={0.95}
                depthWrite={false}
                blending={mode === "night" ? THREE.AdditiveBlending : THREE.NormalBlending}
            />
        </points>
    );
}

/* a glowing portal ring the camera passes through */
function PortalRing({ z, color, spin = 1 }) {
    const group = useRef();
    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.z = state.clock.elapsedTime * 0.18 * spin;
    });
    return (
        <group ref={group} position={[0, 0, z]}>
            <mesh>
                <torusGeometry args={[3.4, 0.045, 16, 120]} />
                <meshBasicMaterial color={color} transparent opacity={0.95} />
            </mesh>
            {/* soft halo */}
            <mesh scale={1.07}>
                <torusGeometry args={[3.4, 0.09, 16, 120]} />
                <meshBasicMaterial color={color} transparent opacity={0.22} />
            </mesh>
            {/* orbiting beads on the rim */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <mesh
                    key={i}
                    position={[
                        Math.cos((i / 6) * Math.PI * 2) * 3.4,
                        Math.sin((i / 6) * Math.PI * 2) * 3.4,
                        0,
                    ]}
                >
                    <sphereGeometry args={[0.09, 12, 12]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            ))}
        </group>
    );
}

/* soft nebula glow planes — night only (additive needs a dark bg) */
function Nebula() {
    const texture = useMemo(() => {
        const c = document.createElement("canvas");
        c.width = c.height = 256;
        const g = c.getContext("2d");
        const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
        grad.addColorStop(0, "rgba(255,255,255,0.5)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = grad;
        g.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(c);
    }, []);

    const planes = [
        { pos: [-7, 4, -24], color: "#E14EFF", scale: 16, o: 0.16 },
        { pos: [8, -5, -42], color: "#A78BFF", scale: 20, o: 0.13 },
        { pos: [3, 6, -60], color: "#7C4DFF", scale: 18, o: 0.14 },
    ];

    return planes.map((n, i) => (
        <mesh key={i} position={n.pos} scale={n.scale}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                map={texture}
                color={n.color}
                transparent
                opacity={n.o}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    ));
}

/* camera travels forward through the entry ring, the star field,
   and out through the exit ring — all scrubbed from scroll.
   During the approach (before the pin) the camera pulls in from
   further back, so the portal is already flying toward you while
   the hero is still leaving the screen. */
function Rig({ progress, approach }) {
    const invalidate = useThree((s) => s.invalidate);

    /* demand frameloop: the flight is fully scroll-scrubbed, so only
       re-render when either progress value moves */
    useEffect(() => {
        const unsubs = [progress, approach].filter(Boolean).map((mv) =>
            mv.on("change", () => invalidate())
        );
        return () => unsubs.forEach((u) => u());
    }, [progress, approach, invalidate]);

    useFrame(({ camera, clock }) => {
        const p = progress.get();
        const a = approach ? approach.get() : 1;
        const travel = ramp(p, 0.04, 0.96);
        camera.position.z = 9 + (1 - a) * 8 - travel * 72;
        // gentle drift so the flight feels piloted, not on rails
        camera.position.x = Math.sin(clock.elapsedTime * 0.3) * 0.35;
        camera.position.y = Math.cos(clock.elapsedTime * 0.22) * 0.25;
        camera.lookAt(camera.position.x * 0.5, camera.position.y * 0.5, camera.position.z - 10);
    });
    return null;
}

export default function AboutSpaceCanvas({ progress, approach }) {
    const mode = useThemeMode();

    return (
        <Canvas
            className="about-space-canvas"
            frameloop="demand"
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
            camera={{ position: [0, 0, 9], fov: 40 }}
        >
            <Rig progress={progress} approach={approach} />
            <Stars mode={mode} />
            {mode === "night" && <Nebula />}
            {/* single portal ring marks the way out of the flight */}
            <PortalRing z={-58} color={PALETTES[mode].magenta} spin={-1} />
        </Canvas>
    );
}
