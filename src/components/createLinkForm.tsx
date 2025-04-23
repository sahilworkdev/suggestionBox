"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMetaMask } from "@/hooks/useMetaMask";
import { Check, Copy, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShineBorder } from "./magicui/shine-border";

export default function CreateLinkForm() {
  const [pending, setPending] = useState(false);
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const { account, isConnected } = useMetaMask();
  const [copied, setCopied] = useState(false);
  const [latestSuggestion, setLatestSuggestion] = useState<null | {
    topic: string;
    description: string;
    link: string;
    createdAt: string;
  }>(null);
const baseUrl = 'http://localhost:3000/receive'

  const generateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !account) {
      toast.info("Please connect your wallet first.");
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
    setPending(true);
    try {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
      const link = `${baseUrl}/${id}`;
      const newEntry = {
        id,
        topic: topic.trim(),
        description: desc.trim(),
        link,
        createdAt: new Date().toISOString(),
      };

      const key = `suggestions`;
      const existing = localStorage.getItem(key);
      const links = existing ? JSON.parse(existing) : [];

      links.push(newEntry);
      localStorage.setItem(key, JSON.stringify(links));

      setTopic("");
      setDesc("");
      toast.success("Suggestion link generated!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    const key = "suggestions";
    const existing = localStorage.getItem(key);
    if (existing) {
      try {
        const suggestions = JSON.parse(existing);
        if (Array.isArray(suggestions) && suggestions.length > 0) {
          setLatestSuggestion(suggestions[suggestions.length - 1]);
        }
      } catch (err) {
        console.error("Failed to parse suggestions:", err);
      }
    }
  }, []);

  const handleCopyLink = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      {!latestSuggestion && (
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
      )}
      {latestSuggestion && (
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
      )}
    </>
  );
}
