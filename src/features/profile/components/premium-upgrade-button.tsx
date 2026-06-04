'use client'

import { Button } from "@/components/ui/button"
import { createPremiumCheckout } from "../actions/create-premium-checkout";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

const PremiumUpgradeButton = () => {

    const { execute, isPending } = useAction(createPremiumCheckout, {
        onSuccess: ({data}) => {
            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error("Unable to reach checkout link");
            }
        },
        onError: () => {
            toast.error("Unable to reach checkout");
        }
    });
  return (
      <div><Button onClick = {() => execute({})} disabled={isPending} className="bg-yellow-500">{isPending ? "Redirecting..." : "Upgrade to premium" }</Button>
          </div>
          
  )
}

export default PremiumUpgradeButton