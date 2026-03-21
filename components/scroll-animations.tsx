"use client";

import { useEffect } from "react";

export function ScrollAnimations(): null {
  useEffect(() => {
    // Mark document as JS-ready so CSS can safely hide elements for animation
    document.documentElement.classList.add("scroll-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Also observe elements added later (e.g. by client-side navigation)
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList.contains("animate-on-scroll")) {
              observer.observe(node);
            }
            node.querySelectorAll(".animate-on-scroll").forEach((el) => {
              observer.observe(el);
            });
          }
        }
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
