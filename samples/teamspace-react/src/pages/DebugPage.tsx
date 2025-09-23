import React from 'react';
import TokenInfo from '../components/Debug/TokenInfo';
import {Bug} from 'lucide-react';

const DebugPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Bug className="h-8 w-8" />
            Debug Information
          </h1>
          <p className="text-gray-600">View session data and decoded tokens for debugging purposes.</p>
        </div>

        <TokenInfo isOpen={true} onClose={() => {}} isPage={true} />
      </div>
    </div>
  );
};

export default DebugPage;
