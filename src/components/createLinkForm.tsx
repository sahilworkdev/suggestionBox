"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Check, Copy, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShineBorder } from "./magicui/shine-border";
import { ethers } from "ethers";
import { BrowserProvider, Contract } from "ethers";
import { contractABI } from "@/abi";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function CreateLinkForm() {
  const [pending, setPending] = useState(false);
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [privacy, setPrivacy] = useState("private");

  const [copied, setCopied] = useState(false);

  const baseUrl = "http://localhost:3000/receive";

  const handleCopyLink = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  // const contractABI = String(process.env.NEXT_PUBLIC_CONTRACT_ABI);

  const generateLink = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not detected!");
      return;
    }

    if (!topic || topic.trim().length < 4) {
      toast.info("Topic must be at least 4 characters long.");
      return;
    }

    if (!desc || desc.trim().length < 12) {
      toast.info("Description must be at least 12 characters long.");
      return;
    }

    try {
      setPending(true);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const rawId = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;
      const fullLink = `${baseUrl}/${rawId}`;
      const linkIdBytes32 = ethers.keccak256(ethers.toUtf8Bytes(rawId));

      const isPrivate = privacy === "private";

      const tx = await contract.createLink(linkIdBytes32, isPrivate);
      await tx.wait();

      toast.success("Suggestion Link created successfully!");
      setTopic("");
      setDesc("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <form className="flex flex-col justify-start items-start gap-4 sm:gap-6 w-full max-w-xl mx-auto">
        <div className="flex flex-col items-start gap-2 w-full">
          <Label htmlFor="topic" className="text-lg font-medium">
            Topic
          </Label>
          <Input
            placeholder="Enter topic..."
            name="topic"
            id="topic"
            className="flex-1 w-full px-4 py-2"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <Label htmlFor="desc" className="text-lg font-medium">
            Description
          </Label>
          <Textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder="Enter description..."
            name="desc"
            id="desc"
            className="flex-1 w-full px-4 py-2"
          />
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <Label htmlFor="privacy" className="text-lg font-medium">
            Choose who can see the suggestions
          </Label>
          <RadioGroup
            id="privacy"
            name="privacy"
            defaultValue="private"
            value={privacy}
            onValueChange={setPrivacy}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="r1" />
              <Label htmlFor="r1">Only Me</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="r2" />
              <Label htmlFor="r2">Anyone with the suggestion link</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="w-full">
          <Button
            className={"relative w-full font-semibold"}
            onClick={generateLink}
            type="button"
          >
            <span className={pending ? "text-transparent" : ""}>
              Generate Link
            </span>
            {pending && (
              <span className="flex justify-center items-center absolute w-full h-full text-slate-400">
                <LoaderCircle className="animate-spin" />
              </span>
            )}
          </Button>
        </div>
      </form>

      {/* {latestSuggestion && (
        <div className="w-full flex flex-col gap-4 max-w-xl mx-auto items-center">
          <div className="relative mt-8 p-4 border rounded bg-transparent  w-full max-w-xl mx-auto space-y-2">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            <h3 className="text-xl font-semibold text-center mb-4">
              Share the below link to start recieving suggestions
            </h3>
            <div className="w-full flex flex-col justify-center items-center gap-1 mb-2">
              <p className="font-semibold text-lg text-[#FFBE7B]">
                {latestSuggestion.topic}
              </p>
              <p className="text-sm font-light">
                {latestSuggestion.description}
              </p>
            </div>

            <div className="w-full flex justify-center items-center gap-1">
              <div className="p-[9px] bg-zinc-800 rounded">
                {latestSuggestion.link}
              </div>
              <div
                className="border border-zinc-800 text-zinc-600 p-2 rounded"
                onClick={() => handleCopyLink(latestSuggestion.link)}
              >
                {copied ? <Check /> : <Copy />}
              </div>
            </div>
          </div>
          <Button className="w-[120px] cursor-pointer"   onClick={() => setLatestSuggestion(null)} >Create New</Button>
        </div>
      )} */}
    </>
  );
}
