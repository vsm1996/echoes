import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      firstName?: string,
      lastName?: string,
      username?: string,
      name?: string,
      email?: string,
      image?: string,
    }
  }
}