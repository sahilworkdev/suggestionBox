"use client";
import { useMetaMask } from "@/hooks/useMetaMask";
import { ShinyButton } from "./shiny-button";
import Image from "next/image";

export default function ConnectButton() {
  const { connect } = useMetaMask();

  return (
    <div className="space-y-2 text-center">
      <ShinyButton
        onClick={connect}
        className="px-4 py-2 bg-black  border cursor-pointer border-gray-400 rounded-md "
      >
        <p className="flex justify-center items-center gap-2">
          <Image src="/metaMask.svg" width={30} height={30} alt="metamask" />
          <span className="text-white font-semibold"> Login with MetaMask</span>
        </p>
      </ShinyButton>
    </div>
  );
}
