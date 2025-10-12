import { cn } from "@/lib/utils";
import { AirVent } from "lucide-react";

type LogoProps = {
  className?: string;
  isCollapsed?: boolean;
};

export function Logo({ className, isCollapsed = false }: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        isCollapsed ? "justify-center" : "",
        className
      )}
    >
      <div className="bg-primary p-2 rounded-lg">
        <AirVent className="h-5 w-5 text-primary-foreground" />
      </div>
      {!isCollapsed && (
        <span className="font-headline text-lg font-bold">
          Close Kit
        </span>
      )}
    </div>
  );
}
