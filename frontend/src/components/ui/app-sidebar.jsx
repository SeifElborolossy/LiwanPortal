import { SearchForm } from "../../components/ui/search-form"
import { VersionSwitcher } from "../../components/ui/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  versions: ["Getting Started", "Middle", "End"],
  navMain: [
    {
      title: "Navigation Main",
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Submit a ticket",
          url: "https://liwan-back-and-front-main-sigma.vercel.app/",
        },
      ],
    },
    {
      title: "Orders Handling",
      items: [
        {
          title: "Order History",
          url: "/order-history",
        },
        {
          title: "Order Details",
          url: "/order-details",
          // isActive: true,
        },
        {
          title: "Purchase Order",
          url: "/submit-order",
        },
        {
          title: "Signatures History",
          url: "/signatures-history",
        },
        {
          title: "Orders Approval",
          url: "/order-approval",
        },
        {
          title: "Schedule",
          url: "/schedule",
        },
        {
          title: "Login",
          url: "/login-page",
        },
        // {
        //   title: "Styling",
        //   url: "#",
        // },
        // {
        //   title: "Optimizing",
        //   url: "#",
        // },
        // {
        //   title: "Configuring",
        //   url: "#",
        // },
        // {
        //   title: "Testing",
        //   url: "#",
        // },
        // {
        //   title: "Authentication",
        //   url: "#",
        // },
        // {
        //   title: "Deploying",
        //   url: "#",
        // },
        // {
        //   title: "Upgrading",
        //   url: "#",
        // },
        // {
        //   title: "Examples",
        //   url: "#",
        // },
      ],
    },
    // {
    //   title: "API Reference",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Components",
    //       url: "#",
    //     },
    //     {
    //       title: "File Conventions",
    //       url: "#",
    //     },
    //     {
    //       title: "Functions",
    //       url: "#",
    //     },
    //     {
    //       title: "next.config.js Options",
    //       url: "#",
    //     },
    //     {
    //       title: "CLI",
    //       url: "#",
    //     },
    //     {
    //       title: "Edge Runtime",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Architecture",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Accessibility",
    //       url: "#",
    //     },
    //     {
    //       title: "Fast Refresh",
    //       url: "#",
    //     },
    //     {
    //       title: "Next.js Compiler",
    //       url: "#",
    //     },
    //     {
    //       title: "Supported Browsers",
    //       url: "#",
    //     },
    //     {
    //       title: "Turbopack",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}