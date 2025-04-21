import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning" | "delete";

interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const getToastStyle = (type: ToastType) => {
  switch (type) {
    case "success":
      return {
        background: "linear-gradient(to right, #ffffff, #96c93d)",
        icon: "🚀",
      };
    case "error":
      return {
        background: "linear-gradient(to right, #ffffff, #FF3737)",
        icon: "🚫",
      };
    case "warning":
      return {
        background: "linear-gradient(to right, #ffffff, #FFA500)",
        icon: "⚠️",
      };
    case "info":
    default:
      return {
        background: "linear-gradient(to right, #ffffff, #3B82F6)",
        icon: "ℹ️",
      };
    case "delete":
      return {
        background: "linear-gradient(to right, #ffffff, #FF0000)",
        icon: "🗑️",
      };
  }
};

export const showToast = ({
  title,
  description,
  type = "info",
  action,
}: ToastOptions) => {
  const style = getToastStyle(type);

  toast(title, {
    duration: 3000,
    description: description,
    position: "top-right",
    icon: style.icon,
    style: {
      background: style.background,
    },
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
  });
};

// Funciones de conveniencia para diferentes tipos de toasts
export const showSuccessToast = (
  title: string,
  action?: ToastOptions["action"]
) => {
  showToast({ title, type: "success", action });
};

export const showErrorToast = (
  title: string,
  action?: ToastOptions["action"]
) => {
  showToast({ title, type: "error", action });
};

export const showWarningToast = (
  title: string,
  action?: ToastOptions["action"]
) => {
  showToast({ title, type: "warning", action });
};

export const showInfoToast = (
  title: string,
  action?: ToastOptions["action"]
) => {
  showToast({ title, type: "info", action });
};

export const showDeleteToast = (
  title: string,
  action?: ToastOptions["action"]
) => {
  showToast({ title, type: "delete", action });
};
