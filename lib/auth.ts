import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.isActive) {
          throw new Error("Your account has been deactivated. Contact support.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        // Update last active
        await prisma.user.update({
          where: { id: user.id },
          data: { lastActiveAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tier: user.tier,
          isActive: user.isActive,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        sameSite: "none" as const,
        secure: true,
        httpOnly: true,
        path: "/",
      },
    },
    csrfToken: {
      name: "__Secure-next-auth.csrf-token",
      options: {
        sameSite: "none" as const,
        secure: true,
        httpOnly: true,
        path: "/",
      },
    },
    callbackUrl: {
      name: "__Secure-next-auth.callback-url",
      options: {
        sameSite: "none" as const,
        secure: true,
        httpOnly: true,
        path: "/",
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as unknown as { role: string }).role;
        token.tier = (user as unknown as { tier?: string }).tier ?? "TIER_0";
        token.isActive = (user as unknown as { isActive: boolean }).isActive;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const userId = token.id as string;
        (session.user as { id: string }).id = userId;

        // Refresh role/tier/isActive from DB on each session refresh so tier
        // upgrades (and admin promotions) take effect without forcing re-login.
        const fresh = await prisma.user.findUnique({
          where: { id: userId },
          select: { role: true, tier: true, isActive: true },
        });
        if (fresh) {
          (session.user as { role: string }).role = fresh.role;
          (session.user as { tier: string }).tier = fresh.tier;
          (session.user as { isActive: boolean }).isActive = fresh.isActive;
        } else {
          (session.user as { role: string }).role = token.role as string;
          (session.user as { tier: string }).tier = (token.tier as string) ?? "TIER_0";
          (session.user as { isActive: boolean }).isActive = token.isActive as boolean;
        }
      }
      return session;
    },
  },
};
