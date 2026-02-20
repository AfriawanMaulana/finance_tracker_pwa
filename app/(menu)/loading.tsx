import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex w-full h-screen items-center justify-center z-99 bg-background fixed">
      <Loader2 size={60} className="text-primary animate-spin" />
    </div>
  );
}
