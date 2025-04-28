"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { contractABI } from "@/abi";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  {
    id: "active",
    name: "Active",
    value: true,
  },
  {
    id: "inactive",
    name: "Inactive",
    value: false,
  },
];

const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

interface ChangeStatusProps {
  suggestion: string;
}

export default function ChangeStatus({ suggestion }: ChangeStatusProps) {
  const [loading, setLoading] = useState(false);

  const changeStatus = async (isActive: boolean) => {
    try {
      if (!window.ethereum) {
        console.error("No wallet found");
        return;
      }

      setLoading(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const tx = await contract.setLinkStatus(suggestion, isActive);
      await tx.wait();

      toast.success("Status changed successfully!");
    } catch (err) {
      toast.error("Error changing status:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            className="flex items-center gap-2 justify-center"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Status"}
            <ChevronDown className="w-4 h-auto" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {STATUS_OPTIONS.map((status) => (
            <DropdownMenuItem
              key={status.id}
              onClick={() => changeStatus(status.value)}
            >
              <span className="capitalize">{status.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
