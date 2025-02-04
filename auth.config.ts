import CredentialsProvider from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode";
import {AuthError, CredentialsSignin, NextAuthConfig} from "next-auth";

export class CustomAuthError extends AuthError{
    private code: number;
    constructor(msg: string, code:number) {
        super();
        this.code = code;
        this.message = msg;
        this.stack = undefined;
    }
}


export const authConfig = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                console.log('this is credentials: ', credentials)
                if (credentials === null) return null;

                    const uri = `${process.env.API_SERVER_BASE_URL}/api/v1/auth/login`;
                    console.log(uri, 'this is login uri')
                    const res = await fetch(
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
                    console.log(res, 'this is the response')

                    if (res.status === 403) {
                        console.log('hit here')
                        throw new CustomAuthError("Invalid Credentials",403)
                    }
                    else if(!res.ok){
                        throw new CustomAuthError("Something went wrong",500)
                    }

                    const parsedResponse = await res.json();

                    console.log(parsedResponse, 'this is parsed response');

                    // accessing the accessToken returned by server
                    const accessToken = parsedResponse.accessToken;
                    const refreshToken = parsedResponse.refreshToken;
                    const userInfo = parsedResponse?.userInfo;

                    console.log(refreshToken,'this is refresh from authorize');

                    const user =  {
                        accessToken,
                        refreshToken,
                        role: userInfo?.role,
                        email: userInfo?.email
                    };
                    console.log(user,'this is user from authorize')
                    return user;
            }
        }),
    ],
    callbacks: {
        jwt: async ({token, account, user}) => {
            // user is only available the first time a user signs in authorized
            console.log(`In jwt callback - Token is ${JSON.stringify(token)}`);
            console.log(`In jwt callback - account is ${JSON.stringify(account)}`);
            console.log(`In jwt callback - user is ${JSON.stringify(user)}`);

            if (token.accessToken) {
                const decodedToken = jwtDecode(token.accessToken);
                console.log(decodedToken, 'this is decoded token');
                token.accessTokenExpires = decodedToken?.exp * 1000;
            }

            if (account && user) {
                console.log(
                    `In jwt callback - User is ${JSON.stringify(user)}`
                );
                console.log(
                    `In jwt callback - account is ${JSON.stringify(account)}`
                );
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.user = user
                console.log(token, 'this is the token after setting up the all properties')
                return token;
            }

            // Return previous token if the access token has not expired yet
            console.log(
                "**** Access token expires on *****",
                token.accessTokenExpires,
                new Date(token.accessTokenExpires)
            );
            if (Date.now() < token.accessTokenExpires) {
                console.log("**** returning previous token ******");
                return token;
            }

            // Access token has expired, try to update it
            console.log("**** Update Refresh token ******");
            //return token;
            return refreshAccessToken(token);
        },
        session: async ({session, token}) => {
            console.log(
                `In session callback - Token is ${JSON.stringify(token)}`
            );
            if (token) {
                session.accessToken = token.accessToken;
                session.user = token.user;
            }
            return session;
        },
    }
} satisfies NextAuthConfig

async function refreshAccessToken(token) {
    console.log("Refreshing access token", token);
    try {

        console.log("Beaarer token", `Bearer ${token.refreshToken}`);
        const payload = {
            refreshToken:token.refreshToken
        }

        const response = await fetch(`${process.env.API_SERVER_BASE_URL}/api/v1/auth/refresh-token`, {
            method:"POST",
            headers: {
                "Authorization": `Bearer ${token.refreshToken}`,
                "Content-Type": "application/json",
            },
            body:JSON.stringify(payload)
        });

        console.log(response);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const tokens = await response.json();

        console.log(tokens);

        if (!response.ok) {
            throw tokens;
        }

        /*const refreshedTokens = {
        "access_token": "acess-token",
        "expires_in": 2,
        "refresh_token": "refresh-token"
      }*/

        //return token;

        return {
            ...token,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}
