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
import { BrowserProvider, Contract } from "ethers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { baseUrl } from "@/constants/data";
import { Button } from "@/components/ui/button";
import ChangePrivacy from "@/components/dashboard/changePrivacy";
import ChangeStatus from "@/components/dashboard/changeStatus";
import { Check, Copy } from "lucide-react";
import MoreOptions from "@/components/dashboard/moreOptions";

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
  const [copied, setCopied] = useState(false);
  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const secretKey = String(getCookie("userAccount"));
  const [feedbacks, setFeedbacks] = useState<
    { content: string; author: string; timestamp: number; feedbackId: number }[]
  >([]);

  const handleCopyLink = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const fetchSuggestionById = async () => {
    try {
      if (!window.ethereum || !suggestionId) return;

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getFullLinkInfo(suggestionId);
      // console.log("Contract Info:", info);

      const encryptedTopicHex = info[1];
      const encryptedDescHex = info[2];

      const decryptedTopic = decryptFromBytes(secretKey, encryptedTopicHex);
      const decryptedDesc = decryptFromBytes(secretKey, encryptedDescHex);

      // console.log("Decrypted Topic:", decryptedTopic);

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

  const fetchFeedbacks = async () => {
    console.log("hi");
    try {
      console.log(suggestionId);
      if (!window.ethereum || !suggestionId) return;
      console.log("hiiih");

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);
      const linkIdBytes = suggestionId;

      // const [contents, authors, timestamps, feedbackIds] = await contract.getLinkFeedbacks(linkIdBytes);
      const info = await contract.getLinkFeedbacks(linkIdBytes);

      console.log("info", info);
      // const decryptedFeedbacks = contents.map((contentBytes: string | Uint8Array, index: number) => {
      //   const decryptedContent = decryptFromBytes(secretKey, contentBytes);

      //   return {
      //     content: decryptedContent,
      //     author: authors[index],
      //     timestamp: Number(timestamps[index]),
      //     feedbackId: Number(feedbackIds[index]),
      //   };

      // });

      // setFeedbacks(decryptedFeedbacks);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchSuggestionById();
    fetchFeedbacks();
  }, []);

  console.log(">>>", feedbacks);

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

        <div className="flex items-center gap-2">
          <ChangePrivacy suggestion={String(suggestionId)} />
          <ChangeStatus suggestion={String(suggestionId)} />
          <MoreOptions suggestion={String(suggestionId)} />
        </div>
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
          onClick={() => handleCopyLink(`${baseUrl}/${suggestionId}`)}
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>
      {feedbacks.length > 0 && (
        <div className="px-4 mt-8">
          <h2 className="text-xl font-bold mb-4">
            Feedbacks ({feedbacks.length})
          </h2>
          <div className="flex flex-col gap-4">
            {feedbacks.map((fb) => (
              <div
                key={fb.feedbackId}
                className="p-4 border rounded-lg shadow-sm"
              >
                <p className="text-gray-800">{fb.content}</p>
                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>
                    Author: {fb.author.slice(0, 6)}...{fb.author.slice(-4)}
                  </span>
                  <span>{new Date(fb.timestamp * 1000).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
