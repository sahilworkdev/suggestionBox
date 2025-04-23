"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useMetaMask() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    try {
      if (!(window as any).ethereum) {
        setError("MetaMask not found");
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setIsConnected(true);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to connect");
    }
  };

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
        setIsConnected(!!accounts[0]);
      });
    }
  }, []);

  return { account, isConnected, error, connect };
}
