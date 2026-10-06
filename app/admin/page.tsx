import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
  <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-8">
    <h1 className="text-4xl font-bold text-white">
      ADMIN DISTRITOCAPS
    </h1>

    <LogoutButton />
  </main>
);
}