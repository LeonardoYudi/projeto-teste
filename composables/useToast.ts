import { useToast as T } from "@/components/ui/toast/use-toast";

import type { ToastProps } from "~/components/ui/toast";

export const useToast = (options: ToastProps): void => {
  const { toast } = T();
  toast(options);
};
