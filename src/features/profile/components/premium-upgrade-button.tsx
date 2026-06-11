'use client'

import { Button } from "@/components/ui/button"
import { createPremiumCheckout } from "../actions/create-premium-checkout";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

const PremiumUpgradeButton = () => {

    const { execute, isPending } = useAction(createPremiumCheckout, {
        onSuccess: ({ data }) => {
  console.log("Stripe URL:", data?.url);

  if (data?.url) {
    window.location.href = data.url;
  }
},
        onError: ({ error }) => {
            const errorMessage = error.serverError || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        }
    });
  return (
      <div><Button onClick = {() => execute({})} disabled={isPending} className="bg-yellow-500">{isPending ? "Redirecting..." : "Upgrade to premium" }</Button>
          </div>
          
  )
}

export default PremiumUpgradeButton