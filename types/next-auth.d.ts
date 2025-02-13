
declare module "next-auth" {
    interface User {
        accessToken: string
        refreshToken: string
    }

    interface Session {
        user: User
        error?: "RefreshTokenError"
        accessToken:string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string
        refreshToken: string
        user:AuthUser
        error?: "RefreshTokenError"
        accessTokenExpires:number
    }
}
