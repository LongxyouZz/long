"use client";

import Link from "next/link";
import { Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300 dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Movies Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("movies")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#featured"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("featured")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("newReleases")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("mostWatched")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("topRated")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("categories")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("action")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("comedy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("drama")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("thriller")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("support")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("helpCenter")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("reportIssue")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("termsOfService")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("dmca")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
                >
                  {t("contentGuidelines")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} MovieStream. {t("allRightsReserved")}
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
            >
              <span className="sr-only">YouTube</span>
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
