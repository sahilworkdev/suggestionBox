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

import { Button } from "@/components/ui/button";
import ChangePrivacy from "@/components/dashboard/changePrivacy";
import ChangeStatus from "@/components/dashboard/changeStatus";
import { Check, Copy } from "lucide-react";
import MoreOptions from "@/components/dashboard/moreOptions";
import { Skeleton } from "@/components/ui/skeleton";
import FeedbackList from "@/components/dashboard/feedbackList";
import CopyButton from "@/components/buttons/copyButton";
import { toast } from "sonner";

export default function SuggestionPage() {
  const { suggestionId } = useParams();
  const [suggestion, setSuggestion] = useState<{
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
    { content: string; author: string; timestamp: string }[]
  >([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // const handleCopyLink = async (text: string) => {
  //   await navigator.clipboard.writeText(text);
  //   setCopied(true);
  //   setTimeout(() => {
  //     setCopied(false);
  //   }, 2000);
  // };

  const fetchSuggestionById = async () => {
    try {
      if (!window.ethereum || !suggestionId) return;

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getFullLinkInfo(suggestionId);

      const encryptedTopicHex = info[1];
      const encryptedDescHex = info[2];

      const decryptedTopic = decryptFromBytes(secretKey, encryptedTopicHex);
      const decryptedDesc = decryptFromBytes(secretKey, encryptedDescHex);

      setSuggestion({
        topic: decryptedTopic,
        description: decryptedDesc,
        isActive: info[3],
        isPrivate: info[4],
        feedbackCount: Number(info[5]),
      });
    } catch (err) {
      if (err instanceof Error) toast.error("Error fetching suggestion info.");
    }
  };

  const fetchFeedbacks = async () => {
    setLoadingFeedbacks(true);
    try {
      if (!window.ethereum || !suggestionId) return;

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getLinkFeedbacks(suggestionId);

      const encryptedContents = info[0];
      const feedbackSenders = info[1];
      const timestamps = info[2];

      const feedbacks = encryptedContents.map(
        (encryptedContent: string, index: number) => {
          const decryptedContent = decryptFromBytes(
            secretKey,
            encryptedContent
          );
          return {
            content: decryptedContent,
            author: feedbackSenders[index],
            timestamp: new Date(
              Number(timestamps[index]) * 1000
            ).toLocaleString(),
          };
        }
      );

      setFeedbacks(feedbacks);
    } catch (err) {
      if (err instanceof Error) toast.error("Error fetching suggestions.");
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  useEffect(() => {
    fetchSuggestionById();
    fetchFeedbacks();
  }, []);

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
              <BreadcrumbPage>{suggestion?.topic || "..."}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 my-4 px-4">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">
            {suggestion?.topic || <Skeleton className="h-6 w-40" />}
          </span>
          {suggestion && (
            <>
              <Badge
                className={cn(
                  "capitalize",
                  suggestion.isActive ? "bg-yellow-500" : "bg-gray-500"
                )}
              >
                {suggestion.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge
                className={cn(
                  "capitalize",
                  suggestion.isPrivate ? "bg-red-500" : "bg-green-500"
                )}
              >
                {suggestion.isPrivate ? "Private" : "Public"}
              </Badge>
            </>
          )}
        </div>

        {suggestion && (
          <div className="flex items-center gap-2">
            <ChangePrivacy suggestion={String(suggestionId)} />
            <ChangeStatus suggestion={String(suggestionId)} />
            <MoreOptions suggestion={String(suggestionId)} />
          </div>
        )}
      </div>

      <div className="text-sm text-wrap w-full px-4">
        {suggestion?.description || <Skeleton className="h-16 w-full" />}
      </div>

      {/* Link Section */}
      {suggestion && (
        <div className="flex justify-start items-center gap-2 my-5 px-4">
          <Link
            href={`${baseUrl}${suggestionId}` || "#"}
            target="_blank"
            className="text-blue-500 text-sm truncate max-w-[30ch] md:max-w-[120ch]"
          >
            {suggestion.isActive
              ? `${baseUrl}receive/${suggestionId}`
              : "The link has been deactivated!"}
          </Link>
          <CopyButton textToCopy={`${baseUrl}receive/${suggestionId}`}/>
        </div>
      )}

      <FeedbackList feedbacks={feedbacks} loading={loadingFeedbacks} />
    </div>
  );
}
