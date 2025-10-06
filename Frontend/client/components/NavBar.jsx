// import { Link, NavLink, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useAuth } from "@/providers/AuthProvider";
// import HelpSheet from "@/components/HelpSheet";

// export default function NavBar() {
//   const { user, signOut } = useAuth();
//   const { pathname } = useLocation();
//   const linkClass = ({ isActive }: { isActive: boolean }) =>
//     cn(
//       "px-3 py-2 text-sm leading-5 font-medium rounded-[10px]",
//       isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent",
//     );

//   return (
//     <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-14 items-center justify-between">
//         <div className="flex items-center gap-3">
//           <Link to="/" className="flex items-center gap-2">
//             <img src="https://cdn.builder.io/api/v1/image/assets%2Fa4d94ceea96942ee809e61c2b7935e1b%2Fb62c99d73d614cb5b754b7823b1bc372?format=webp&width=800" alt="HEALTH360 logo" className="h-[70px] w-full object-contain self-center pt-2" /><span className="text-base font-semibold" style={{ letterSpacing: "-0.4px" }}>HEALTH360</span>
//           </Link>
//           <nav className="hidden md:flex items-center gap-1 ml-4">
//             {/* <NavLink to="/" className={linkClass} end>
//               Dashboard
//             </NavLink> */}
//             <NavLink to="/account" className={linkClass}>
//               Account
//             </NavLink>
//             <NavLink to="/settings" className={linkClass}>
//               Settings
//             </NavLink>
//           </nav>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="hidden md:block">
//             <HelpSheet />
//           </div>
//             <div className="flex items-center gap-3">
//               <span className="hidden sm:inline text-sm text-muted-foreground"></span>
//               <Button variant="outline" onClick={signOut}>
//                 Sign out
//               </Button>
//             </div>

//         </div>
//       </div>
//       <div className="md:hidden border-t">
//         <nav className="container flex items-center gap-1 py-2 overflow-x-auto">
//           <NavLink to="/" className={linkClass} end>
//             Dashboard
//           </NavLink>
//           <NavLink to="/account" className={linkClass}>
//             Account
//           </NavLink>
//           <NavLink to="/settings" className={linkClass}>
//             Settings
//           </NavLink>
//         </nav>
//       </div>
//     </header>
//   );
// }

import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider.jsx";
import HelpSheet from "@/components/HelpSheet";

export default function NavBar() {
  const { signOut } = useAuth();
  const { pathname } = useLocation();

  // Removed type annotation for the linkClass parameter
  const linkClass = ({ isActive }) =>
    cn(
      "px-3 py-2 text-sm leading-5 font-medium rounded-[10px]",
      isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent",
    );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Fa4d94ceea96942ee809e61c2b7935e1b%2Fb62c99d73d614cb5b754b7823b1bc372?format=webp&width=800" alt="HEALTH360 logo" className="h-[70px] w-full object-contain self-center pt-2" /><span className="text-base font-semibold" style={{ letterSpacing: "-0.4px" }}>HEALTH360</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {/* <NavLink to="/" className={linkClass} end>
              Dashboard
            </NavLink> */}
            <NavLink to="/account" className={linkClass}>
              Account
            </NavLink>
            <NavLink to="/settings" className={linkClass}>
              Settings
            </NavLink>
          </nav>
        </div>
       
        <div className="flex items-center gap-2">
        <NavLink to="/about" className={linkClass}>
              About Us
            </NavLink>
          <div className="hidden md:block">
            <HelpSheet />
          </div>
          
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-muted-foreground"></span>
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </div>

        </div>
      </div>
      <div className="md:hidden border-t">
        <nav className="container flex items-center gap-1 py-2 overflow-x-auto">
          {/* <NavLink to="/" className={linkClass} end>
            Dashboard
          </NavLink> */}
          <NavLink to="/account" className={linkClass}>
            Account
          </NavLink>
          <NavLink to="/settings" className={linkClass}>
            Settings
          </NavLink>
        </nav>
      </div>
    </header>
  );
}