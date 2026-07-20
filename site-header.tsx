import { Button } from "@/components/ui/button"
import { LayoutDashboard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/50 bg-background/60 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/aura-emblem.png" alt="" width={32} height={32} aria-hidden="true" />
          <span className="font-serif text-lg font-semibold tracking-wide">Aura Reader</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/assessment">Asesmen</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="border-border bg-card/40">
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
