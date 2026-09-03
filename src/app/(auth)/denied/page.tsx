import { redirect } from "next/navigation";
import { verifySession } from "@/server/auth/session";
import { DeniedScreen } from "@/screens/denied/denied-screen";

export default async function DeniedPage() {
  const claims = await verifySession();
  if (!claims) redirect("/sign-in");
  return <DeniedScreen email={claims.email ?? null} />;
}
