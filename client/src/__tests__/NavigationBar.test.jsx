import { render as rtlRender, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import NavigationBar from '../components/NavigationBar';

const render = (ui) => rtlRender(<MemoryRouter>{ui}</MemoryRouter>);

describe('NavigationBar', () => {
  beforeEach(() => {
    document.getElementById = vi.fn().mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders monogram', () => {
    render(<NavigationBar />);
    expect(screen.getByRole('button', { name: /Back to top/i })).toBeInTheDocument();
  });

  it('renders Home, About, Work, Contact nav items', () => {
    render(<NavigationBar />);
    expect(screen.getByRole('button', { name: /^Home$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^About$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Work$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Contact$/i })).toBeInTheDocument();
  });

  it('renders theme toggle', () => {
    render(<NavigationBar />);
    expect(screen.getByRole('button', { name: /Switch to (day|night) mode/i })).toBeInTheDocument();
  });

  it('scrolls to section when nav button clicked', () => {
    const mockScrollIntoView = vi.fn();
    document.getElementById = vi.fn().mockReturnValue({ scrollIntoView: mockScrollIntoView });
    render(<NavigationBar />);
    fireEvent.click(screen.getByRole('button', { name: /^About$/i }));
    expect(document.getElementById).toHaveBeenCalledWith('about');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('updates active section on scroll', () => {
    const mockElement = { offsetTop: 500, offsetHeight: 600 };
    document.getElementById = vi.fn().mockReturnValue(mockElement);
    render(<NavigationBar />);
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 450, writable: true });
      fireEvent.scroll(window);
    });
    expect(document.getElementById).toHaveBeenCalled();
  });

  it('removes scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<NavigationBar />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
