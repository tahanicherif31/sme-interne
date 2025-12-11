"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook to track scroll position
 * @param threshold - The scroll threshold in pixels (default: 50)
 * @returns boolean indicating if scrolled past threshold
 */
export function useScroll(threshold: number = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrolled;
}
