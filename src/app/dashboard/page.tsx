import DashboardNavbar from "@/components/dashboard-navbar";
import { InfoIcon, UserCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import DashboardClient from "./client-page";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user has admin role
  const isAdmin = user?.user_metadata?.role === "admin";

  if (!isAdmin) {
    return redirect("/");
  }

  return <DashboardClient user={user} />;
}
