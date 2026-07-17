export type Interaction = {
  slug: string
  title: string
  description: string
  playbackId: string
}

export const interactions: Interaction[] = [
  {
    slug: "page-stack",
    title: "Page stack",
    description:
      "Experimental hypertext navigation where new pages are stacked on a book-like interface for showing a visual, linear exploration trail through a non-linear network. Based on pattern popularized by [Andy Matuschak](https://notes.andymatuschak.org/)",
    playbackId: "CiIsMfdPuZ63u700aDunnpbDXKWJCkThNWGw8zoEMlKg",
  },
  {
    slug: "polaroid-carousel",
    title: "Polaroid carousel",
    description: "A stack of cards that expands into a gesture-based carousel modal.",
    playbackId: "JVJ601pnLybEMZtJ01CF7WrTuXk7hzUT01t00vOLrJHnl5U",
  },
  {
    slug: "ios-camera-capture",
    title: "iOS camera capture",
    description:
      "Capture mode selector with gesture-based controls inspired by the iOS camera app.",
    playbackId: "suT7Az9GNduIq00A00f3yN9eIo00u8gses3k5cjwzrzwJA",
  },
  {
    slug: "expandable-notifications",
    title: "Expandable notifications",
    description:
      "Expandable notification with multipurpose panel. Built on top of a dropdown component from [Morphin](https://morphin.dev/components/activity-dropdown).",
    playbackId: "go01NVJMfIhy9HUw7ioY3oDzG5ulJkJw8jPqYm1NzPV4",
  },
  {
    slug: "wave-hello",
    title: "Wave hello",
    description: "Psst ... try clicking my name up top.",
    playbackId: "aI02022J00faukzRYMmVnzH3LJnS4Isp6ixc01f7BkA2cl00",
  },
  {
    slug: "variable-font-selector",
    title: "Variable font selector",
    description:
      "A category selector that uses variable font weight and size to indicate the active item.",
    playbackId: "YaL9f5Ejr3ytVZxRYhuELKTnyp2rt6KpkI202fqDoepA",
  },
  {
    slug: "morphing-pill-button",
    title: "Morphing pill button",
    description: "Pill button background morphs into a circular state indicator.",
    playbackId: "ucp486aqhZwRevisrYj1gloezMd15VaDusumjtT6zUs",
  },
  {
    slug: "onboarding-name-input",
    title: "Onboarding name input",
    description: "Stateful input with a playful success state.",
    playbackId: "ew583FWJDTpSEnHQuHN100LM5o2u6cD2CN00eneTU22Yo",
  },
  {
    slug: "info-panel",
    title: "Info panel",
    description: "An expandable information card with spring-animations.",
    playbackId: "LfUT9mSBFFALERGpcBfn7ifFRfZlu1AadkpBXctXzNo",
  },
  {
    slug: "parallax-list",
    title: "Parallax list",
    description:
      "Using mouse position to control list instead of scroll, giving a parallax-like effect.",
    playbackId: "rHaqkBd00c93COF69RI1b5dHecCrGFDHxJAiTO6QFaYg",
  },
]
