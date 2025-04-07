import { cn } from "@/lib/utils";

type Props = {
  required: boolean;
  className?: string;
};

export const Required = ({ required, className }: Props) => {
  if (!required) return null;
  return (
    <span className={cn("text-red-500", className)}>
      <span aria-hidden="true">*</span>
      <span className="sr-only">(required)</span>
    </span>
  );
};
