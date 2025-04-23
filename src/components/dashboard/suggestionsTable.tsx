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
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

type Suggestion = {
  id: string;
  createdAt: string;
  topic: string;
  status: string;
};
export default function SuggestionsTable() {
  // const suggestions = JSON.parse(localStorage.getItem("suggestions") || "[]");
  // console.log(">>>>", suggestions);


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
              {/* <TableHead className="p-2 md:p-4 text-center">Privacy</TableHead> */}
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
                    href={`/dashboard/chats/${suggestion?.id}`}
                    className="block p-2 md:p-4 capitalize"
                  >
                    {suggestion?.topic}
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-center">
                  {/* <Link
            href={`/dashboard/chats/${feedback?.id}`}
            className="block p-2 md:p-4"
          >
            {feedback?.messages?.length}
          </Link> */}{" "}
                  40
                </TableCell>
                <TableCell className="text-center p-0">
                  <Link href={`/dashboard/#`} className="block p-2 md:p-4">
                    <Badge
                    //   className={cn(
                    //     "capitalize",
                    //     feedback?.status === "active"
                    //       ? "bg-yellow-500"
                    //       : "bg-gray-500"
                    //   )}
                    >
                      {/* {feedback?.status} */} Active
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
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
