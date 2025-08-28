import React from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader2, ArrowLeft, User } from 'lucide-react';

const IconTest: React.FC = () => {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Icon Test</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-blue-500" />
          <span>Mail Icon</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-gray-500" />
          <span>Lock Icon</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-green-500" />
          <span>Eye Icon</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <EyeOff className="w-5 h-5 text-red-500" />
          <span>EyeOff Icon</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-500" />
          <span>AlertCircle Icon</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>CheckCircle Icon</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
          <span>Loader2 Icon</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5 text-indigo-500" />
          <span>ArrowLeft Icon</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-orange-500" />
          <span>User Icon</span>
        </div>
      </div>
      
      <div className="mt-8 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Input with Icons (like in AuthPages)</h3>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="email" 
            placeholder="Email with icon"
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default IconTest;