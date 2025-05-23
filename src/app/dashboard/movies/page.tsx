import { createClient } from "../../../../supabase/server";
import MoviesClient from "./client-page";
import { redirect } from "next/navigation";

export default async function MoviesPage() {
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

  // Fetch movies from Supabase
  const { data: movies } = await supabase.from("movies").select("*");

  return <MoviesClient user={user} movies={movies || []} />;
}
