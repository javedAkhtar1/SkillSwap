// import { NextAuthOptions } from "next-auth/";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import dbConnect from "../backend/lib/dbConnect";
// import User from "@/backend/models/user.model";
// import bcrypt from "bcryptjs";
// import { ApiError } from "../backend/lib/api-error";

// export const authOptions: NextAuthOptions = {
//   // providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           throw new ApiError("Email and password are required", 400);
//         }
//         try {
//           await dbConnect();

//           const user = await User.findOne({ email: credentials.email });
//           if (!user) throw new ApiError("User not found", 404);

//           if (!user.isEmailVerified) {
//             throw new Error("EMAIL_NOT_VERIFIED"); // to catch this and redirect 
//           }
//           if (!user.isActive)
//             throw new ApiError(
//               "Account is disabled. Please contact support.",
//               403
//             );

//           const isValidPassword = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );
//           if (!isValidPassword) throw new ApiError("Invalid password", 401);

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             username: user.username,
//           };
//         } catch (err) {
//           throw err;
//         }
//       },
//     }),
//   ],

//   // callbacks
//   callbacks: {
//     async signIn({ user, account }) {
//       await dbConnect();

//       if (account?.provider === "google") {
//         const existingUser = await User.findOne({ email: user.email });

//         if (!existingUser) {
//           const newUser = await User.create({
//             name: user.name || "New Skillswap User",
//             username: user.email?.split("@")[0] || `user_${Date.now()}`,
//             email: user.email,
//             profilePicture: user.image,
//             provider: "google",
//             profileComplete: false,
//             isEmailVerified: true,
//           });
//           user.id = newUser._id.toString();
//         }

//         // for attaching username in session.user
//         user.id = existingUser._id.toString();
//         user.username = existingUser.username;
//       }
//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.username = token.username as string;
//       }
//       return session;
//     },
//   },

//   // pages
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },

//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60,
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface MyUser {
  id: string;
  username: string;
  email: string;
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      // ✅ handle backend error cases
      if (!res.ok || data.success === false) {
        if (data.code === "EMAIL_NOT_VERIFIED") {
          // Throw explicit error string for frontend to catch
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        throw new Error(data.message || "Invalid credentials");
      }

      // ✅ Backend returns user info directly
      const user = data.data?.user || data.user || data;

      if (!user || !user.id) {
        throw new Error("Invalid user data from API");
      }

      return user as MyUser;
    } catch (err: any) {
      // ✅ This message is what ends up in signIn(...).error
      throw new Error(err.message || "LOGIN_FAILED");
    }
  },
})

  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
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
