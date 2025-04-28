import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

const STATUS_OPTIONS = [
  {
    id: "Active",
    name: "active",
  },
  {
    id: "inactive",
    name: "inactive",
  },
];

interface ChangeStatusProps {
  suggestion: string;
}

export default function ChangeStatus({ suggestion }: ChangeStatusProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            className="flex items-center gap-2 justify-center"
          >
            Change Status
            <ChevronDown className="w-4 h-auto" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {STATUS_OPTIONS.map((status) => (
            <DropdownMenuItem key={status.id}>
              <button className="capitalize">{status.name}</button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
