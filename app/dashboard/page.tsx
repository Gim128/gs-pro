import React from "react";
import {auth} from "@/auth";
import {jwtDecode} from "jwt-decode";
import OutletAdminContent from "@/components/dashboard/outlet/OutletAdminContent";
import HeadOfficeAdminContent from "@/components/dashboard/HeadOfficeAdminContent";
import UserContent from "@/components/dashboard/UserContent";
import {DecodedAccessToken} from "@/types/Types";

export default async function Page() {
    const session = await auth();
    const decodedToken: DecodedAccessToken = jwtDecode(session.accessToken);
    console.log(decodedToken, 'this is decoded token from the server dash')
    const authority = decodedToken.authorities[0];
    // console.log(session,'this is the session on dashboard on the server')
    return (
        <section>
            <div>
                {
                    authority === 'ROLE_OT_ADMIN' && <OutletAdminContent/>
                }
                {
                    authority === 'ROLE_HDO_ADMIN' && <HeadOfficeAdminContent/>
                }
                {
                    authority === 'ROLE_USER' && <UserContent/>
                }
                {/*<div className="aspect-video rounded-xl bg-muted/50"/>
                <div className="aspect-video rounded-xl bg-muted/50"/>
                <div className="aspect-video rounded-xl bg-muted/50"/>*/}
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"/>
        </section>
    )
}
