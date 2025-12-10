"use client";
import Image from "next/image";
import Link from "next/link";
import { FlaskConical, Home, GraduationCap, BookOpen, LineChart } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

type LucideIcon = React.ComponentType<{ className?: string }>;

export type ElmaMenuItem = {
  display_label: string;
  href: string;
  image_url?: string | null;
  emoji?: string | null;
  icon?: LucideIcon | null;
};

export const defaultElmaMenuItems: ElmaMenuItem[] = [
  { display_label: "Home", href: "/home", emoji: "🏠", icon: Home },
  { display_label: "Learn", href: "/learn", emoji: "🎓", icon: GraduationCap },
  { display_label: "Practice", href: "/practice", emoji: "📘", icon: BookOpen },
  { display_label: "Campus", href: "/campus", emoji: "🏫", icon: FlaskConical },
  { display_label: "Graph", href: "/graph", emoji: "📈", icon: LineChart },
];

export default function ElmaSideMenu({ items = defaultElmaMenuItems }: { items?: ElmaMenuItem[] }) {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" className="bg-white">
      <SidebarHeader className="bg-white h-[57px]">
        <div
          className="flex items-center gap-2 pl-3 h-14 cursor-pointer hover:opacity-90 transition-[padding,margin] duration-300 ease-in-out w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:mx-1"
          onClick={toggleSidebar}
          title="Toggle sidebar"
        >
          <Image src="/elma.png" alt="" width={30} height={30} className="h-[24px] w-[24px] shrink-0" />
          <span className="font-semibold group-data-[collapsible=icon]:hidden">ELMA</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname?.startsWith(item.href) ?? false;
                return (
                  <SidebarMenuItem key={item.display_label}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.display_label}
                      size="lg"
                      isActive={isActive}
                      className="h-10 rounded-full px-3 hover:bg-gray-100 data-[active=true]:bg-sky-100 data-[active=true]:text-sky-700 transition-[padding,background-color,color] duration-300 ease-in-out"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-3 w-full transition-[padding] duration-300 ease-in-out"
                        aria-current={isActive ? "page" : undefined}
                      >
                        <div className="flex items-center h-10 w-full">
                          <span className="w-10 shrink-0 flex items-center justify-center">
                            {renderIcon(item)}
                          </span>
                          <span className="pl-3 truncate group-data-[collapsible=icon]:hidden">{item.display_label}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className=" border-gray-200">
        <div className="flex items-center gap-2 px-1 h-14 w-full transition-[padding,margin] duration-300 ease-in-out group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:mx-1">
          <Link href="/profile" className="block">
            <div className="size-9 rounded-full bg-gray-200 text-gray-700 grid place-items-center font-semibold">
              P
            </div>
          </Link>
          <span className="font-medium group-data-[collapsible=icon]:hidden">Profile</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function renderIcon(item: ElmaMenuItem) {
  if (item.image_url) {
    return <Image src={item.image_url} alt="" width={30} height={30} />;
  }
  if (item.emoji) {
    return <span className="text-[24px] leading-none items-center justify-center pl-6">{item.emoji}</span>;
  }
  const Icon = item.icon ?? FlaskConical;
  return <Icon className="size-6" />;
}


