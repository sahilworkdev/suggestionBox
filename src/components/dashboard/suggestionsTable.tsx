"use client";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { InfoIcon, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { BrowserProvider, Contract } from "ethers";
import { contractABI } from "@/abi";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { cn, decryptFromBytes } from "@/lib/utils";

type Suggestion = {
  id: string;
  createdAt: string;
  topic: string;
  desc: string;
  isPrivate: boolean;
  isDeleted: boolean;
  isActive: boolean;
};
export default function SuggestionsTable() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const secretKey = String(getCookie("userAccount"));

  const fetchUserLinks = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) return;

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getLinksByCreator(userAddress);
      console.log("dashboard", info[0]);
      const id = decryptFromBytes(secretKey, info[0][0]);
      const topic = decryptFromBytes(secretKey, info[0][1]);
      const desc = decryptFromBytes(secretKey, info[0][2]);
      const isActive = decryptFromBytes(secretKey, info[0][3]);
      const isDeleted = decryptFromBytes(secretKey, info[0][4]);
      const isPrivate = decryptFromBytes(secretKey, info[0][5]);

      setSuggestions([
        {
          id,
          createdAt: new Date().toISOString(),
          topic,
          desc,
          isActive: isActive === "true",
          isDeleted: isDeleted === "true",
          isPrivate: isPrivate === "true",
        },
      ]);
    } catch (err) {
      console.error("Error fetching links:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLinks();
  }, []);

  console.log(">>>>>", suggestions);

  return (
    <div className="w-full container mx-auto px-4">
      <div className="w-full justify-between flex items-baseline">
        <h2 className="text-2xl font-medium mb-4">Your Suggestions</h2>
        <Button variant={"ghost"}>
          <Link href={"/dashboard/create"} className="flex items-center gap-2">
            <PlusCircle className="w-4 h-auto" />
            Create
          </Link>
        </Button>
      </div>
      <ScrollArea className="h-[600px] w-full">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="p-2 md:p-4">Date</TableHead>
              <TableHead className="p-2 md:p-4">Name</TableHead>
              <TableHead className="p-2 md:p-4 text-center">Received</TableHead>
              <TableHead className="p-2 md:p-4 text-center">Status</TableHead>
              <TableHead className="p-2 md:p-4 text-center">Privacy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suggestions?.map((suggestion: Suggestion) => (
              <TableRow key={suggestion?.id}>
                <TableCell className="font-medium text-left p-2 md:p-4">
                  <Link href={`/dashboard/${suggestion?.id}`} className="block">
                    <span className="sm:hidden">
                      {new Date(
                        String(suggestion?.createdAt)
                      ).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="hidden sm:inline">
                      {new Date(
                        String(suggestion?.createdAt)
                      ).toLocaleDateString()}
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="font-medium p-0">
                  <Link
                    href={`/dashboard/${suggestion?.id}`}
                    className="block p-2 md:p-4 capitalize"
                  >
                    {suggestion?.topic}
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-center">
                  <Link
                    href={`/dashboard/${suggestion?.id}`}
                    className="block p-2 md:p-4 capitalize"
                  >
                    40
                  </Link>
                </TableCell>
                <TableCell className="text-center p-0">
                  <Link
                    href={`/dashboard/${suggestion?.id}`}
                    className="block p-2 md:p-4"
                  >
                    <Badge
                      className={cn(
                        "capitalize",
                        suggestion?.isActive ? "bg-yellow-500" : "bg-gray-500"
                      )}
                    >
                      {suggestion?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-center p-0">
                  <Link
                    href={`/dashboard/${suggestion?.id}`}
                    className="block p-2 md:p-4"
                  >
                    <Badge
                      className={cn(
                        "capitalize",
                        suggestion?.isPrivate ? "bg-red-500" : "bg-green-500"
                      )}
                    >
                      {suggestion?.isPrivate ? "Private" : "Public"}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-center p-0">
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="cursor-pointer hover:text-red-500"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {suggestions.length === 0 && !loading && <TableRow className="row-span-6 text-center py-10">No Data</TableRow>}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
