import Dashboard from "@/components/organisms/Dashboard";
import DashboardDetail from "@/components/organisms/DashboardDetail";
import { getQueryClient } from "@/lib/get-query-client";
import { getUserSession } from "@/lib/session";
import { projectQueries } from "@/services/queries/project.queries";
import { taskProjectQueries } from "@/services/queries/task.queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

const DashboardPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const session = await getUserSession();
  const user = JSON.parse(session!);

  const { id } = await params;

  const queryClient = getQueryClient();
  try {
    queryClient.prefetchQuery(projectQueries());
    queryClient.prefetchQuery(taskProjectQueries(id));
  } catch (error) {
    console.log("error", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardDetail user={user} projectId={id} />
    </HydrationBoundary>
  );
};

export default DashboardPage;
