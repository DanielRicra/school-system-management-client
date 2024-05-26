import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SWRConfig } from "swr";

import { Sidebar } from "./_admin/-components/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <SWRConfig
      value={{
        onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
          const { status } = error;
          if (status === 404 || status === 400 || status === 403) return;

          if (retryCount >= 3) return;

          setTimeout(() => revalidate({ retryCount }), 3000);
        },
        revalidateOnFocus: false,
      }}
    >
      <div className="flex h-dvh justify-start items-start w-dvw overflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
      <Toaster position="bottom-center" richColors />
    </SWRConfig>
  );
}
