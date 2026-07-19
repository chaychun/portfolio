import { motion } from "motion/react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { WheelPicker, WheelPickerWrapper } from "../lib/wheel-picker"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const YEARS = Array.from({ length: 16 }, (_, i) => 2020 + i)

const SPRING = { type: "spring", stiffness: 260, damping: 26, mass: 1 } as const

const PILL_H = 58
const R = PILL_H / 2
const COLLAPSED_GAP = -1
const EXPANDED_GAP = 16
const CAP_PAD = 22
const TIGHT_PAD = 8

const CHEVRON_SIZE = 20
const CHEVRON_INSET = 16
const CHEVRON_GAP = 18
const CHEVRON_PAD = CHEVRON_INSET + CHEVRON_SIZE + CHEVRON_GAP

const ITEM_H = PILL_H
const RING = 16
const OPEN_H = ITEM_H * 4

const DRAG_SLOP = 5
const SETTLE_GRACE = 700

const BRAND = "#f36208"
const STONE_200 = "#e7e5e4"
const STONE_300 = "#d6d3d1"
const STONE_400 = "#a8a29e"

const TEXT = "text-3xl tracking-tight tabular-nums"

const OPTION = `justify-start ${TEXT}`

const PICKER_CLASSES = {
  optionItem: `${OPTION} text-stone-400`,
  highlightItem: `${OPTION} text-stone-700`,
  highlightWrapper: "font-normal",
} as const

const CH_W = 17

type Field = "day" | "month" | "year"
type Option = { value: number; label: string }

function daysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate()
}

function radii(expanded: boolean, capLeft: boolean, capRight: boolean) {
  const left = expanded || capLeft ? R : 0
  const right = expanded || capRight ? R : 0
  return {
    borderTopLeftRadius: left,
    borderBottomLeftRadius: left,
    borderTopRightRadius: right,
    borderBottomRightRadius: right,
  }
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

function useLabelWidths(labels: string[]) {
  const ref = useRef<HTMLDivElement>(null)
  const [widths, setWidths] = useState<Record<string, number>>({})
  const key = labels.join("\n")

  useIsoLayoutEffect(() => {
    const read = () => {
      const el = ref.current
      if (!el) return
      const next: Record<string, number> = {}
      for (const child of Array.from(el.children))
        next[child.textContent ?? ""] = child.getBoundingClientRect().width
      setWidths(next)
    }

    read()
    void document.fonts.ready.then(read)
  }, [key])

  const widthOf = (label: string) => widths[label] ?? label.length * CH_W

  return { measureRef: ref, widthOf }
}

function Chevrons() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="size-5">
      <path d="m7 15 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m7 9 5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Pencil() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-6">
      <path
        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="size-6">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type FieldModel = {
  field: Field
  label: string
  widest: string
  items: Option[]
  selected: number
  infinite: boolean
}

type RowProps = {
  ghost: boolean
  expanded: boolean
  open: Field | null
  models: FieldModel[]
  widthOf: (label: string) => number
  onPress: (field: Field, e: React.PointerEvent) => void
  onAction: () => void
  onCommit: (field: Field, value: number) => void
}

function Row({ ghost, expanded, open, models, widthOf, onPress, onAction, onCommit }: RowProps) {
  return (
    <div
      className={`col-start-1 row-start-1 flex items-center ${ghost ? "pointer-events-none" : ""}`}
    >
      {models.map((m, i) => {
        const active = open === m.field
        const dim = open !== null && !active

        const textW = widthOf(expanded ? m.widest : m.label)
        const padLeft = expanded || i === 0 ? CAP_PAD : TIGHT_PAD
        const padRight = expanded ? CHEVRON_PAD : TIGHT_PAD

        return (
          <motion.div
            key={m.field}
            className="relative flex shrink-0 items-center"
            animate={{
              marginRight: expanded ? EXPANDED_GAP : COLLAPSED_GAP,
              opacity: dim ? (ghost ? 0 : 0.55) : 1,
            }}
            transition={SPRING}
            initial={false}
            style={{ height: PILL_H, zIndex: active ? 1 : 0 }}
          >
            <motion.button
              type="button"
              disabled={ghost}
              onClick={expanded ? undefined : onAction}
              onPointerDown={ghost || !expanded ? undefined : (e) => onPress(m.field, e)}
              className="relative flex shrink-0 touch-none items-center overflow-hidden bg-stone-200 select-none"
              animate={{
                width: padLeft + textW + padRight,
                height: active ? OPEN_H : PILL_H,
                paddingLeft: padLeft,
                paddingRight: padRight,
                ...radii(expanded, i === 0, false),
              }}
              initial={false}
              transition={SPRING}
            >
              {!ghost && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    left: 0,
                    right: 0,
                    top: "50%",
                    marginTop: -R,
                    height: PILL_H,
                    borderRadius: R,
                    backgroundColor: STONE_300,
                  }}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={SPRING}
                  initial={false}
                />
              )}

              <motion.div
                className="relative shrink-0"
                style={{ height: PILL_H }}
                animate={{ width: textW }}
                transition={SPRING}
                initial={false}
              >
                {!ghost && (
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                    <WheelPickerWrapper
                      className={
                        expanded
                          ? active
                            ? "cursor-grabbing"
                            : "cursor-grab"
                          : "pointer-events-none"
                      }
                    >
                      <WheelPicker
                        options={m.items}
                        value={m.selected}
                        onValueChange={(v) => onCommit(m.field, v)}
                        optionItemHeight={ITEM_H}
                        visibleCount={RING}
                        infinite={m.infinite}
                        classNames={PICKER_CLASSES}
                      />
                    </WheelPickerWrapper>
                  </div>
                )}
              </motion.div>
            </motion.button>

            <motion.span
              aria-hidden
              className={`pointer-events-none absolute flex text-stone-400 ${ghost ? "invisible" : ""}`}
              style={{ right: CHEVRON_INSET, top: "50%", marginTop: -CHEVRON_SIZE / 2 }}
              animate={{ opacity: expanded ? 1 : 0 }}
              transition={SPRING}
              initial={false}
            >
              <Chevrons />
            </motion.span>
          </motion.div>
        )
      })}

      <motion.button
        type="button"
        disabled={ghost}
        onClick={onAction}
        aria-label={expanded ? "Save date" : "Edit date"}
        className="relative grid shrink-0 place-items-center"
        style={{ height: PILL_H, width: PILL_H }}
        animate={{
          backgroundColor: expanded ? BRAND : STONE_200,
          color: expanded ? "#ffffff" : STONE_400,
          opacity: open ? (ghost ? 0 : 0.55) : 1,
          ...radii(expanded, false, true),
        }}
        transition={SPRING}
        initial={false}
      >
        <motion.span
          className={`col-start-1 row-start-1 block ${ghost ? "invisible" : ""}`}
          animate={{
            opacity: expanded ? 0 : 1,
            scale: expanded ? 0.4 : 1,
            rotate: expanded ? -40 : 0,
          }}
          transition={SPRING}
          initial={false}
        >
          <Pencil />
        </motion.span>
        <motion.span
          className={`col-start-1 row-start-1 block ${ghost ? "invisible" : ""}`}
          animate={{
            opacity: expanded ? 1 : 0,
            scale: expanded ? 1 : 0.4,
            rotate: expanded ? 0 : 40,
          }}
          transition={SPRING}
          initial={false}
        >
          <Check />
        </motion.span>
      </motion.button>
    </div>
  )
}

