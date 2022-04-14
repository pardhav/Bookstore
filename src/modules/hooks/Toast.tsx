import { toast, ToastOptions, useToast } from "@chakra-ui/react";
import React from "react";

export function useUnknownErrorToast(
  error: Error | unknown,
  props?: ToastOptions
) {
  React.useEffect(() => {
    toast({
      variant: "solid",
      position: "top",
      title: "Unknown Error Occurred!",
      status: "error",
      description: error as Error,
    });
  });
  const toast = useToast();
}
