import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ReceiveSuggestionPage() {
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
              "bg-green-500"
              //   result[0].privacy === "public" ? "bg-green-500" : "bg-red-500"
            )}
          >
            {/* {result[0].privacy} */} Public Feedback
          </Badge>
          <div>
            {/* {result[0].privacy === "public" && (
              <p>
                {" "}
                <Link
                //   href={`/receive/${suggestionId}/all-feedbacks`}
                  href={`/receive/#`}
                  className="underline"
                >
                  Click here
                </Link>{" "}
                to see others&apos; feedbacks
              </p>
            )}
            {result[0].privacy === "private" && (
              <p>Only Admin can see the feedbacks</p>
            )} */}
          </div>
        </div>
        <Input
          placeholder="Enter subject..."
          name="feedbackId"
          id="feedbackId"
          required
          type="hidden"
          //   value={su}
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
