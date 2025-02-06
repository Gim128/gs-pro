'use client'
import * as React from "react"
import {
    AudioWaveform,
    BadgePlus,
    Bell,
    BriefcaseBusiness, CircleCheckBig,
    ClipboardMinus,
    Command,
    GalleryVerticalEnd,
    HeartHandshake, Megaphone,
    PackageSearch,
    RefreshCcw,
    Store,
    Tag,
    Truck,
    Users,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {TeamSwitcher} from "@/components/team-switcher"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/components/ui/sidebar"
import {SYS_ROLES} from "@/types/enum";
import {useSession} from "next-auth/react";
import {jwtDecode} from "jwt-decode";


// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
        roles: []
    },
    teams: [
        {
            name: "Gas Distro",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMains: [
        /*
        * start of the consumer permissions,
        * please add your new permissions related to consumers here
         */
        {
            title: "New Request (Gas)",
            url: "/dashboard/request",
            icon: BadgePlus,
            permission: [SYS_ROLES.ROLE_USER]
        },
        {
            title: "My Tokens",
            url: "/dashboard/my-tokens",
            icon: Tag,
            permission: [SYS_ROLES.ROLE_USER]
        },
        {
            title: "notifications",
            url: "/dashboard/notification",
            icon: Bell,
            permission: [SYS_ROLES.ROLE_USER]
        },
        {
            title: "Business Registration",
            url: "/dashboard/registration",
            icon: BriefcaseBusiness,
            permission: [SYS_ROLES.ROLE_USER]
        },
        {
            title: "Help",
            url: "/dashboard/help",
            icon: HeartHandshake,
            permission: [SYS_ROLES.ROLE_USER]
        },
        // end of the consumer permissions
        /*
        * beginning of the outlet manager permissions
        * please add your new permissions related to outlet manager here
        */
        {
            title: "Token Management",
            url: "/dashboard/token-management",
            icon: Tag,
            permission: [SYS_ROLES.ROLE_OUTLET_ADMIN]
        },
        {
            title: "Stock Management",
            url: "/dashboard/stock",
            icon: PackageSearch,
            permission: [SYS_ROLES.ROLE_OUTLET_ADMIN],
            items: [
                {
                    title: "New Bulk Request",
                    url: "/dashboard/stock/new-bulk",
                },
            ],
        },
        {
            title: "Delivery Schedule",
            url: "/dashboard/schedule",
            icon: Truck,
            permission: [SYS_ROLES.ROLE_OUTLET_ADMIN]
        },
        {
            title: "Cylinder Reallocation",
            url: "/dashboard/reallocation",
            icon: RefreshCcw,
            permission: [SYS_ROLES.ROLE_OUTLET_ADMIN]
        },
        {
            title: "Customer ",
            url: "/dashboard/customers",
            icon: Users,
            permission: [SYS_ROLES.ROLE_OUTLET_ADMIN]
        },
        {
            title: "Reports/Analytics",
            url: "/dashboard/reports",
            icon: ClipboardMinus,
            permission: [SYS_ROLES.ROLE_OUTLET_ADMIN]
        },
        {
            title: "Outlet Settings",
            url: "/dashboard/settings",
            icon: Store,
            permission: [SYS_ROLES.ROLE_OUTLET_ADMIN]
        },
        // end of the outlet manager permissions
        /*
      * beginning of the head office manager permissions
      * please add your new permissions related to head office manager here
      */
        {
            title: "Outlet Coordination",
            url: "/dashboard/hd/outlets",
            icon: Store,
            permission: [SYS_ROLES.ROLE_HDO_ADMIN],
            items: [
                {
                    title: "View All Outlets",
                    url: "/dashboard/hd/outlets",
                },
                {
                    title: "New Outlet",
                    url: "/dashboard/hd/outlets/new",
                },
            ]
        },
        {
            title: "Employee Management",
            url: "/dashboard/hd/employee",
            icon: Users,
            permission: [SYS_ROLES.ROLE_HDO_ADMIN],
            items: [
                {
                    title: "View All Employee",
                    url: "/dashboard/hd/employee",
                },
                {
                    title: "Add New Employee",
                    url: "/dashboard/hd/employee/new",
                },
            ]
        },
        {
            title: "Stock Management",
            url: "/dashboard/hd/stock",
            icon: PackageSearch,
            permission: [SYS_ROLES.ROLE_HDO_ADMIN]
        },
        {
            title: "Dispatch Tracking",
            url: "/dashboard/hd/dispatch",
            icon: CircleCheckBig,
            permission: [SYS_ROLES.ROLE_HDO_ADMIN]
        },
        {
            title: "Reports/Analytics",
            url: "/dashboard/hd/reports",
            icon: ClipboardMinus,
            permission: [SYS_ROLES.ROLE_HDO_ADMIN]
        },
        {
            title: "System Alerts",
            url: "/dashboard/hd/alerts",
            icon: Megaphone,
            permission: [SYS_ROLES.ROLE_HDO_ADMIN]
        },
    ],
}

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
