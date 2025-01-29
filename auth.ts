import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode";
import {authConfig} from "@/auth.config";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({...authConfig})

