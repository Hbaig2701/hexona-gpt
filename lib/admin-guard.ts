import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { authorized: false as const, error: "Unauthorized" };
  if (session.user.role !== "ADMIN") return { authorized: false as const, error: "Forbidden" };
  return { authorized: true as const, session };
}
