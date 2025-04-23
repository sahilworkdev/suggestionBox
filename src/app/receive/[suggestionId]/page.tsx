"use client";
import { contractABI } from "@/abi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BrowserProvider, Contract } from "ethers";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReceiveSuggestionPage() {
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
      <form className="max-w-2xl mx-auto flex w-full flex-col gap-4">
        <div className="text-xl font-semibold mt-6 sm:mt-8">
          Send your feedback for :{" "}
          <span className="text-brand font-bold italic">
            {"Suggestion Name"}
          </span>
        </div>
        <div className="flex sm:items-center gap-2 flex-col sm:flex-row items-start">
          <Badge
            className={cn(
              "capitalize",
              suggestion?.isPrivate ? "bg-red-500" : "bg-green-500"
            )}
          >
            {suggestion?.isPrivate ? "Private" : "Public"}
          </Badge>
          <div>
            {!suggestion?.isPrivate && (
              <p>
                <Link
                  //   href={`/receive/${suggestionId}/all-feedbacks`}
                  href={`/receive/#`}
                  className="underline"
                >
                  Click here
                </Link>{" "}
                to see others&apos; suggestions
              </p>
            )}
            {suggestion?.isPrivate && <p>Only Admin can see the suggestions</p>}
          </div>
        </div>
        <Input
          placeholder="Enter subject..."
          name="feedbackId"
          id="feedbackId"
          required
          type="hidden"
          value={suggestionId}
        />
        <Textarea
          placeholder="Enter suggestion..."
          name="feedback"
          id="feedback"
          required
          rows={5}
        />
        <Button className="w-full px-4 py-2">Submit Suggestion</Button>
      </form>

      <div className="max-w-2xl mx-auto  text-sm md:text-xl font-semibold mt-8">
        NOTE : Your suggestion is completely anonymous and helps make things
        better. Be honest, be constructive, and share your thoughts freely.
      </div>
    </div>
  );
}
