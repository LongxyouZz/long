"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Film, PlayCircle, Search } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-black dark:bg-gray-950">
      {/* Background gradient with movie-themed overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900 opacity-90 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80')] bg-cover bg-center opacity-20" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tight">
              {t("streamMovies").split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300">
                {t("movies")}
              </span>{" "}
              {t("streamMovies").split(" ").slice(-2).join(" ")}
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t("heroDescription")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                {t("browseMovies")}
                <Film className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#featured"
                className="inline-flex items-center px-8 py-4 text-gray-200 bg-gray-800 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors text-lg font-medium dark:bg-gray-700 dark:bg-opacity-50 dark:hover:bg-opacity-70"
              >
                {t("featuredToday")}
                <PlayCircle className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span>{t("freeContent")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span>{t("noRegistration")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span>{t("hdQuality")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
