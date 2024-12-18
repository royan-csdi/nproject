import Dashboard from "@/components/organisms/Dashboard";
import { getUserSession } from "@/lib/session";
import React from "react";
import { notFound, redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { projectQueries } from "@/services/queries/project.queries";
import { getQueryClient } from "@/lib/get-query-client";

const DashboardPage = async () => {
  const session = await getUserSession();
  const user = JSON.parse(session!);
  const queryClient = getQueryClient();

  if (!user) {
    redirect("/login");
  }
  queryClient.prefetchQuery(projectQueries());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard user={user} />
    </HydrationBoundary>
  );
};

export default DashboardPage;
