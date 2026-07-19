import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../public/bradley_profile.jpg', () => ({ default: 'bradley_profile.jpg' }));
vi.mock('../public/Bradley_s_Resume.pdf', () => ({ default: 'resume.pdf' }));
const MOTION_PROPS = new Set([
  'initial', 'animate', 'exit', 'transition', 'variants', 'whileHover',
  'whileFocus', 'whileTap', 'whileDrag', 'whileInView', 'layout',
  'layoutId', 'drag', 'dragConstraints', 'onAnimationStart', 'onAnimationComplete',
]);

vi.mock('framer-motion', () => {
  const mockMotionValue = () => ({ get: () => 0, set: () => {}, on: () => () => {} });
  return {
    motion: new Proxy({}, { get: (_, tag) => ({ children, ...props }) => {
      const Tag = typeof tag === 'string' ? tag : 'div';
      const domProps = Object.fromEntries(
        Object.entries(props).filter(([k]) => !MOTION_PROPS.has(k) && k !== 'style')
      );
      return <Tag {...domProps}>{children}</Tag>;
    }}),
    useMotionValue: mockMotionValue,
    useSpring: mockMotionValue,
    useTransform: mockMotionValue,
    useInView: () => false,
  };
});

import HomePage from '../components/HomePage';

describe('HomePage', () => {
  beforeEach(() => {
    document.getElementById = vi.fn().mockReturnValue(null);
  });

  it('renders name heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /Bradley Eugene Sakran/i })).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<HomePage />);
    expect(screen.getByText(/AI \/ ML \/ Backend/i)).toBeInTheDocument();
  });

  it('renders profile image with alt text', () => {
    render(<HomePage />);
    expect(screen.getByAltText(/Bradley Eugene Sakran/i)).toBeInTheDocument();
  });

  it('renders Get in Touch and View Resume buttons', () => {
    render(<HomePage />);
    expect(screen.getByRole('button', { name: /Get in Touch/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View Resume/i })).toBeInTheDocument();
  });

  it('View Resume opens PDF in new tab', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<HomePage />);
    await userEvent.click(screen.getByRole('button', { name: /View Resume/i }));
    expect(openSpy).toHaveBeenCalledWith('resume.pdf', '_blank');
    openSpy.mockRestore();
  });

  it('Get in Touch scrolls to contact section', async () => {
    const mockScrollIntoView = vi.fn();
    document.getElementById = vi.fn().mockReturnValue({ scrollIntoView: mockScrollIntoView });
    render(<HomePage />);
    await userEvent.click(screen.getByRole('button', { name: /Get in Touch/i }));
    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});
