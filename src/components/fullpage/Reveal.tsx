import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { SLIDE_DURATION_MS, useSectionActive } from './FullPage';

/* ------------------------------------------------------------------ */
/*  One-by-one reveal                                                   */
/*  <Stagger>  – root of a section; starts when the section is active  */
/*  <Group>    – nested group (e.g. a card grid), staggers its children */
/*  <Item>     – a single element that fades/slides in                  */
/* ------------------------------------------------------------------ */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset = (dir: Direction, distance: number) => {
  switch (dir) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

const itemVariants = (dir: Direction, distance: number, duration: number): Variants => ({
  hidden: {
    opacity: 0,
    x: 0,
    y: 0,
    ...offset(dir, distance),
    // Reset only after the section has slid off screen, so it replays next visit
    transition: { duration: 0, delay: SLIDE_DURATION_MS / 1000 },
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration, ease: EASE_OUT },
  },
});

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child */
  stagger?: number;
  /** Seconds before the first child appears */
  delay?: number;
}

export const Stagger: React.FC<StaggerProps> = ({ children, className, stagger = 0.14, delay = 0.1 }) => {
  const { enabled, active } = useSectionActive();
  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        // In fullpage mode wait until the slide transition is mostly done
        delayChildren: enabled ? delay + (SLIDE_DURATION_MS / 1000) * 0.55 : delay,
      },
    },
  };

  if (enabled) {
    return (
      <motion.div className={className} variants={variants} initial="hidden" animate={active ? 'show' : 'hidden'}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
};

export const Group: React.FC<{ children: React.ReactNode; className?: string; stagger?: number }> = ({
  children,
  className,
  stagger = 0.12,
}) => (
  <motion.div
    className={className}
    variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
  >
    {children}
  </motion.div>
);

interface ItemProps {
  children?: React.ReactNode;
  className?: string;
  from?: Direction;
  distance?: number;
  duration?: number;
}

export const Item: React.FC<ItemProps> = ({ children, className, from = 'up', distance = 40, duration = 0.8 }) => (
  <motion.div className={className} variants={itemVariants(from, distance, duration)}>
    {children}
  </motion.div>
);
