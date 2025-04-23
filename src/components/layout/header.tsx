"use client";
import { MessageCircleHeart } from "lucide-react";
import Link from "next/link";
import ConnectButton from "../buttons/connectMetaMaskButton";
// import { useMetaMask } from "@/hooks/useMetaMask";
// import { ShinyButton } from "../magicui/shiny-button";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { setCookie } from "cookies-next";

export default function Header() {
  // const { account, isConnected, connect, error } = useMetaMask();
  // const router = useRouter();

  // useEffect(() => {
  //   if (isConnected && account) {
  //     setCookie("userAccount", account, {
  //       maxAge: 30 * 24 * 60 * 60, // 30 days
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "strict",
  //     });
  //   }
  // }, [isConnected, account]);

  // console.log(account);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-0">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold flex items-center justify-center gap-1">
              {" "}
              <MessageCircleHeart /> Suggestion Box
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {/* {account && isConnected && (
              <ShinyButton
                className="px-4 py-2 bg-black  border cursor-pointer border-gray-400 rounded-md"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                <span className="font-medium capitalize">Dashboard</span>
              </ShinyButton>
            )} */}
            <ConnectButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
