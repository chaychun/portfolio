import { LayoutGroup, motion } from "motion/react"
import { useState } from "react"

export type ProjectCta = {
  label: string
  href: string
}

const spring = { type: "spring", duration: 0.3, bounce: 0.1 } as const

export default function CtaList({ ctas }: { ctas: ProjectCta[] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [focused, setFocused] = useState<number | null>(null)
  const active = hovered ?? focused

  return (
    <LayoutGroup>
      <ul
        onMouseLeave={() => setHovered(null)}
        className="-mx-2.5 mt-4 flex flex-wrap items-center"
      >
        {ctas.map((cta, index) => {
          const external = /^https?:\/\//.test(cta.href)
          const isActive = active === index

          return (
            <motion.li
              layout
              key={cta.href + cta.label}
              transition={spring}
              onMouseEnter={() => setHovered(index)}
              className="px-2.5 py-1"
            >
              <motion.a
                layout
                href={cta.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                initial="idle"
                animate={isActive ? "hover" : "idle"}
                onFocus={() => setFocused(index)}
                onBlur={() => setFocused((current) => (current === index ? null : current))}
                transition={spring}
                className={`inline-flex items-center text-base transition-colors duration-150 ease-in-out ${
                  isActive ? "text-brand" : "text-stone-700 dark:text-stone-300"
                }`}
              >
                <motion.span
                  aria-hidden="true"
                  className="inline-flex overflow-hidden"
                  variants={{ idle: { width: 0 }, hover: { width: "1.25em" } }}
                  transition={spring}
                >
                  <motion.span
                    className="inline-flex"
                    variants={{ idle: { x: "-100%" }, hover: { x: 0 } }}
                    transition={spring}
                  >
                    →
                  </motion.span>
                </motion.span>
                <motion.span layout="position" transition={spring}>
                  {cta.label}
                </motion.span>
              </motion.a>
            </motion.li>
          )
        })}
      </ul>
    </LayoutGroup>
  )
}
