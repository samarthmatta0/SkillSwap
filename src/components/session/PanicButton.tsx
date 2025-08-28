import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ShieldAlert } from 'lucide-react';

interface PanicButtonProps {
  onNavigate: (page: string) => void;
}

export const PanicButton: React.FC<PanicButtonProps> = ({ onNavigate }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowConfirm(true)}
        className="bg-red-600 hover:bg-red-700"
      >
        <ShieldAlert className="w-4 h-4 mr-1" />
        Emergency
      </Button>
      
      {showConfirm && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border-2 border-red-200 p-4 z-50">
          <div className="text-sm space-y-3">
            <div className="font-medium text-red-800">End Session Immediately?</div>
            <div className="text-muted-foreground text-xs">
              This will immediately end the session and report it for review. Use only if you feel unsafe.
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  onNavigate('dashboard');
                }}
              >
                Yes, End Now
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};