import { useAuth } from "@/providers/AuthProvider.jsx";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Account() {
  const { user } = useAuth();
  return (
    <div className="">
      <NavBar/>
      <div className="container">

      <h1 className="text-2xl font-semibold py-6">Account</h1>
      {!user ? (
        <p className="mt-2 text-muted-foreground">
          You are not signed in. <Button asChild variant="link"><Link to="/login">Sign in</Link></Button>
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{user.name ?? "—"}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email ?? "—"}</p>
          </div>
          <div className="rounded-lg border p-4 sm:col-span-2">
            <p className="text-sm text-muted-foreground">Authentication</p>
            <p className="mt-1 text-sm">
              For production auth (Google and email/password), connect Supabase via MCP. Click Open MCP popover and connect to Supabase.
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm">
              <li>Go to Open MCP popover and Connect to Supabase.</li>
              <li>Configure your project credentials as environment variables.</li>
              <li>We can then switch this demo auth to real Supabase auth.</li>
            </ul>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
