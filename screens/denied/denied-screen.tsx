import { Button } from "@/components/ui/button";
import { signOut } from "@/screens/sign-in/actions";

export function DeniedScreen({ email }: { email: string | null }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Access denied</h1>
          <p className="text-sm text-muted-foreground">
            {email ? (
              <>
                <span className="font-medium">{email}</span> does not have
                access to the Padeline Admin Portal.
              </>
            ) : (
              "This account does not have access to the Padeline Admin Portal."
            )}
          </p>
        </div>
        <form action={signOut}>
          <Button variant="outline" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
