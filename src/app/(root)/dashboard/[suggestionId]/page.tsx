"use client";
import { contractABI } from "@/abi";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn, decryptFromBytes } from "@/lib/utils";
import { BrowserProvider, Contract, ethers } from "ethers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { baseUrl } from "@/constants/data";
import { Button } from "@/components/ui/button";

export default function SuggestionPage() {
  const { suggestionId } = useParams();
  const [suggestion, setSuggestion] = useState<{
    // creator: string;
    topic: string;
    description: string;
    isActive: boolean;
    isPrivate: boolean;
    feedbackCount: number;
  } | null>(null);
  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const secretKey = String(getCookie("userAccount"));

  const fetchSuggestionById = async () => {
    try {
      if (!window.ethereum || !suggestionId) return;

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getFullLinkInfo(suggestionId);
      console.log("Contract Info:", info);

      const encryptedTopicHex = info[1];
      const encryptedDescHex = info[2];

      const decryptedTopic = decryptFromBytes(secretKey, encryptedTopicHex);
      const decryptedDesc = decryptFromBytes(secretKey, encryptedDescHex);

      console.log("Decrypted Topic:", decryptedTopic);

      setSuggestion({
        topic: decryptedTopic,
        description: decryptedDesc,
        isActive: info[3],
        isPrivate: info[4],
        feedbackCount: Number(info[5]),
      });
    } catch (err) {
      console.error("Error fetching link info:", err);
    }
  };

  useEffect(() => {
    fetchSuggestionById();
  }, []);

  console.log(">>>", suggestion);

  return (
    <div className="container mx-auto py-10">
      <div className="w-full px-4 mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard"> Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{suggestion?.topic}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 my-4 px-4">
        <div className="flex items-center gap-4">
          <p className="text-2xl font-bold">{suggestion?.topic}</p>
          <Badge
            className={cn(
              "capitalize",
              suggestion?.isActive ? "bg-yellow-500" : "bg-gray-500"
            )}
          >
            {suggestion?.isActive ? "Active" : "Inactive"}
          </Badge>
          <Badge
            className={cn(
              "capitalize",
              suggestion?.isPrivate ? "bg-red-500" : "bg-green-500"
            )}
          >
            {suggestion?.isPrivate ? "Private" : "Public"}
          </Badge>
        </div>
        {/* <div className="text-sm text-wrap w-full">{suggestion?.description}</div> */}
        {/* <div className="flex items-center gap-2">
          <ChangePrivacy feedback={feedbacks[0]} />
          <ChangeStatus feedback={feedbacks[0]} />
          <MoreOptions feedbackId={feedbackId} />
        </div> */}
      </div>
      <div className="text-sm text-wrap w-full px-4">
        {suggestion?.description}
      </div>

      {/* Link Section */}
      <div className="flex justify-start items-center gap-2 mb-5 px-4">
        <Link
          href={`${baseUrl}/${suggestionId}` || "#"}
          target="_blank"
          className="text-blue-500 text-sm truncate max-w-[30ch] md:max-w-[120ch]"
        >
          {suggestion?.isActive
            ? `${baseUrl}/${suggestionId}`
            : "The link has been deactivated!"}
        </Link>
        <Button
          variant={"ghost"}
          onClick={() => {
            if (suggestion?.isActive) {
              navigator.clipboard.writeText(`${baseUrl}/${suggestionId}`);
            }
          }}
        >
          Copy
        </Button>
      </div>
    </div>
  );
}
