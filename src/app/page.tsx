import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Trophy, Flame, Brain } from "lucide-react"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export default async function HomePage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)

  const features = [
    {
      icon: BookOpen,
      title: dict.homeFeature1Title,
      description: dict.homeFeature1Desc,
      gradient: "from-violet-500 to-purple-700",
    },
    {
      icon: Brain,
      title: dict.homeFeature2Title,
      description: dict.homeFeature2Desc,
      gradient: "from-amber-400 to-orange-600",
    },
    {
      icon: Trophy,
      title: dict.homeFeature3Title,
      description: dict.homeFeature3Desc,
      gradient: "from-yellow-400 to-amber-600",
    },
    {
      icon: Flame,
      title: dict.homeFeature4Title,
      description: dict.homeFeature4Desc,
      gradient: "from-orange-400 to-red-600",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="text-6xl mb-6">🏛️</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {dict.appName}
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {dict.homeHeroText}
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/sign-in">{dict.getStarted}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/sign-in">{dict.signIn}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          {dict.homeWhyTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
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
            {dict.homeCtaTitle}
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            {dict.homeCtaText}
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8"
          >
            <Link href="/sign-in">{dict.homeCtaButton}</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>{dict.homeFooter}</p>
        </div>
      </footer>
    </div>
  )
}
