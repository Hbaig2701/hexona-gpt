import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthSessionProvider from "@/components/auth/AuthSessionProvider";
import AppShell from "@/components/layout/AppShell";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Check if user is active
  if (!session.user.isActive) {
    redirect("/login");
  }

  return (
    <AuthSessionProvider>
      <AppShell>{children}</AppShell>
    </AuthSessionProvider>
  );
}
