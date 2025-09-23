'use client';

import {SignInButton, SignUpButton} from '@asgardeo/react';
import {Button} from '../ui/button';

interface PublicActionsProps {
  className?: string;
  showMobileActions?: boolean;
}

export default function PublicActions({className = '', showMobileActions = false}: PublicActionsProps) {
  if (showMobileActions) {
    // Mobile menu actions
    return (
      <div className="pt-4 border-t border-gray-200 space-y-2">
        <div className="w-full">
          <SignInButton style={{width: '100%'}} />
        </div>
        <div className="w-full">
          <SignUpButton style={{width: '100%'}} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Desktop CTA */}
      <div className="hidden md:flex items-center space-x-4">
        <SignInButton />
        <SignUpButton />
      </div>
    </div>
  );
}
