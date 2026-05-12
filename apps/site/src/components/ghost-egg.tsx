import { Ghost } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

let triggered = false

type Stage = "idle" | "jump" | "run" | "gone"

const SHAKE_DURATION = 0.3
const JUMP_DURATION = 0.75
const RUN_DURATION = 1.5
const RUN_DISTANCE = -200

const jumpTimes = [0, 0.22, 0.5, 0.72, 1] as const
const jumpEase = ["easeOut", "easeIn", "easeOut", "easeIn"] as const

const runJumpTimes = [0, 0.1, 0.28, 0.4, 0.58, 0.72, 0.9, 1] as const
const runJumpEase = [
  "easeOut",
  "easeIn",
  "easeOut",
  "easeIn",
  "easeOut",
  "easeIn",
  "linear",
] as const

export function GhostEgg() {
  const [stage, setStage] = useState<Stage>(triggered ? "gone" : "idle")

  const onClick = () => {
    if (stage !== "idle") return
    triggered = true
    setStage("jump")
  }

  return (
    <motion.button
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      onClick={onClick}
      className="-mr-1 inline-flex cursor-pointer items-center text-muted-foreground"
      initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
      animate={
        stage === "idle"
          ? { opacity: 0, x: 0, y: 0, rotate: 0 }
          : stage === "jump"
            ? {
                opacity: 1,
                x: [0, -1.5, 1.5, -1.5, 1.5, -1, 1, 0],
                y: [0, -9, 0, -12, 0],
                rotate: [0, -6, 6, -5, 5, -3, 3, 0],
              }
            : {
                opacity: [1, 1, 0],
                x: RUN_DISTANCE,
                y: [0, -13, 0, -16, 0, -10, 0, 0],
                rotate: [0, -8, 0, -10, 0, -6, 0, 0],
              }
      }
      transition={
        stage === "jump"
          ? {
              opacity: { duration: 0.08 },
              x: { duration: SHAKE_DURATION, ease: "easeInOut" },
              y: {
                duration: JUMP_DURATION,
                times: [...jumpTimes],
                ease: [...jumpEase],
              },
              rotate: { duration: SHAKE_DURATION, ease: "easeInOut" },
            }
          : stage === "run"
            ? {
                x: {
                  duration: RUN_DURATION,
                  ease: [0.32, 0, 0.45, 1],
                },
                y: {
                  duration: RUN_DURATION,
                  times: [...runJumpTimes],
                  ease: [...runJumpEase],
                },
                rotate: {
                  duration: RUN_DURATION,
                  times: [...runJumpTimes],
                  ease: "easeInOut",
                },
                opacity: {
                  duration: RUN_DURATION,
                  times: [0, 0.35, 1],
                  ease: "easeIn",
                },
              }
            : { duration: 0 }
      }
      onAnimationComplete={() => {
        if (stage === "jump") setStage("run")
        else if (stage === "run") setStage("gone")
      }}
      style={{ pointerEvents: stage === "idle" ? "auto" : "none" }}
    >
      <Ghost className="size-3.5" aria-hidden="true" />
    </motion.button>
  )
}
