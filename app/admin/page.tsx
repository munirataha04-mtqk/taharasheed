import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard | Royal Metalworks",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthed())) redirect("/admin/login");
  return <AdminDashboard />;
}