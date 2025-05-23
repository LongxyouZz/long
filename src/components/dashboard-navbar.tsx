"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Home,
  Film,
  LayoutDashboard,
  Settings,
  Users,
  PlusCircle,
  ListFilter,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../contexts/language-context";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" prefetch className="text-xl font-bold">
            Logo
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              {t("dashboard")}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary p-0 h-auto"
                >
                  <Film className="h-4 w-4" />
                  {t("movies")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/movies"
                    className="flex items-center gap-2 w-full"
                  >
                    <ListFilter className="h-4 w-4" />
                    {t("allMovies")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/movies/add"
                    className="flex items-center gap-2 w-full"
                  >
                    <PlusCircle className="h-4 w-4" />
                    {t("addMovie")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/movies/categories"
                    className="flex items-center gap-2 w-full"
                  >
                    <ListFilter className="h-4 w-4" />
                    {t("categories")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <BarChart3 className="h-4 w-4" />
              {t("analytics")}
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <Users className="h-4 w-4" />
              {t("users")}
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href="/dashboard/settings"
            className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-primary"
          >
            <Settings className="h-4 w-4" />
            {t("settings")}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t("adminPanel")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 w-full"
                >
                  {t("profile")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 w-full md:hidden"
                >
                  {t("settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                {t("signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
