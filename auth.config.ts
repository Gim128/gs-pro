import CredentialsProvider from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode";
import {NextAuthConfig, Session, User} from "next-auth";
import {Account, Profile} from "@auth/core/types";
import {JWT} from "next-auth/jwt";
import {undefined} from "zod";
import {AuthError} from "@auth/core/errors";

export class CustomAuthError extends AuthError {
    private code: number;
    private message: string;

    constructor(msg: string, code: number) {
        super();
        this.code = code;
        this.message = msg;
    }
}


export const authConfig = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (credentials === null) return null;
                const uri = `${process.env.API_SERVER_BASE_URL}/api/v1/auth/login`;
                let response;
                try {
                    response = await fetch(
                        uri,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                username: credentials.email,
                                password: credentials.password,
                            }),
                            headers: {"Content-Type": "application/json"},
                        }
                    );
                } catch (e) {
                    throw new CustomAuthError("Service currently unavailable", 500)
                }
                if (response?.status === 403) {
                    throw new CustomAuthError("Invalid Credentials", 403)
                } else if (!response?.ok) {
                    throw new CustomAuthError('An authentication error occurred', 500)
                }

                const parsedResponse = await response.json();
                const accessToken = parsedResponse.accessToken;
                const refreshToken = parsedResponse.refreshToken;
                const userInfo = parsedResponse?.userInfo;

                const user: User = {
                    accessToken,
                    refreshToken
                };
                return user;
            }
        }),
    ],
    callbacks: {
        jwt: async ({token, account, user, profile}: {
            token: JWT,
            account: Account,
            user: User,
            profile: Profile
        }) => {
            if (token.accessToken) {
                const decodedToken = jwtDecode(token.accessToken);
                token.accessTokenExpires = decodedToken?.exp ? decodedToken.exp * 1000 : Date.now();
            }

            if (account && user) {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.user = user
                // console.log(token, 'this is the token after setting up the all properties')
                return token;
            }

            // Return previous token if the access token has not expired yet
            console.log(
                "**** Access token expires on *****",
                token.accessTokenExpires,
                new Date(token.accessTokenExpires)
            );
            const date = new Date(token.accessTokenExpires);
            const formattedDateWithOptions = date.toLocaleString('en-US');
            // console.log("Formatted Current Time in Local Time Zone:", formattedDateWithOptions);
            if (Date.now() < token.accessTokenExpires) {
                console.log("**** returning previous token ******");
                return token;
            }

            console.log("**** Update Refresh token ******");
            //return token;
            return refreshAccessToken(token);
        },
        session: async ({session, token}: { session: Session, token: JWT }) => {

            if (token) {
                session.error = token.error
                session.accessToken = token.accessToken;
                session.user = token.user;
            }
            return session;
        },
    }
} satisfies NextAuthConfig

async function refreshAccessToken(token: JWT) {
    console.log("Refreshing access token");

    const payload = {
        refreshToken: token.refreshToken
    }

    try {
     const response = await fetch(`${process.env.API_SERVER_BASE_URL}/api/v1/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token.refreshToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        const tokensOrError = await response.json()

        if (!response.ok) throw tokensOrError

        const newTokens = tokensOrError as {
            accessToken: string
            refreshToken: string
        }

        return {
            ...token,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (e) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

