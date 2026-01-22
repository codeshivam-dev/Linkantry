import { Button } from "@/components/ui/button";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full px-6 py-2 shadow-md border border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Linkantry Logo" width={180} height={30} />
        </Link>
        <div>
          {/* Theme Toggle */}
          <ModeToggle />

        {/* Auth Buttons */}
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="mr-2">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
