import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

export function ToastProvider() {
  const { toasts } = useToast();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200";
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center p-4 rounded-lg shadow-lg border transition-all duration-300 ${getColorClasses(
            toast.variant || "default"
          )}`}
        >
          {getIcon(toast.variant || "default")}
          <div className="ml-3 flex-1">
            {toast.title && (
              <p className="text-sm font-medium">{toast.title}</p>
            )}
            {toast.description && (
              <p className="text-sm">{toast.description}</p>
            )}
          </div>
          {toast.action}
        </div>
      ))}
    </div>
  );
}
