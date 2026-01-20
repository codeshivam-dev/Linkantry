import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background">
      
      {/* Brand Side: Now with Modern Texture & Color */}
      <div className="relative hidden lg:flex flex-col justify-center bg-neutral-950 p-10 overflow-hidden">
        {/* The "Modern" background: A soft radial glow and a grid pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="absolute left-0 right-0 top-[-10%] h-250 w-250 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#1e1b4b,transparent)]"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-3xl">🌳</span>
            <span className="text-2xl font-bold tracking-tighter text-white">Linkatry</span>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight text-white leading-tight">
            The platform for <br />
            <span className="text-neutral-400">builders learning in public.</span>
          </h2>
          
          <div className="mt-10 space-y-6">
            <div className="flex gap-4 items-start">
              <div className="mt-1 h-6 w-6 rounded-full bg-neutral-800 flex items-center justify-center text-xs text-neutral-400">1</div>
              <p className="text-neutral-300">Claim your custom link-in-bio username.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1 h-6 w-6 rounded-full bg-neutral-800 flex items-center justify-center text-xs text-neutral-400">2</div>
              <p className="text-neutral-300">Share your progress, not just your achievements.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-auto text-sm text-neutral-500">
          © 2026 Linkatry. Built for the community.
        </div>
      </div>

      {/* Auth Side */}
      <div className="flex flex-col items-center justify-center p-6 lg:p-10">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          {/* Mobile Header */}
          <div className="flex flex-col space-y-2 text-center lg:hidden mb-4">
            <h1 className="text-3xl font-bold tracking-tighter">Linkatry🌳</h1>
            <p className="text-muted-foreground">Create your account to get started.</p>
          </div>
          
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-none bg-transparent w-full",
                headerTitle: "text-2xl font-bold tracking-tight text-foreground",
                headerSubtitle: "text-muted-foreground",
                socialButtonsBlockButton: "border border-input bg-background hover:bg-accent transition-all duration-200 py-6",
                formButtonPrimary: "bg-primary text-primary-foreground hover:opacity-90 py-6 text-sm font-medium",
                footer: "hidden",
                formFieldLabel: "text-foreground font-medium",
                formFieldInput: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                footerActionLink: "text-primary hover:underline font-semibold"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}