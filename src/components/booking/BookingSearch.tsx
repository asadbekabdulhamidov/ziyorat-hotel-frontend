import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker, type DateRange } from 'react-day-picker';
import { enUS, ru, tr, uz } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import { addDays, differenceInCalendarDays, format, isBefore, parseISO, startOfToday } from 'date-fns';
import { CalendarDays, Minus, Plus, Search, Users, ArrowRight } from 'lucide-react';

const LOCALES = { uz, ru, en: enUS, tr } as const;
const ISO = 'yyyy-MM-dd';

const MAX_ADULTS = 6;
const MAX_CHILDREN = 4;

interface BookingSearchProps {
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  className?: string;
}

type OpenPanel = 'dates' | 'guests' | null;

function useIsWide() {
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const on = () => setWide(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return wide;
}

export const BookingSearch: React.FC<BookingSearchProps> = ({
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  className = '',
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang = 'uz' } = useParams<{ lang?: string }>();
  const locale = LOCALES[lang as keyof typeof LOCALES] ?? uz;
  const isWide = useIsWide();

  const today = startOfToday();
  const [range, setRange] = useState<{ from: Date; to: Date }>(() => {
    const from = initialCheckIn ? parseISO(initialCheckIn) : today;
    const to = initialCheckOut ? parseISO(initialCheckOut) : addDays(from, 1);
    return { from, to: isBefore(from, to) ? to : addDays(from, 1) };
  });
  const [adults, setAdults] = useState(Math.min(Math.max(initialGuests, 1), MAX_ADULTS));
  const [children, setChildren] = useState(0);

  const [open, setOpen] = useState<OpenPanel>(null);
  // While the calendar is open: the range being drafted and the hovered day
  const [draft, setDraft] = useState<DateRange | undefined>();
  const [hovered, setHovered] = useState<Date | undefined>();

  const nights = differenceInCalendarDays(range.to, range.from);
  const guests = adults + children;

  // Close popovers when the full-page scroller moves to another section
  useEffect(() => {
    const close = () => setOpen(null);
    window.addEventListener('fullpage:change', close);
    return () => window.removeEventListener('fullpage:change', close);
  }, []);

  const openDates = (pick: 'start' | 'end') => {
    setDraft(pick === 'start' ? { from: undefined, to: undefined } : { from: range.from, to: undefined });
    setHovered(undefined);
    setOpen('dates');
  };

  const handleDayClick = (_: DateRange | undefined, day: Date) => {
    if (!draft?.from || draft.to || !isBefore(draft.from, day)) {
      // Pick (or restart with) the check-in date
      setDraft({ from: day, to: undefined });
      return;
    }
    // Second click: check-out date -> commit and close
    setRange({ from: draft.from, to: day });
    setDraft(undefined);
    setOpen(null);
  };

  const preview = useMemo(() => {
    if (!draft?.from || draft.to || !hovered || !isBefore(draft.from, hovered)) return undefined;
    return { from: addDays(draft.from, 1), to: hovered };
  }, [draft, hovered]);

  const pickingEnd = open === 'dates' && !!draft?.from && !draft.to;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn: format(range.from, ISO),
      checkOut: format(range.to, ISO),
      guests: String(guests),
    });
    navigate(`/${lang}/rooms?${params.toString()}`);
  };

  const dayLabel = (d: Date) => {
    const txt = format(d, 'd MMMM', { locale });
    // Russian keeps the month lowercase ("25 ноября"); other languages capitalize it
    return lang === 'ru' ? txt : txt.replace(/ (\S)/, (m) => m.toUpperCase());
  };
  const weekdayLabel = (d: Date) => format(d, 'EEEE', { locale });

  return (
    <div
      className={`bg-[#0F2F20]/95 backdrop-blur-md text-[#F5F1E8] border border-[#B99A65]/30 rounded-sm p-3 sm:p-4 shadow-2xl ${className}`}
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_auto] gap-3 items-stretch text-left"
      >
        {/* ---------------- Dates ---------------- */}
        <Popover.Root open={open === 'dates'} onOpenChange={(o) => !o && setOpen(null)}>
          <Popover.Anchor asChild>
            <div className="relative grid grid-cols-2 rounded-sm border border-[#B99A65]/25 bg-[#153D2A]/70">
              <FieldButton
                label={t('search.checkIn')}
                icon={<CalendarDays className="w-3.5 h-3.5" />}
                value={dayLabel(range.from)}
                sub={weekdayLabel(range.from)}
                active={open === 'dates' && !pickingEnd}
                onClick={() => openDates('start')}
              />
              <FieldButton
                label={t('search.checkOut')}
                icon={<CalendarDays className="w-3.5 h-3.5" />}
                value={dayLabel(range.to)}
                sub={weekdayLabel(range.to)}
                active={pickingEnd}
                onClick={() => openDates('end')}
                className="border-l border-[#B99A65]/20"
              />

              {/* Nights badge on the divider */}
              <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0F2F20] border border-[#B99A65]/40 text-[10px] font-semibold uppercase tracking-wider text-[#B99A65] whitespace-nowrap">
                {t('search.nights', { count: nights })}
              </span>
            </div>
          </Popover.Anchor>

          <Popover.Portal>
            <Popover.Content
              data-fullpage-ignore
              side="bottom"
              align="start"
              sideOffset={10}
              collisionPadding={16}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="zh-popover z-[70] rounded-sm border border-[#B99A65]/30 bg-[#0F2F20] text-[#F5F1E8] shadow-2xl p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-4 pb-3 mb-1 border-b border-white/10">
                <p className="text-[11px] uppercase tracking-widest font-semibold text-[#B99A65]">
                  {pickingEnd ? t('search.selectCheckout') : t('search.selectCheckin')}
                </p>
                {draft?.from && (
                  <p className="text-xs text-[#DCECE1]/80">
                    {dayLabel(draft.from)}
                    {preview?.to && (
                      <>
                        <ArrowRight className="inline w-3 h-3 mx-1.5 -mt-0.5 text-[#B99A65]" />
                        {dayLabel(preview.to)} · {t('search.nights', { count: differenceInCalendarDays(preview.to, draft.from) })}
                      </>
                    )}
                  </p>
                )}
              </div>

              <DayPicker
                className="zh-cal"
                mode="range"
                locale={locale}
                weekStartsOn={1}
                numberOfMonths={isWide ? 2 : 1}
                defaultMonth={range.from}
                startMonth={today}
                disabled={{ before: today }}
                selected={draft?.from ? draft : range}
                onSelect={handleDayClick}
                onDayMouseEnter={(d) => setHovered(d)}
                onDayMouseLeave={() => setHovered(undefined)}
                modifiers={{ preview: preview ?? [] }}
                modifiersClassNames={{ preview: 'rdp-preview' }}
                showOutsideDays={false}
                animate
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* ---------------- Guests ---------------- */}
        <Popover.Root open={open === 'guests'} onOpenChange={(o) => setOpen(o ? 'guests' : null)}>
          <Popover.Trigger asChild>
            <FieldButton
              label={t('search.guests')}
              icon={<Users className="w-3.5 h-3.5" />}
              value={t('search.guestTotal', { count: guests })}
              sub={`${adults} ${t('search.adultsShort')} · ${children} ${t('search.childrenShort')}`}
              active={open === 'guests'}
              className="rounded-sm border border-[#B99A65]/25 bg-[#153D2A]/70"
            />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              data-fullpage-ignore
              side="bottom"
              align="end"
              sideOffset={10}
              collisionPadding={16}
              className="zh-popover z-[70] w-[300px] rounded-sm border border-[#B99A65]/30 bg-[#0F2F20] text-[#F5F1E8] shadow-2xl p-5"
            >
              <Stepper
                title={t('search.adults')}
                hint={t('search.adultsHint')}
                value={adults}
                min={1}
                max={MAX_ADULTS}
                onChange={setAdults}
              />
              <div className="my-4 h-px bg-white/10" />
              <Stepper
                title={t('search.children')}
                hint={t('search.childrenHint')}
                value={children}
                min={0}
                max={MAX_CHILDREN}
                onChange={setChildren}
              />
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="mt-5 w-full h-10 bg-[#B99A65] hover:bg-[#A4844F] text-[#0F2F20] text-[11px] font-bold uppercase tracking-widest rounded-sm transition-colors"
              >
                {t('search.done')}
              </button>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* ---------------- Submit ---------------- */}
        <button
          type="submit"
          className="md:col-span-2 lg:col-span-1 min-h-[56px] px-7 bg-[#B99A65] hover:bg-[#A4844F] text-[#0F2F20] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <Search className="w-4 h-4" />
          <span>{t('search.findRoom')}</span>
        </button>
      </form>
    </div>
  );
};

