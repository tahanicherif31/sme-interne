"use client";
import * as React from "react";
import loader from "@/lib/loader";
import LoadingScreen from "@/components/ui/loading-screen";

export default function LoaderHost() {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = loader.subscribe(setIsLoading);
    return () => unsubscribe();
  }, []);

  return isLoading ? <LoadingScreen /> : null;
}
