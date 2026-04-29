import { createFileRoute } from "@tanstack/react-router"

import { Video } from "@/components/video"

export const Route = createFileRoute("/")({ component: App })

const PLAYBACK_ID = "TJSUIgLfjwihgpshNAPNtMtdmNROY3es2rYfy23ntdI"

function App() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="aspect-video w-full max-w-3xl">
        <Video playbackId={PLAYBACK_ID} />
      </div>
    </div>
  )
}
