import { Variants } from 'framer-motion';

// Shared easing curves
export const easings = {
  smooth: [0.22, 1, 0.36, 1],
  smoothOut: [0.4, 0, 0.2, 1],
  smoothIn: [0.4, 1, 0.8, 1],
  bouncy: [0.43, 0.13, 0.23, 0.96]
};

// Fade up animation
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.6, ease: easings.smooth }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.smooth }
  }
};

// Fade in animation
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.6, ease: easings.smooth }
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easings.smooth }
  }
};

// Scale up animation
export const scaleUpVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6, ease: easings.smooth }
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easings.smooth }
  }
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Card hover animation
export const cardHoverVariants: Variants = {
  idle: {
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: easings.smooth }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.3, ease: easings.smooth }
  }
};

// Page transition variants
export const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.4, ease: easings.smooth }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easings.smooth }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.4, ease: easings.smooth }
  }
};

// Hero section variants
export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

export const heroContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.8, ease: easings.smooth }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easings.smooth }
  }
};

// Background blur variants
export const blurBackgroundVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(20px)",
    transition: { duration: 1, ease: easings.smooth }
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(100px)",
    transition: { duration: 1, ease: easings.smooth }
  }
}; 