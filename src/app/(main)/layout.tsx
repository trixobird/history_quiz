import { Navbar } from "@/components/layout/navbar"
import { Toaster } from "@/components/ui/sonner"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <Toaster richColors />
    </div>
  )
}
