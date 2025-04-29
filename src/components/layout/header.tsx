"use client";
import { LogOut, MessageCircleHeart } from "lucide-react";
import Link from "next/link";
import ConnectButton from "../buttons/connectMetaMaskButton";
import { useMetaMask } from "@/hooks/useMetaMask";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Image from "next/image";
import CopyButton from "../buttons/copyButton";

export default function Header() {
  const [user, setUser] = useState<string | null>(null);
  const { account, isConnected } = useMetaMask();
  const router = useRouter();

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (isConnected && account) {
      setCookie("userAccount", account, { path: "/", maxAge: 60 * 60 * 24 });
      router.push("/dashboard");
    }
  }, [isConnected, account]);

  useEffect(() => {
    const cookie = getCookie("userAccount") as string | null;
    setUser(cookie);
  }, []);

  const disconnectWallet = () => {
    deleteCookie("userAccount");
    toast.info(
      "To fully disconnect the waller, disconnect it from the browser also."
    );
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    if (isConnected && account) {
      setCookie("userAccount", account, { path: "/", maxAge: 60 * 60 * 24 });
      setUser(account);
    }
  }, [isConnected, account]);

  // console.log(user);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-0">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold flex items-center justify-center gap-1">
              <MessageCircleHeart /> Suggestion Box
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {!user && <ConnectButton />}
            {user && (
              <div className=" relative flex flex-col justify-end items-end border rounded-full cursor-pointer hover:border-orange-600">
                <p onClick={() => setShowProfile(!showProfile)}>
                  <Image width={20} height={20} src="/prof.svg" alt="prof" />
                </p>

                {showProfile && (
                  <div
                    className={` absolute max-w-sm top-8 shadow-md right-0 flex flex-col gap-2 border rounded p-2 justify-start items-start bg-background`}
                  >
                    <Button
                      asChild
                      variant={"ghost"}
                      onClick={() => setShowProfile(false)}
                    >
                      <Link href={"/dashboard"}>Dashboard</Link>
                    </Button>

                    <Button
                      variant={"ghost"}
                      className="cursor-pointer"
                      type="button"
                      // onClick={disconnectWallet}
                      onClick={() => {
                        setShowProfile(false);
                        disconnectWallet();
                      }}
                    >
                      <LogOut className="text-red-500" />
                      <span>Logout</span>
                    </Button>
                    <div
                      className="rounded-full px-4 py-2 bg-blue-800/40 flex justify-center items-center gap-2"
                      onClick={() => setShowProfile(false)}
                    >
                     <span className="truncate max-w-[24ch] text-ellipsis"> {user}</span> <CopyButton textToCopy={user} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