/* ------------------------------------------------------------------ */

interface FieldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: React.ReactNode;
  value: string;
  sub: string;
  active?: boolean;
}

const FieldButton = React.forwardRef<HTMLButtonElement, FieldButtonProps>(
  ({ label, icon, value, sub, active, className = '', ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      {...rest}
      className={`group relative w-full text-left px-4 py-3 transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#B99A65] ${
        active ? 'bg-[#B99A65]/10' : 'hover:bg-[#B99A65]/5'
      } ${className}`}
    >
      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#B99A65]">
        {icon}
        {label}
      </span>
      <span className="mt-1 block font-serif text-xl leading-tight text-[#F5F1E8] first-letter:uppercase whitespace-nowrap">
        {value}
      </span>
      <span className="block text-[11px] text-[#DCECE1]/60 first-letter:uppercase whitespace-nowrap">{sub}</span>
      <span
        className={`absolute left-4 right-4 bottom-0 h-px bg-[#B99A65] origin-left transition-transform duration-300 ${
          active ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </button>
  )
);
FieldButton.displayName = 'FieldButton';

interface StepperProps {
  title: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ title, hint, value, min, max, onChange }) => {
  const btn =
    'w-9 h-9 rounded-full border border-[#B99A65]/50 flex items-center justify-center text-[#B99A65] transition-colors hover:bg-[#B99A65] hover:text-[#0F2F20] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#B99A65]';
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-serif text-lg leading-tight">{title}</p>
        <p className="text-[11px] text-[#DCECE1]/60">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="−">
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-5 text-center font-serif text-xl tabular-nums">{value}</span>
        <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="+">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

