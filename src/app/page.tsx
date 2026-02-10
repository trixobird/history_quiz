import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Trophy, Flame, Brain } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="text-6xl mb-6">🏛️</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              History Quiz
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge across the ages — from ancient empires to the
            modern world. Earn points, climb the leaderboard, and become a
            legendary historian.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/sign-in">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why You&apos;ll Love It
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookOpen,
              title: "10 Historical Eras",
              description:
                "From Ancient Rome to the Cold War, explore quizzes spanning all of human history.",
              gradient: "from-violet-500 to-purple-700",
            },
            {
              icon: Brain,
              title: "Progressive Difficulty",
              description:
                "Each quiz ramps up from easy to expert. How far can you go?",
              gradient: "from-amber-400 to-orange-600",
            },
            {
              icon: Trophy,
              title: "Global Leaderboard",
              description:
                "Compete with players worldwide. Earn points and climb the ranks.",
              gradient: "from-yellow-400 to-amber-600",
            },
            {
              icon: Flame,
              title: "Streaks & Levels",
              description:
                "Keep your streak alive and level up from History Novice to Legendary Oracle.",
              gradient: "from-orange-400 to-red-600",
            },
          ].map((feature) => (
            <Card key={feature.title} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className={`h-1.5 bg-gradient-to-r ${feature.gradient}`} />
              <CardContent className="pt-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Join for free with just your email. No passwords to remember —
            just click the magic link and start quizzing!
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8"
          >
            <Link href="/sign-in">Start Playing Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>History Quiz — Test your knowledge across the ages</p>
        </div>
      </footer>
    </div>
  )
}
