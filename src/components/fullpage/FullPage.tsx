import React, {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Full-page scroller                                                 */
/*  Desktop: one wheel / key / swipe = one section (no free scroll).   */
/*  Mobile & reduced-motion: normal scroll, reveal-on-view fallback.   */
/* ------------------------------------------------------------------ */

export const SLIDE_DURATION_MS = 1000;
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const MEDIA_QUERY =
  '(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)';

type FullPageCtx = {
  enabled: boolean;
  current: number;
  count: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
};

const FullPageContext = createContext<FullPageCtx>({
  enabled: false,
  current: 0,
  count: 0,
  goTo: () => {},
  next: () => {},
  prev: () => {},
});

const SectionIndexContext = createContext<number>(-1);

export const useFullPage = () => useContext(FullPageContext);

/** Is the section this component lives in currently on screen (fullpage mode)? */
export const useSectionActive = () => {
  const { enabled, current } = useFullPage();
  const index = useContext(SectionIndexContext);
  return { enabled, active: enabled ? index === current : true };
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

const isTypingTarget = (el: EventTarget | null) => {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
};

interface FullPageProps {
  children: React.ReactNode;
  /** Labels for the side navigation dots */
  labels?: string[];
}

export const FullPage: React.FC<FullPageProps> = ({ children, labels = [] }) => {
  const slides = Children.toArray(children);
  const count = slides.length;
  const enabled = useMediaQuery(MEDIA_QUERY);

  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const lockRef = useRef(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastWheel = useRef({ time: 0, delta: 0 });

  const goTo = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(count - 1, index));

      if (!enabled) {
        slideRefs.current[target]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (target === currentRef.current || lockRef.current) return;

      const goingDown = target > currentRef.current;
      const el = slideRefs.current[target];
      // Arrive at the top when moving down, at the bottom when moving up
      if (el) el.scrollTop = goingDown ? 0 : el.scrollHeight;

      lockRef.current = true;
      currentRef.current = target;
      setCurrent(target);
      window.setTimeout(() => {
        lockRef.current = false;
      }, SLIDE_DURATION_MS + 150);
    },
    [count, enabled]
  );

  const next = useCallback(() => goTo(currentRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(currentRef.current - 1), [goTo]);

  /** Can the active slide still scroll internally in this direction? */
  const canScrollInside = (dir: 1 | -1) => {
    const el = slideRefs.current[currentRef.current];
    if (!el) return false;
    return dir > 0
      ? el.scrollTop + el.clientHeight < el.scrollHeight - 2
      : el.scrollTop > 2;
  };

  // Lock the page scroll while fullpage mode is on
  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      html.style.overflow = prevOverflow;
    };
  }, [enabled]);

  // Tell the header which section is on screen
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('fullpage:change', { detail: { enabled, index: current } })
    );
  }, [enabled, current]);
  useEffect(
    () => () => {
      window.dispatchEvent(new CustomEvent('fullpage:change', { detail: { enabled: false, index: 0 } }));
    },
    []
  );

  // Wheel / keyboard / touch
  useEffect(() => {
    if (!enabled) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;

      const now = performance.now();
      const gap = now - lastWheel.current.time;
      const accelerating = Math.abs(e.deltaY) > Math.abs(lastWheel.current.delta) + 4;
      lastWheel.current = { time: now, delta: e.deltaY };

      if (canScrollInside(dir)) return; // let tall sections scroll natively first
      e.preventDefault();

      if (lockRef.current) return;
      if (Math.abs(e.deltaY) < 6) return;
      // Ignore trackpad inertia tails: only a fresh gesture changes the section
      if (gap < 140 && !accelerating) return;

      goTo(currentRef.current + dir);
    };

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      let dir: 1 | -1 | 0 = 0;
      if (['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey)) dir = 1;
      if (['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) dir = -1;

      if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
        return;
      }
      if (e.key === 'End') {
        e.preventDefault();
        goTo(count - 1);
        return;
      }
      if (!dir || canScrollInside(dir)) return;
      e.preventDefault();
      goTo(currentRef.current + dir);
    };

    let touchStartY = 0;
    let edgeAtStart = { top: true, bottom: true };
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      edgeAtStart = { top: !canScrollInside(-1), bottom: !canScrollInside(1) };
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 50) return;
      if (dy > 0 && edgeAtStart.bottom) goTo(currentRef.current + 1);
      if (dy < 0 && edgeAtStart.top) goTo(currentRef.current - 1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, goTo, count]);

  const ctx: FullPageCtx = { enabled, current, count, goTo, next, prev };

  /* ---------------- Mobile / fallback: normal document flow ---------------- */
  if (!enabled) {
    return (
      <FullPageContext.Provider value={ctx}>
        {slides.map((slide, i) => (
          <div key={i} ref={(el) => { slideRefs.current[i] = el; }}>
            <SectionIndexContext.Provider value={i}>{slide}</SectionIndexContext.Provider>
          </div>
        ))}
      </FullPageContext.Provider>
    );
  }

  /* ---------------- Desktop: one section per screen ---------------- */
  return (
    <FullPageContext.Provider value={ctx}>
      <div className="fixed inset-0 overflow-hidden bg-[#0F2F20]">
        <motion.div
          className="h-full w-full will-change-transform"
          initial={false}
          animate={{ y: `-${current * 100}%` }}
          transition={{ duration: SLIDE_DURATION_MS / 1000, ease: EASE }}
        >
          {slides.map((slide, i) => (
            <motion.div
              key={i}
              ref={(el) => { slideRefs.current[i] = el; }}
              className="fp-slide h-full w-full overflow-y-auto overscroll-contain"
              initial={false}
              animate={{
                scale: i === current ? 1 : 0.94,
                opacity: i === current ? 1 : 0.5,
              }}
              transition={{ duration: SLIDE_DURATION_MS / 1000, ease: EASE }}
              aria-hidden={i !== current}
            >
              <SectionIndexContext.Provider value={i}>{slide}</SectionIndexContext.Provider>
            </motion.div>
          ))}
        </motion.div>

        {/* Side navigation dots */}
        <nav
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3"
          aria-label="Bo'limlar"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group flex items-center gap-3"
              aria-label={labels[i] ?? `${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
            >
              <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#B99A65] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-[#0F2F20]/80 px-2 py-1 rounded-sm">
                {labels[i]}
              </span>
              <span
                className={`block rounded-full border border-[#B99A65] transition-all duration-500 ${
                  i === current ? 'w-2.5 h-7 bg-[#B99A65]' : 'w-2.5 h-2.5 bg-[#0F2F20]/40 group-hover:bg-[#B99A65]/60'
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Progress counter */}
        <div className="fixed left-6 bottom-6 z-40 font-serif text-[#B99A65] text-sm tracking-widest select-none">
          <span className="text-lg">{String(current + 1).padStart(2, '0')}</span>
          <span className="opacity-60"> / {String(count).padStart(2, '0')}</span>
        </div>
      </div>
    </FullPageContext.Provider>
  );
};
