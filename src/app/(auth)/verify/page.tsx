import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export default async function VerifyPage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <div className="mx-auto mb-2 text-4xl">📧</div>
        <CardTitle className="text-2xl">{dict.verifyTitle}</CardTitle>
        <CardDescription>
          {dict.verifyDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {dict.verifyNoEmail}
        </p>
        <Button variant="outline" asChild>
          <Link href="/sign-in">{dict.backToSignIn}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
