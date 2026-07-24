import { AdminLogin } from "@/app/admin/admin-login";
import { AdminPanel } from "@/app/admin/admin-panel";
import { hasAdminSession, isAdminConfigured } from "@/lib/admin-auth";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await hasAdminSession())) return <AdminLogin configured={isAdminConfigured()} />;
  return <AdminPanel initialContent={await readContent()} />;
}
