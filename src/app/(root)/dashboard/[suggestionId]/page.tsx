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
import { cn } from "@/lib/utils";
import { BrowserProvider, Contract } from "ethers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuggestionPage() {
  const { suggestionId } = useParams();
  const [suggestion, setSuggestion] = useState<{
    isActive: boolean;
    isDeleted: boolean;
    isPrivate: boolean;
    feedbackCounts: number;
  } | null>(null);
  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const fetchSuggestionById = async () => {
    try {
      if (!window.ethereum || !suggestionId) return;

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getLinkInfo(suggestionId);
      console.log("Fetched Link Info:", info);

      setSuggestion({
        isActive: info[0],
        isDeleted: info[1],
        isPrivate: info[2],
        feedbackCounts: info[3],
      });
    } catch (err) {
      console.error("Error fetching link info:", err);
    }
  };

  useEffect(() => {
    fetchSuggestionById();
  }, []);

  console.log(suggestion);

  return (
    <div className="container mx-auto py-10">
      <div className="w-full px-4 mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Suggestion Name</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 my-4 px-4">
        <div className="flex items-center gap-4">
          <p className="text-2xl font-bold">{"Feedback Name"}</p>
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
        {/* <div className="flex items-center gap-2">
          <ChangePrivacy feedback={feedbacks[0]} />
          <ChangeStatus feedback={feedbacks[0]} />
          <MoreOptions feedbackId={feedbackId} />
        </div> */}
      </div>

      {/* Link Section */}
      {/* <div className="flex justify-start items-center gap-2 mb-5">
        <Link
          href={feedbacks[0]?.feedbackLink || "#"}
          target="_blank"
          className="text-blue-500 text-sm truncate max-w-[30ch] md:max-w-[120ch]"
        >
          {feedbacks[0]?.feedbackLink || "The link has been deactivated!"}
        </Link>
        <Button variant={"ghost"}>Copy</Button>
      </div> */}
    </div>
  );
}
