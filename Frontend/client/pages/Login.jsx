
import "../global.css"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Assuming generateToken is defined in AuthProvider or its scope
import { generateToken, useAuth } from "@/providers/AuthProvider.jsx";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"





export default function Login() {
  const { user, signInWithGoogle, signInWithEmailPassword, signUpWithEmailPassword, mode } = useAuth();
  const navigate = useNavigate();
  // Removed explicit type annotations
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Changed from useState<string | null>(null)

  if (user) return <Navigate to="/" replace />;

  // Removed explicit type annotation for the event parameter (e: React.FormEvent)
  async function handleEmailSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (!foundUser) {
      toast.error("Invalid email or password");
      setLoading(false);
      return;
    }

    try {
      // NOTE: The original code implements its own token generation/storage
      // and bypasses the `signInWithEmailPassword` from `useAuth`.
      // We keep the local storage implementation for sign-in validation.
      const token = generateToken(foundUser);
      localStorage.setItem("token", token);
      localStorage.setItem('email', email);

      toast.success("You have successfully signed in");
      navigate("/dashboard");
    } catch (e) { // Removed type assertion (: any)
      toast.error(e?.message ?? "Failed to sign in");
      setError(e?.message ?? "Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  // Removed explicit type annotation for the event parameter (e: React.FormEvent)
  async function handleEmailSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // The original logic just navigates to the sign-up page
      navigate("/signup");
    } catch (e) { // Removed type assertion (: any)
      setError(e?.message ?? "Failed to sign up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)]  grid place-items-center bg-gradient-to-br from-primary/5 via-emerald-200/10 to-background">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-semibold">Welcome, HEALTH360</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
          {mode === "demo" && (
            <p className="mt-2 text-xs text-amber-600">
              {/* Demo authentication is active. For production, connect Supabase auth via MCP. */}
            </p>
          )}
        </div>
        <div className="space-y-3">

          <div className="relative text-center">
            <span className="px-2 text-xs text-muted-foreground bg-card relative z-10">or</span>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t" />
          </div>
          {/* Note: The onSubmit handler for the form is missing, but the submit button 
              explicitly calls handleEmailSignIn, so the form tag is kept as is. */}
          <form className="space-y-3" >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-center">
              <Button type="submit" onClick={handleEmailSignIn} className="flex-1" disabled={loading}>
                Sign in
              </Button>
            </div>
            <div>
              <div className="relative text-center">
                <span className="px-2 text-xs text-muted-foreground bg-card relative z-10">If You Don't Have an Account</span>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t" />
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="button" variant="outline" className="flex-1" disabled={loading} onClick={handleEmailSignUp}>
                Create your Health account
              </Button>
            </div>
            <div className="relative text-center">
              <span className="px-2 text-xs text-muted-foreground bg-card relative z-10">or</span>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t" />
            </div>
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
                localStorage.setItem("credentials",JSON.stringify(jwtDecode(credentialResponse.credential)))
                console.log(jwtDecode(credentialResponse.credential))
                toast.success("You have successfully signed in");
                navigate('/dashboard')
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              width={500} logo_alignment="center" type="standard" size="large"
            />


          </form>
        </div>
      </div>
    </div>
  );
}