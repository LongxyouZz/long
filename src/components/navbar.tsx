import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { User, UserCircle } from "lucide-react";
import UserProfile from "./user-profile";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import MobileMenu from "./mobile-menu";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-background py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="text-xl font-bold">
          Logo
        </Link>
        <div className="flex gap-4 items-center">
          {/* Language and Theme Switchers - Desktop */}
          <div className="hidden sm:flex items-center gap-2 mr-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>

          {/* Main Navigation - Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <Button>Dashboard</Button>
                </Link>
                <UserProfile />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <MobileMenu isLoggedIn={!!user} />
          </div>
        </div>
      </div>
    </nav>
  );
}
