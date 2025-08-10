import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "./dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }
        try {
          await dbConnect();

          const user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error("User not found");

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) throw new Error("Invalid password");

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (err) {
          throw err;
        }
      },
    }),
  ],

  // callbacks
  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();

      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name || "New Skillswap User",
            username: user.email?.split("@")[0] || `user_${Date.now()}`,
            email: user.email,
            profilePicture: user.image,
            provider: "google",
            profileComplete: false,
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // pages
  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
