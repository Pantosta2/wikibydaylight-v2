import React from "react";

interface AsyncContentProps<T> {
  isLoading: boolean;
  error: Error | string | null;
  data: T[] | null;
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  children: (data: T[]) => React.ReactNode;
}
export function AsyncContent<T>({
  isLoading,
  error,
  data,
  loadingMessage,
  errorMessage,
  emptyMessage,
  children,
}: AsyncContentProps<T>) {
  console.log("ESTADO DE ASYNCCONTENT:", {
    isLoading,
    hasError: !!error,
    dataLength: data?.length ?? "null",
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
        <p className="text-xl text-gray-300 mt-4">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-900/30 border border-red-700 p-6 rounded-lg mx-auto max-w-lg">
        <p className="text-2xl text-red-400 font-semibold">{errorMessage}</p>
        <p className="text-md text-red-500 mt-2">
          {typeof error === "string" ? error : error.message}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children(data)}</>;
}
