"use client";
import { useRouter } from "next/navigation";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function CallToActionBtn() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookie = getCookie("userAccount") as string | null;
    setUser(cookie);
  }, []);

  const handleCTAClick = () => {
    if (user) {
      router.push("/dashboard/create");
    } else {
      toast.info("Please connect your wallet first.");
    }
  };
  return (
    <InteractiveHoverButton
      className="h-11 px-8 border border-white"
      onClick={handleCTAClick}
    >
      Start Collecting Suggestions
    </InteractiveHoverButton>
  );
}
