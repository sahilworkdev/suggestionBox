"use client";
import { useMetaMask } from "@/hooks/useMetaMask";
import { ShinyButton } from "../magicui/shiny-button";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function ConnectButton() {
  const { account, isConnected, connect, disconnect, error } = useMetaMask();


  return (
    <div className="space-y-2 text-center">
      {/* <ShinyButton
        onClick={connect}
        className="px-4 py-2 bg-black  border cursor-pointer border-gray-400 rounded-md "
      >
        <p className="flex justify-center items-center gap-2">
          {" "}
          <Image src="/metaMask.svg" width={30} height={30} alt="metamask" />
          <span className="text-white font-semibold"> Login with MetaMask</span>
        </p>
      </ShinyButton> */}
        {isConnected ? (
        <div className="flex items-center gap-4">
          <Button
            onClick={disconnect}
            variant={"ghost"}
            className="px-3 py-1.5  border cursor-pointer  rounded text-red-500"
          >
            <p className="flex justify-center items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span className="text-white font-semibold">Logout</span>
            </p>
          </Button>
        </div>
      ) : (
        <ShinyButton
          onClick={connect}
          className="px-4 py-2 bg-black border cursor-pointer border-gray-400 rounded-md"
        >
          <p className="flex justify-center items-center gap-2">
            <Image src="/metaMask.svg" width={24} height={24} alt="metamask" />
            <span className="text-white font-semibold capitalize text-sm">Login with MetaMask</span>
          </p>
        </ShinyButton>
      )}
    </div>
  );
}
