import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import customAxios from "./axios-interceptor";

interface MyUser {
  id: string;
  username: string;
  email: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
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
        if (!credentials?.email || !credentials.password) return null;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          const data = await res.json();

          // handle backend error cases
          if (!res.ok || data.success === false) {
            if (data.code === "EMAIL_NOT_VERIFIED") {
              // Throw explicit error string for frontend to catch
              throw new Error("EMAIL_NOT_VERIFIED");
            }

            throw new Error(data.message || "Invalid credentials");
          }

          // Backend returns user info directly
          const user = data.data?.user || data.user || data;
          const customToken = data.data?.token ||  data.data?.user?.token;
          user.accessToken = customToken;

          if (!user || !user.id) {
            throw new Error("Invalid user data from API");
          }

          return user as MyUser;
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          throw new Error("LOGIN_FAILED");
        }
      },
    }),
  ],

  callbacks: {
    // async signIn({ user, account }) {
    //   // Only run for Google sign in
    //   if (account?.provider === "google") {
    //     try {
    //       const response = await customAxios.post(`/api/auth/google-login`, {
    //         name: user.name,
    //         email: user.email,
    //         image: user.image,
    //       });

    //       const dbUser = response?.data?.user;

    //       console.log(
    //         dbUser, "DBUSER"
    //       )
    //       const customToken = response?.data?.user?.token;
    //       console.log(customToken)
    //       if (dbUser) {
    //         user.id = dbUser._id;
    //         user.username = dbUser.username;
    //         user.email = dbUser.email;
    //         user.image = dbUser.profilePicture || user.image;
    //         user.accessToken = customToken
    //       }
    //     } catch (err) {
    //       console.error("Failed to sync Google user:", err);
    //     }
    //   }
    //   return true; // continue login flow
    // },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await customAxios.post(`/api/auth/google-login`, {
            name: user.name,
            email: user.email,
            image: user.image,
          });

          const googleAuthResponse = response.data;

          // The actual user object containing the token is inside data.user
          const userWithToken = googleAuthResponse?.data?.user;

          if (userWithToken) {
            user.id = userWithToken.id || userWithToken._id; 
            user.username = userWithToken.username;
            user.email = userWithToken.email;
            user.image = userWithToken.profilePicture || user.image;

            user.accessToken = userWithToken.token;
          } else {
            console.error("Missing user or token in response from Express.");
            return false; // Fail the login if the token/user is missing
          }
        } catch (err) {
          console.error("Failed to sync Google user and fetch token:", err);
          return false;
        }
      }
      return true; // continue login flow
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;

        const customToken = user.accessToken

        if (customToken) {
          token.accessToken = customToken;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

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
