import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children, size = "md" }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="min-h-screen px-4 text-center">
        <span
          className="inline-block h-screen align-middle bg-black"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`
            inline-block w-full ${sizeClasses[size]} p-6 my-8 text-left align-middle
            bg-black/75
            backdrop-blur-xl rounded-2xl border border-white/50
            shadow-xl transform transition-all`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white
                     transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
