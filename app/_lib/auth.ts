import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createGuest, getGuest } from "./data-service"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        authorized: async ({ auth }) => {
          return !!auth?.user
        },
        async signIn({ user }) {
            try {
                const existingGuest = await getGuest(user.email!);

                if (!existingGuest) {
                    await createGuest({ email: user.email!, full_name: user.name! });
                }

                return true;
            } catch {
                return false;
            }
        },
        async session({ session }) {
            const guest = await getGuest(session?.user?.email);
            session.user.id = guest.id;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
})