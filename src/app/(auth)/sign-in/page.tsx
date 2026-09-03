import { redirect } from "next/navigation";
import { verifySession } from "@/server/auth/session";
import { SignInScreen } from "@/screens/sign-in/sign-in-screen";

export default async function SignInPage() {
  const claims = await verifySession();
  if (claims) redirect("/admin");
  return <SignInScreen />;
}
