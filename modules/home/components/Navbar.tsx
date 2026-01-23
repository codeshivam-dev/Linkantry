import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="flex items-center justify-between w-full max-w-5xl h-14 px-6 bg-background/60 backdrop-blur-xl rounded-xl border border-border/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image 
            src="/logo.svg" 
            alt="Linkantry Logo" 
            width={120} 
            height={24} 
            className="dark:invert" // Ensures logo adapts if it's a black SVG
          />
        </Link>

        {/* Desktop Navigation Links (Optional/Minimal) */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Features</Link>
          <Link href="/pricing" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Pricing</Link>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs font-medium tracking-tight"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button 
                size="sm" 
                className="text-xs font-medium tracking-tight rounded-md px-4"
              >
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            {/* Clerk Customization to match Shadcn variables */}
            <div className="flex items-center border-l border-border pl-3 ml-1">
              <UserButton
                appearance={{
                  elements: {
                    userButtonBox: "hover:opacity-80 transition-opacity",
                    userButtonOuterIdentifier: "font-medium text-xs tracking-tight text-foreground",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}