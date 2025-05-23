"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/contexts/language-context";

interface MobileMenuProps {
  isLoggedIn: boolean;
}

export default function MobileMenu({ isLoggedIn }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] sm:w-[300px]">
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {t("dashboard")}
                </Link>
                <Link
                  href="/sign-out"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {t("signOut")}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {t("signIn")}
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {t("signUp")}
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
