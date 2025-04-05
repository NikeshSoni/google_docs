"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

const ErrorPage = (
  { error, reset }: {
    error: Error & { digest?: string };
    reset: () => void;
  }
) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-rose-100 p-4 rounded-full shadow animate-pulse">
            <AlertTriangleIcon className="size-10 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Something went wrong</h2>
          <p className="text-sm text-gray-600">{error.message}</p>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={reset}
            variant="outline"
            className="font-medium hover:bg-gray-100"
          >
            Try Again
          </Button>
          <Button
            asChild
            variant="default"
            className="font-medium"
          >
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