export default function WheelDatePicker() {
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState<Field | null>(null)
  const [day, setDay] = useState(26)
  const [month, setMonth] = useState(6)
  const [year, setYear] = useState(2026)

  const rootRef = useRef<HTMLDivElement>(null)
  const pressY = useRef<number | null>(null)
  const dragged = useRef(false)
  const awaitingSettle = useRef(false)
  const grace = useRef<ReturnType<typeof setTimeout>>(undefined)

  const maxDay = daysInMonth(month, year)
  const safeDay = Math.min(day, maxDay)

  const optionsFor = (field: Field): Option[] => {
    if (field === "day")
      return Array.from({ length: maxDay }, (_, i) => ({ value: i + 1, label: String(i + 1) }))
    if (field === "month") return MONTHS.map((m, i) => ({ value: i, label: m }))
    return YEARS.map((y) => ({ value: y, label: String(y) }))
  }

  const selectedFor = (field: Field) =>
    field === "day" ? safeDay : field === "month" ? month : year

  const models: FieldModel[] = (["day", "month", "year"] as Field[]).map((field) => {
    const items = optionsFor(field)
    const label =
      field === "day" ? String(safeDay) : field === "month" ? MONTHS[month]! : String(year)

    return {
      field,
      label,
      widest: items.reduce((a, o) => (o.label.length > a.length ? o.label : a), ""),
      items,
      selected: selectedFor(field),
      infinite: field !== "year",
    }
  })

  const labels = [...new Set(models.flatMap((m) => m.items.map((o) => o.label)))]
  const { measureRef, widthOf } = useLabelWidths(labels)

  const close = () => {
    clearTimeout(grace.current)
    awaitingSettle.current = false
    pressY.current = null
    setOpen(null)
  }

  useEffect(() => () => clearTimeout(grace.current), [])

  useEffect(() => {
    if (!open) return

    const onMove = (e: PointerEvent) => {
      if (pressY.current !== null && Math.abs(e.clientY - pressY.current) > DRAG_SLOP)
        dragged.current = true
    }
    const onUp = () => {
      if (pressY.current === null) return
      pressY.current = null
      if (!dragged.current) {
        close()
        return
      }
      awaitingSettle.current = true
      grace.current = setTimeout(close, SETTLE_GRACE)
    }
    const onDownOutside = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    document.addEventListener("pointermove", onMove)
    document.addEventListener("pointerup", onUp)
    document.addEventListener("pointercancel", onUp)
    document.addEventListener("pointerdown", onDownOutside)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerup", onUp)
      document.removeEventListener("pointercancel", onUp)
      document.removeEventListener("pointerdown", onDownOutside)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const press = (field: Field, e: React.PointerEvent) => {
    pressY.current = e.clientY
    dragged.current = false
    awaitingSettle.current = false
    clearTimeout(grace.current)
    setOpen(field)
  }

  const action = () => {
    close()
    setExpanded((v) => !v)
  }

  const onCommit = (field: Field, value: number) => {
    if (field === "day") setDay(value)
    else if (field === "month") setMonth(value)
    else setYear(value)
    if (awaitingSettle.current && open === field) close()
  }

  const rowProps = { expanded, open, models, widthOf, onPress: press, onAction: action, onCommit }

  return (
    <div ref={rootRef} className="relative grid">
      <svg aria-hidden className="absolute size-0">
        <defs>
          <filter id="goo-wheel">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -13"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={measureRef}
        aria-hidden
        className={`pointer-events-none invisible absolute top-0 left-0 ${TEXT}`}
      >
        {labels.map((label) => (
          <span key={label} className="block w-fit whitespace-pre">
            {label}
          </span>
        ))}
      </div>

      <div className="col-start-1 row-start-1" style={{ filter: "url(#goo-wheel)" }}>
        <Row ghost {...rowProps} />
      </div>

      <Row ghost={false} {...rowProps} />
    </div>
  )
}
