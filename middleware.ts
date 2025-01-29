import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

import {PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES,ADMIN_ONLY_ROUTES} from "@/lib/routes";
import {NextRequest} from "next/server";
import {jwtDecode} from "jwt-decode";

export default auth(async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, nextUrl.pathname);
    console.log('this is the session from middleware : ',session)
    const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
        || nextUrl.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));

    console.log(isPublicRoute);

 /*   if(!!session?.user){
        const decodedToken = jwtDecode(session.user.accessToken);
        console.log(decodedToken, 'this is decoded token');
        const hasAuthority = ADMIN_ONLY_ROUTES.find(route => nextUrl.pathname.includes(route)) && decodedToken.authorities.find(authority=>"ROLE_ADMIN"===authority)
        console.log(hasAuthority,'authority status')
        if (!hasAuthority)
            return Response.redirect(new URL(nextUrl.pathname, nextUrl));
    }*/

    if (!isAuthenticated && !isPublicRoute)
        return Response.redirect(new URL(LOGIN, nextUrl));
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
