"use client"

import {ChevronRight, type LucideIcon} from "lucide-react"

import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {SYS_ROLES} from "@/types/enum";

export function NavMain({
                            items,
                            section, user
                        }: {
    section: string,
    user: {
        name: string,
        email: string,
        avatar: string,
        roles: string[]
    }
    items: {
        title: string
        url: string
        icon?: LucideIcon,
        permission: SYS_ROLES[]
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{section}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (!item.permission.some(item => user.roles.includes(item))) return;
                    return (<Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            {!item?.items &&
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        {item.icon && <item.icon/>}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            }
                            {item?.items &&
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon/>}
                                            <span>{item.title}</span>
                                            <ChevronRight
                                                className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            }
                        </SidebarMenuItem>
                    </Collapsible>)
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
