
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiClient from "@/services/apiClient";
import { AuthUser } from "@/types/datatypes"; 

declare module "next-auth" {
  interface User extends AuthUser {
    accessToken: string;
  }

  interface Session {
    user: AuthUser & { accessToken: string };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends AuthUser {
    accessToken: string;
  }
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await apiClient.post('https://mini-project.fly.dev/api/v1/login', {
            email: credentials?.email,
            password: credentials?.password
          });

          const user = res.data;

          if (user) {
            return {
              id: user.id,
              role: user.role,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              accessToken: user.token,
            };
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        role: token.role as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        email: token.email as string,
        accessToken: token.accessToken as string,
      };
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
};

export default NextAuth(options);