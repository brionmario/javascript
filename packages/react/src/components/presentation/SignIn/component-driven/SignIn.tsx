/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {FC, useState, useEffect, useRef} from 'react';
import BaseSignIn, {BaseSignInProps} from './BaseSignIn';
import useAsgardeo from '../../../../contexts/Asgardeo/useAsgardeo';
import {
  AsgardeoRuntimeError,
  EmbeddedFlowComponent,
  EmbeddedFlowType,
  EmbeddedSignInFlowResponseV2,
  EmbeddedSignInFlowRequestV2,
  EmbeddedSignInFlowStatusV2,
} from '@asgardeo/browser';
import {normalizeFlowResponse} from './transformer';
import useTranslation from '../../../../hooks/useTranslation';

/**
 * Props for the SignIn component.
 * Matches the interface from the main SignIn component for consistency.
 */
export type SignInProps = {
  /**
   * Custom CSS class name for the form container.
   */
  className?: string;

  /**
   * Callback function called when authentication is successful.
   * @param authData - The authentication data returned upon successful completion.
   */
  onSuccess?: (authData: Record<string, any>) => void;

  /**
   * Callback function called when authentication fails.
   * @param error - The error that occurred during authentication.
   */
  onError?: (error: Error) => void;

  /**
   * Theme variant for the component.
   */
  variant?: BaseSignInProps['variant'];

  /**
   * Size variant for the component.
   */
  size?: 'small' | 'medium' | 'large';
};

/**
 * A component-driven SignIn component that provides authentication flow with pre-built styling.
 * This component handles the flow API calls for authentication and delegates UI logic to BaseSignIn.
 * It automatically transforms simple input-based responses into component-driven UI format.
 *
 * @example
 * ```tsx
 * import { SignIn } from '@asgardeo/react/component-driven';
 *
 * const App = () => {
 *   return (
 *     <SignIn
 *       onSuccess={(authData) => {
 *         console.log('Authentication successful:', authData);
 *         // Handle successful authentication (e.g., redirect, store tokens)
 *       }}
 *       onError={(error) => {
 *         console.error('Authentication failed:', error);
 *       }}
 *       size="medium"
 *       variant="outlined"
 *     />
 *   );
 * };
 * ```
 */
const SignIn: FC<SignInProps> = ({className, size = 'medium', onSuccess, onError, variant}) => {
  const {applicationId, afterSignInUrl, signIn, isInitialized, isLoading, baseUrl} = useAsgardeo();
  const {t} = useTranslation();

  // State management for the flow
  const [components, setComponents] = useState<EmbeddedFlowComponent[]>([]);
  const [currentFlowId, setCurrentFlowId] = useState<string | null>(null);
  const [isFlowInitialized, setIsFlowInitialized] = useState(false);
  const initializationAttemptedRef = useRef(false);

  // Initialize the flow on component mount
  useEffect(() => {
    if (isInitialized && !isLoading && !isFlowInitialized && !initializationAttemptedRef.current) {
      initializationAttemptedRef.current = true;

      initializeFlow();
    }
  }, [isInitialized, isLoading, isFlowInitialized]);

  /**
   * Initialize the authentication flow.
   */
  const initializeFlow = async (): Promise<void> => {
    if (!applicationId) {
      throw new AsgardeoRuntimeError(
        `Application ID is required for authentication`,
        'SignIn-initializeFlow-RuntimeError-001',
        'react',
        'Something went wrong while trying to sign in. Please try again later.',
      );
    }

    try {
      const response: EmbeddedSignInFlowResponseV2 = await signIn({
        applicationId,
        flowType: EmbeddedFlowType.Authentication,
      });

      const {flowId, components} = normalizeFlowResponse(response, t);

      if (flowId && components) {
        setCurrentFlowId(flowId);
        setComponents(components);
        setIsFlowInitialized(true);
      }
    } catch (error) {
      onError?.(error as Error);

      throw new AsgardeoRuntimeError(
        `Failed to initialize authentication flow: ${error instanceof Error ? error.message : String(error)}`,
        'SignIn-initializeFlow-RuntimeError-002',
        'react',
        'Something went wrong while trying to sign in. Please try again later.',
      );
    }
  };

  /**
   * Handle form submission from BaseSignIn.
   */
  const handleSubmit = async (payload: EmbeddedSignInFlowRequestV2): Promise<void> => {
    if (!currentFlowId) {
      throw new Error('No active flow ID');
    }

    try {
      const response = await signIn({
        flowId: currentFlowId,
        ...payload,
      });

      const {flowId, components} = normalizeFlowResponse(response, t);

      if (response.flowStatus === EmbeddedSignInFlowStatusV2.Complete) {
        onSuccess &&
          onSuccess({
            redirectUrl: response.redirectUrl || afterSignInUrl,
            ...response.data,
          });

        window.location.href = response.redirectUrl || afterSignInUrl;

        return;
      }

      if (flowId && components) {
        setCurrentFlowId(flowId);
        setComponents(components);
      }
    } catch (error) {
      onError?.(error as Error);

      throw new AsgardeoRuntimeError(
        `Failed to submit authentication flow: ${error instanceof Error ? error.message : String(error)}`,
        'SignIn-handleSubmit-RuntimeError-001',
        'react',
        'Something went wrong while trying to sign in. Please try again later.',
      );
    }
  };

  /**
   * Handle authentication errors.
   */
  const handleError = (error: Error): void => {
    console.error('Authentication error:', error);
    onError?.(error);
  };

  return (
    <BaseSignIn
      components={components}
      isLoading={isLoading || !isInitialized || !isFlowInitialized}
      onSubmit={handleSubmit}
      onError={handleError}
      className={className}
      size={size}
      variant={variant}
    />
  );
};

export default SignIn;
