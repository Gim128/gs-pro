import {authConfig} from "./auth.config";
import NextAuth from "next-auth";
import {LOGIN, PROTECTED_SUB_ROUTES, PUBLIC_ROUTES, ROOT} from "@/lib/routes";
import {NextRequest} from "next/server";
import {data} from "@/lib/data/paths";
import {DecodedAccessToken} from "@/types/Types";
import {jwtDecode} from "jwt-decode";


const {auth} = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
    const {nextUrl} = req;
    console.log(nextUrl, 'this is the requested url')
    const session = await auth();

    const isAuthenticated = !!session?.user;
    const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
        || nextUrl.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));

    console.log(isPublicRoute);
    /*
        if(!!session?.user){
            const decodedToken = jwtDecode(session.user.accessToken);
            console.log(decodedToken, 'this is decoded token');
            const hasAuthority = ADMIN_ONLY_ROUTES.find(route => nextUrl.pathname.includes(route)) && decodedToken.authorities.find(authority=>"ROLE_ADMIN"===authority)
            console.log(hasAuthority,'authority status')
            if (!hasAuthority)
                return Response.redirect(new URL(nextUrl.pathname, nextUrl));
        }*/
    if ((!isAuthenticated && !isPublicRoute) ||
        (session?.error === "RefreshAccessTokenError" && !isPublicRoute))
        return Response.redirect(new URL(LOGIN, nextUrl));

    if (session) {

        const decodedAccessToken: DecodedAccessToken = jwtDecode(session?.accessToken);
        const find = data.navMains.find(feature => feature.url == nextUrl.pathname);
        console.log(find, 'this is the found object');
        console.log(nextUrl.pathname,'this is path name')
        console.log(decodedAccessToken,'this is token')
        // console.log(req)
        console.log(find?.permission.some(per => decodedAccessToken.authorities.includes(per)),'htis is the expression')
        if (!isPublicRoute && find && !find?.permission.some(per => decodedAccessToken.authorities.includes(per))) {
           /* const referer = req.headers.get('referer') || nextUrl.pathname;
            console.log(referer,'this is re')*/
            return Response.redirect(new URL('/access-denied', nextUrl));
        }
    }


})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
