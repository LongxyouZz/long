"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import { InfoIcon, UserCircle, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function DashboardClient({ user }: { user: any }) {
  const { t } = useLanguage();

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
              <ShieldCheck className="h-6 w-6 text-green-500" />
            </div>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>{t("protectedPage")} - Admin Access Only</span>
            </div>
          </header>

          {/* User Profile Section */}
          <section className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle size={48} className="text-primary" />
              <div>
                <h2 className="font-semibold text-xl">{t("userProfile")}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs font-medium text-green-600 mt-1">
                  Role: {user.user_metadata?.role || "admin"}
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
              <pre className="text-xs font-mono max-h-48 overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
