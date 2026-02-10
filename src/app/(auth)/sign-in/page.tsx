import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignInPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 text-4xl">🏛️</div>
        <CardTitle className="text-2xl">History Quiz</CardTitle>
        <CardDescription>
          Enter your email to receive a magic link and start quizzing!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  )
}
