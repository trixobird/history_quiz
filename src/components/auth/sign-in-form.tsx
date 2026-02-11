"use client"

import { useState } from "react"
import { signInWithEmail } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocale } from "@/lib/i18n/locale-context"

export function SignInForm() {
  const [isPending, setIsPending] = useState(false)
  const { dict } = useLocale()

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    try {
      const email = formData.get("email") as string
      await signInWithEmail(email)
    } catch {
      // Redirect happens server-side, errors are expected
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{dict.emailLabel}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={dict.emailPlaceholder}
          required
          autoFocus
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? dict.sendingMagicLink : dict.sendMagicLink}
      </Button>
    </form>
  )
}
