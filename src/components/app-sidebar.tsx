import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { NavLink } from "react-router-dom"

// This is sample data.
const data = {
  navMain: [
    {
      title: ".default",
      items: [
        {
          title: "Home",
          url: "/",
        },
      ],
    },
    {
      title: "Misc tools",
      items: [
        {
          title: "Map text generator",
          url: "/misc/map-text-gen",
        },
        {
          title: "Blueprint decoder",
          url: "/misc/bpdecode",
        },
      ],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      {/* <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader> */}
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            { item.title !== ".default" ? <SidebarGroupLabel>{item.title}</SidebarGroupLabel> : <></> }
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <NavLink to={item.url} key={item.title}>
                    {({ isActive }) => (
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                  </NavLink>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
