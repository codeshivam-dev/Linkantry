"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2, XCircle } from "lucide-react"; 
import { checkProfileUsernameAvailability, claimUsername } from "@/modules/profile/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ClaimLinkForm = () => {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isClaiming, setIsClaiming] = useState(false); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin.replace(/^https?:\/\//, ""));
    }
  }, []);

  useEffect(() => {
    const trimmedValue = linkValue.trim();
    if (!trimmedValue) {
      setIsAvailable(null);
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsChecking(true);
      try {
        const result = await checkProfileUsernameAvailability(trimmedValue);
        setIsAvailable(result.available);
        setSuggestions(result.suggestions || []);
      } catch (err) {
        console.error("Availability check failed", err);
      } finally {
        setIsChecking(false);
      }
    }, 400); 

    return () => clearTimeout(timer);
  }, [linkValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safety check: ensure we aren't already claiming, still checking, or unavailable
    if (!linkValue.trim() || !isAvailable || isChecking || isClaiming) return;

    try {
      setIsClaiming(true);
      const result = await claimUsername(linkValue);
      if (result.success) {
        toast.success("Link claimed successfully!");
        router.push(`/admin`);
      } else {
        toast.error(result.error || "Failed to claim link.");
      }
    } catch (error) {
      console.error("Error claiming link:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsClaiming(false);
    }
  };

  const displayOrigin = origin || "treebio.com";

  return (
    <div className="space-y-8 max-w-md mx-auto w-full">
      <form className="space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="flex items-center px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700">
              <span className="text-sm text-neutral-600 dark:text-neutral-300 font-medium">
                {displayOrigin}/
              </span>
            </div>
            <div className="flex-1 relative flex items-center">
              <Input
                type="text"
                placeholder="yourname"
                value={linkValue}
                onChange={(e) =>
                  setLinkValue(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))
                }
                maxLength={30}
                className="font-medium h-12 px-3 border-0 shadow-none focus-visible:ring-0 bg-transparent"
              />
              {linkValue && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isChecking ? (
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                  ) : isAvailable ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          {linkValue && !isChecking && (
            <div className="mt-2 text-sm">
              {isAvailable ? (
                <span className="text-green-600 flex items-center gap-1">
                  Username is available!
                </span>
              ) : (
                <>
                  <span className="text-red-600 block">Username already taken</span>
                  {suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs text-neutral-500">Try:</span>
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setLinkValue(s)}
                          className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={!linkValue.trim() || !isAvailable || isChecking || isClaiming}
          className="w-full h-12 text-base font-semibold"
        >
          {isClaiming ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {isClaiming ? "Claiming..." : "Claim Your Link"}
        </Button>
      </form>
    </div>
  );
};

export default ClaimLinkForm;