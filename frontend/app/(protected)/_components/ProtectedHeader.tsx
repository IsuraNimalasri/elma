import Image from "next/image";
import Link from "next/link";
import Performance from "./Performance";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function ProtectedHeader() {
  const pathname = usePathname();
  const routeNameMap: Record<string, string> = {
    "/home": "Home",
    "/learn": "Learn",
    "/practice": "Practice",
    "/campus": "Campus",
    "/graph": "Graph",
  };
  const pageName = routeNameMap[pathname] ?? "";
  return (
    <header className="sticky top-0 z-50 bg-white/90 supports-[backdrop-filter]:bg-white/70 backdrop-blur border-b">
      <div className={`mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <SidebarTrigger className="mr-1" />
          <Link href={pathname} className="flex items-center gap-2">
            {/* <Image src="/elma.png" alt="" width={24} height={24} /> */}
            <span className="font-bold tracking-tight text-lg">{pageName}</span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Performance />
        </div>
      </div>
    </header>
  );
}

