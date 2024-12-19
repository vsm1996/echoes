import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      firstName?: string | null,
      lastName?: string | null,
      username?: string | null,
      name?: string | null,
      email?: string | null,
      image?: string | null,
    }
  }
}