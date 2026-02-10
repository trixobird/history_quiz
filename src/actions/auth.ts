"use server"

import { signIn, signOut } from "@/lib/auth"

export async function signInWithEmail(email: string) {
  await signIn("resend", { email, redirectTo: "/dashboard" })
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" })
}
