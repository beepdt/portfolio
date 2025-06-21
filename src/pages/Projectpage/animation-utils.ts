import { gsap } from "gsap"

/**
 * Creates a staggered animation timeline for content elements
 * @param elements - Elements to animate
 * @param direction - Animation direction ("in" or "out")
 * @returns GSAP timeline
 */
export const createContentAnimation = (elements: NodeListOf<Element> | Element[], direction: "in" | "out") => {
  const timeline = gsap.timeline()

  if (direction === "out") {
    timeline.to(elements, {
      y: -60,
      duration: 0.8,
      ease: "power3.in",
      stagger: 0.03,
      force3D: true, // Force 3D transforms for better performance
    })
  } else {
    timeline.fromTo(
      elements,
      { y: 40, opacity: 0 }, // Start with opacity 0 for smoother appearance
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
        force3D: true,
      },
    )
  }

  return timeline
}

/**
 * Creates an animation for project image
 * @param element - Image element to animate
 * @param direction - Animation direction ("in" or "out")
 * @returns GSAP timeline
 */
export const createImageAnimation = (element: Element, direction: "in" | "out") => {
  const timeline = gsap.timeline()
  const img = element.querySelector("img")

  if (direction === "out") {
    // Animate image scale first, then container
    timeline
      .to(img, {
        scale: 2,
        duration: 0.8,
        ease: "power3.in",
        force3D: true,
      })
      .to(
        element,
        {
          scale: 0,
          bottom: "8em",
          duration: 0.8,
          ease: "power3.in",
          force3D: true,
        },
        "-=0.6", // Start slightly before the first animation finishes
      )
  } else {
    // Animate container first, then image
    timeline
      .fromTo(
        element,
        {
          scale: 0,
          bottom: "-8em",
        },
        {
          scale: 1,
          bottom: "1em",
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
        },
      )
      .fromTo(
        img,
        {
          scale: 2,
        },
        {
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
        },
        "-=0.6",
      )
  }

  return timeline
}

/**
 * Creates a background transition animation
 * @param newImage - New background image element
 * @param oldImage - Old background image element
 * @returns GSAP timeline
 */
export const createBackgroundAnimation = (newImage: HTMLElement, oldImage?: HTMLElement) => {
  const timeline = gsap.timeline()

  // Set initial properties
  gsap.set(newImage, {
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  })

  // Fade out old image if it exists
  if (oldImage) {
    timeline.to(oldImage, {
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.inOut",
    })
  }

  // Fade in new image
  timeline.to(newImage, {
    delay: oldImage ? 0.3 : 0,
    opacity: 1,
    duration: 1,
    ease: "power2.inOut",
  })

  return timeline
}

/**
 * Checks if user prefers reduced motion
 * @returns Boolean indicating preference for reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Creates animations with respect to reduced motion preferences
 * @param animationFunction - Function that creates the animation
 * @param args - Arguments for the animation function
 * @returns GSAP timeline or null
 */
export const createAccessibleAnimation = (animationFunction: Function, ...args: any[]) => {
  if (prefersReducedMotion()) {
    // Return simplified animation for users who prefer reduced motion
    return gsap.timeline()
  }

  return animationFunction(...args)
}