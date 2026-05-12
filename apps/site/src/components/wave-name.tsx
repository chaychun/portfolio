import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "motion/react"
import { useRef, useState } from "react"

type Wave = {
  id: number
  startX: number
  drift: number
  rotate: number
}

export function WaveName({ children }: { children: React.ReactNode }) {
  const [waves, setWaves] = useState<Wave[]>([])
  const nextId = useRef(0)
  const reduceMotion = useReducedMotion()
  const controls = useAnimationControls()

  function emit() {
    const id = nextId.current++
    const startX = (Math.random() - 0.5) * 120
    const drift = startX * 1.4 + (Math.random() - 0.5) * 80
    const rotate = (Math.random() - 0.5) * 40
    setWaves((prev) => [...prev, { id, startX, drift, rotate }])
    if (!reduceMotion) {
      controls.start({
        scale: [1, 0.92, 1.06, 1],
        transition: { duration: 0.45, times: [0, 0.25, 0.55, 1], ease: "easeOut" },
      })
    }
  }

  return (
    <motion.button
      type="button"
      onClick={emit}
      aria-label="Wave hello"
      className="relative inline cursor-pointer text-brand not-italic outline-none focus-visible:underline"
      animate={controls}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1 left-1/2 z-10 h-0 w-0 -translate-x-1/2"
      >
        <AnimatePresence>
          {waves.map((w) => (
            <motion.span
              key={w.id}
              className="absolute -translate-x-1/2 select-none"
              style={{ left: 0, top: 0, fontSize: "1.1em" }}
              initial={{ opacity: 0, y: 0, x: w.startX, scale: 0.6, rotate: 0 }}
              animate={
                reduceMotion
                  ? { opacity: [0, 1, 0], y: -8, scale: 1 }
                  : {
                      opacity: [0, 1, 1, 0],
                      y: [0, -32, -68, -110],
                      x: [
                        w.startX,
                        w.startX + (w.drift - w.startX) * 0.35,
                        w.startX + (w.drift - w.startX) * 0.75,
                        w.drift,
                      ],
                      scale: [0.6, 1.2, 1, 0.85],
                      rotate: [0, -32, 32, -24, 24, w.rotate],
                    }
              }
              transition={{
                duration: reduceMotion ? 0.6 : 1.4,
                ease: "easeOut",
                times: reduceMotion ? [0, 0.3, 1] : [0, 0.15, 0.7, 1],
              }}
              onAnimationComplete={() => setWaves((prev) => prev.filter((x) => x.id !== w.id))}
            >
              👋
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    </motion.button>
  )
}
