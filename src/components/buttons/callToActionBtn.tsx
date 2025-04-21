"use client";
import { useRouter } from "next/navigation";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useMetaMask } from "@/hooks/useMetaMask";
import { toast } from "sonner";

export default function CallToActionBtn() {
  const router = useRouter();
  const { account, isConnected } = useMetaMask();
  return (
    <InteractiveHoverButton
      className="h-11 px-8 border border-white"
      onClick={() => {
        account && isConnected
          ? router.push("/dashboard/create")
          : toast.info("Please connect your wallet first.");
      }}
    >
      Start Collecting Suggestions
    </InteractiveHoverButton>
  );
}
