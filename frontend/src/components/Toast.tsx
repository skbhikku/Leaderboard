import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, Zap } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-400 to-emerald-400 text-white border-green-400';
      case 'error':
        return 'bg-gradient-to-r from-red-400 to-pink-400 text-white border-red-400';
      case 'info':
        return 'bg-gradient-to-r from-blue-400 to-purple-400 text-white border-blue-400';
      default:
        return 'bg-gray-200 text-gray-800 border-gray-300';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 animate-bounce" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 animate-pulse" />;
      case 'info':
        return <Info className="w-6 h-6 animate-pulse" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <div
      className={`p-4 rounded-2xl shadow-lg max-w-sm w-full border animate-slide-in-right ${getToastStyles()}`}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="font-bold text-sm">{message}</p>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-3 h-1 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white/60 animate-progress-bar"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

export default Toast;
