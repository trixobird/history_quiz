import type { NextAuthConfig } from "next-auth"

export default {
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/verify",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string
      }
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const protectedPaths = [
        "/dashboard",
        "/quizzes",
        "/history",
        "/leaderboard",
        "/profile",
      ]
      const isProtected = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      )

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL("/sign-in", nextUrl))
      }

      if (nextUrl.pathname === "/sign-in" && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
