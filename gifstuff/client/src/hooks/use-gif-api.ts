import { useMutation } from "@tanstack/react-query";
import { gifApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function useGifGeneration() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ endpoint, imageUrl }: { endpoint: string; imageUrl: string }) =>
      gifApi.generateGif(endpoint, imageUrl),
    onSuccess: (data, variables) => {
      if (data.success) {
        toast({
          title: "Success!",
          description: `${variables.endpoint.charAt(0).toUpperCase() + variables.endpoint.slice(1)} GIF generated successfully!`,
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to generate GIF",
          variant: "error",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "error",
      });
    },
  });
}

export function useQRGeneration() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (url: string) => gifApi.generateQR(url),
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Success!",
          description: "QR code generated successfully!",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to generate QR code",
          variant: "error",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "error",
      });
    },
  });
}

export function useIPCheck() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => gifApi.checkIP(),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "IP address retrieved successfully!",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to retrieve IP address",
        variant: "error",
      });
    },
  });
}
