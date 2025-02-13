'use client'
import * as React from "react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {TeamSwitcher} from "@/components/team-switcher"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/components/ui/sidebar"
import {useSession} from "next-auth/react";
import {jwtDecode} from "jwt-decode";
import {data} from "@/lib/data/paths";


// This is sample data.


export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {

    const {data: session, update} = useSession() // useSession()
    if (session) {
        let decodedToken = jwtDecode(session?.accessToken);
        console.log(decodedToken, 'this is decoded token');
        data.user.name = !!decodedToken?.sub ? decodedToken.sub : "demo user";
        data.user.roles = decodedToken.authorities;
    }
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams}/>
            </SidebarHeader>
            <SidebarContent>
                {/*<NavProjects projects={data.platformMains}/>*/}
                <NavMain items={data.navMains} section={"Platform Mains"} user={data.user}/>
                {/*<NavProjects projects={data.projects}/>*/}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
