 


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthProvider.jsx";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";
// The useToast hook is typically used for a different toast system,
// but since the component uses 'sonner', we'll keep the import for completeness
// assuming it might be needed elsewhere or is a leftover.
import { useToast } from "@/hooks/use-toast"; 

export default function Login() {
  const { user, signInWithGoogle, signInWithEmailPassword, signUpWithEmailPassword, mode } = useAuth();
  const navigate = useNavigate();
  // Removed explicit type annotations
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Changed from useState<string | null>(null)

  if (user) return <Navigate to="/" replace />;

  // Removed explicit type annotation for the event parameter (e: React.FormEvent)
  async function handleEmailSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      toast.error("Password Mismatch");
      setLoading(false);
      return;
    }

    // Safely parse local storage item
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (users.find((u) => u.email === email)) {
      toast.error("User already exists!");
      setLoading(false);
      return;
    }
    
    try {
      // NOTE: The original code was using 'handleEmailSignIn' for a 'Sign Up' operation 
      // where it was storing users in local storage and navigating, instead of using 'signInWithEmailPassword'.
      // We keep the logic as it was: performing a local storage sign-up/register.
      users.push({ email, password, name });
      localStorage.setItem("users", JSON.stringify(users));

      toast.success("Sign up successful");
      // You might want to call signInWithEmailPassword here or navigate to a login page.
      // Keeping original navigation:
      navigate("/"); 
    } catch (e) { // Removed type assertion (: any)
      setError(e?.message ?? "Failed to sign up");
    } finally {
      setLoading(false);
    }
  }

  // NOTE: This function is present in the original code but isn't used in the returned JSX, 
  // which suggests the form is purely for registration/sign-up. We keep it as is.
  // Removed explicit type annotation for the event parameter (e: React.FormEvent)
  async function handleEmailSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signUpWithEmailPassword(email, password);
      navigate("/");
    } catch (e) { // Removed type assertion (: any)
      setError(e?.message ?? "Failed to sign up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] grid place-items-center bg-gradient-to-br from-primary/5 via-emerald-200/10 to-background">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-semibold">Welcome at HEALTH360 </h1>
          <p className="text-sm text-muted-foreground">Sign up to create your account</p>
          {mode === "demo" && (
            <p className="mt-2 text-xs text-amber-600">
              {/* Demo authentication is active. For production, connect Supabase auth via MCP. */}
            </p>
          )}
        </div>
        <div className="space-y-3">
          {/* <Button className="w-full" variant="secondary" onClick={signInWithGoogle}>
            Continue with Google
          </Button> */}
          <div className="relative text-center">
            <span className="px-2 text-xs text-muted-foreground bg-card relative z-10">or</span>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t" />
          </div>
          <form className="space-y-3" onSubmit={handleEmailSignIn}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit"  className="flex-1" disabled={loading}>
                Sign up
              </Button>
               
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}