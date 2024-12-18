import { getQueryClient } from "@/lib/get-query-client";
import { projectQueries } from "@/services/queries/project.queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SidebarFetcher = ({ children }: Props) => {
  let queryClient;
  try {
    queryClient = getQueryClient();
    queryClient.prefetchQuery(projectQueries());
  } catch (error) {
    console.log("error", error);

    return (
      <div>
        <h1>Something went wrong</h1>
      </div>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default SidebarFetcher;
