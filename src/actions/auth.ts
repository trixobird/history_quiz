"use server"

import { signIn, signOut, auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import type { Locale } from "@/lib/i18n/dictionaries"

export async function signInWithEmail(email: string) {
  await signIn("resend", { email, redirectTo: "/dashboard" })
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" })
}

export async function updateLocale(locale: Locale) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  await prisma.user.update({
    where: { id: session.user.id },
    data: { locale },
  })

  revalidatePath("/")
}
