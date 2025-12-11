import * as React from "react";
import { catchError } from "@/lib/utils";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import api from "@/services";

export default async function MeServerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const [error, profile] = await catchError(
    queryClient.fetchQuery({
      queryKey: api.user.getProfile().key(),
      queryFn: api.user.getProfile().fn,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
