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

export default function SuggestionPage() {
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
              "capitalize", "bg-yellow-500"
            //   feedbacks[0]?.status === "active"
            //     ? "bg-yellow-500"
            //     : "bg-gray-500"
            )}
          >
            {/* {feedbacks[0]?.status} */}
            Active
          </Badge>
          <Badge
            className={cn(
              "capitalize", "bg-red-500"
            //   feedbacks[0]?.privacy === "public" ? "bg-green-500" : "bg-red-500" 
            )}
          >
            {/* {feedbacks[0]?.privacy} */}
            Public
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
