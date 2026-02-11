import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInForm } from "@/components/auth/sign-in-form"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export default async function SignInPage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 text-4xl">🏛️</div>
        <CardTitle className="text-2xl">{dict.signInTitle}</CardTitle>
        <CardDescription>
          {dict.signInDesc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  )
}
