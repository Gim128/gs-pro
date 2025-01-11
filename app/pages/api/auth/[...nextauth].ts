import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub, { GitHubProfile } from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import {compare} from "bcrypt";
import { Session } from "inspector/promises";
import { pages } from "next/dist/build/templates/app-page";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import Email from "next-auth/providers/email";

export default NextAuth ({
    providers : [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
         Credentials({
            name: "Credentials",
            credentials: {
                Email: {label: "Email", type: "text", placeholder: "Email"},
                password: {label: "Password", type: "password"} 
            },
            async authorize(credentials) {
                // Add logic to verify user credentials
                if(
                    credentials?.Email === 'test@example.com' &&
                    credentials.password === 'password'
                ){
                    return { id: '1', name: 'Test User', email: 'test@example.com' };
                }
                return null;
            }
         }),
    ],
    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        // newUser: null,
    },
    secret:process.env.NEXTAUTH_SECRET,
});

