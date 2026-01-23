import { Github, BarChart3, Globe, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { onboardUser } from "@/modules/auth/actions";
import { getCurrentUsername } from "@/modules/profile/actions";
import ClaimLinkForm from "@/modules/home/components/claim-link-form";

export default async function Home() {
  const user = await onboardUser();
  const profile = await getCurrentUsername();

  // Redirect if not authenticated 
  if (!user.success) {
    return redirect("/sign-in");
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center pt-20 md:pt-32 overflow-x-hidden selection:bg-[#41B313]/30">
      
      <div 
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 bg-[#41B313]/5 blur-[120px] dark:bg-[#41B313]/10" 
        aria-hidden="true"
      />

      <div className="container relative z-10 flex flex-col items-center px-4 text-center">
        
        {/* Engineering Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-[11px] uppercase tracking-[0.2em] font-bold mb-8 backdrop-blur-sm">
          <Zap className="h-3 w-3 text-[#41B313] fill-[#41B313]" />
          <span className="text-muted-foreground">The Identity Infrastructure</span>
        </div>

        {/* Hero Title */}
        <h1 className="max-w-4xl text-5xl font-bold tracking-tighter text-foreground md:text-8xl leading-[0.95] lg:leading-[0.9]">
          Everything you are. <br />
          <span className="text-[#41B313] italic font-serif">In one simple link.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
          Join the next generation of developers and creators. One high-performance 
          platform to manage your social footprint and share your profile with a single URL.
        </p>

        {/* INTERACTIVE LAYER: Explicitly lifted to z-50 */}
        <div className="mt-12 w-full max-w-md relative z-50 pointer-events-auto">
          {profile?.username ? (
            <Link href="/admin/my-tree">
              <Button size="lg" className="group px-8 py-6 text-lg font-medium rounded-xl gap-2 transition-all hover:shadow-[0_0_20px_rgba(65,179,19,0.3)] bg-primary hover:bg-primary/90">
                Go to Dashboard
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <div className="w-full bg-background/80 backdrop-blur-md rounded-xl p-1 border border-border/50 shadow-xl">
               <ClaimLinkForm />
            </div>
          )}
        </div>

        {/* VISUAL PREVIEW LAYER: Kept at z-10 */}
        <div className="mt-20 relative z-10 w-full max-w-5xl group">
          <div className="relative rounded-xl border border-border/50 bg-background/30 p-1.5 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-[#41B313]/20">
            <div className="rounded-lg border border-border/40 bg-background/80 overflow-hidden">
              {/* Browser Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/20">
                <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500/20" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500/20" />
                  <div className="h-2 w-2 rounded-full bg-green-500/20" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded bg-background/50 border border-border/50">
                  <Globe className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground font-mono">
                    linkatry.com/{profile?.username || 'yourname'}
                  </span>
                </div>
                <div className="w-10" />
              </div>

              {/* Browser Content Preview */}
              <div className="aspect-video p-8 bg-background flex flex-col items-center justify-center">
                 <div className="w-full max-w-xs space-y-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#41B313]/20 to-[#41B313]/5 mx-auto border border-[#41B313]/20 flex items-center justify-center">
                       <Zap className="h-6 w-6 text-[#41B313]" />
                    </div>
                    <div className="space-y-2 text-center">
                        <div className="h-4 w-32 bg-muted rounded mx-auto" />
                        <div className="h-3 w-48 bg-muted/50 rounded mx-auto" />
                    </div>
                    <div className="space-y-3 pt-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-11 w-full rounded-lg border border-border/60 bg-muted/5 flex items-center px-4">
                               <div className="h-2 w-24 bg-muted/40 rounded" />
                            </div>
                        ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl border-t border-border/50 pt-16 mb-20">
          <FeatureItem 
            icon={<Globe className="h-5 w-5 text-[#41B313]" />}
            title="Unified Identity"
            description="Consolidate your entire social presence into a single, high-fidelity profile."
          />
          <FeatureItem 
            icon={<BarChart3 className="h-5 w-5 text-[#41B313]" />}
            title="Deep Analytics"
            description="Track clicks, referrers, and geographic data in real-time."
          />
          <FeatureItem 
            icon={<Github className="h-5 w-5 text-[#41B313]" />}
            title="Developer First"
            description="High-performance infrastructure built with Next.js and Tailwind CSS."
          />
        </div>
      </div>
    </main>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="text-left space-y-3">
      <div className="h-10 w-10 rounded-lg border border-border bg-background flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="font-bold tracking-tight text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}