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

import {FC, useState, useEffect, useRef, ReactNode} from 'react';
import BaseSignIn, {BaseSignInProps} from './BaseSignIn';
import useAsgardeo from '../../../../contexts/Asgardeo/useAsgardeo';
import {
  AsgardeoRuntimeError,
  EmbeddedFlowComponent,
  EmbeddedFlowType,
  EmbeddedSignInFlowResponseV2,
  EmbeddedSignInFlowRequestV2,
  EmbeddedSignInFlowStatusV2,
  EmbeddedSignInFlowTypeV2,
} from '@asgardeo/browser';
import {normalizeFlowResponse} from './transformer';
import useTranslation from '../../../../hooks/useTranslation';

/**
 * Render props function parameters
 */
export interface SignInRenderProps {
  /**
   * Function to manually initialize the flow
   */
  initialize: () => Promise<void>;

  /**
   * Function to submit authentication data (primary)
   */
  onSubmit: (payload: EmbeddedSignInFlowRequestV2) => Promise<void>;

  /**
   * Loading state indicator
   */
  isLoading: boolean;

  /**
   * Whether the flow has been initialized
   */
  isInitialized: boolean;

  /**
   * Current flow components
   */
  components: EmbeddedFlowComponent[];

  /**
   * Current error if any
   */
  error: Error | null;
}

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

  /**
   * Render props function for custom UI
   */
  children?: (props: SignInRenderProps) => ReactNode;
};

/**
 * A component-driven SignIn component that provides authentication flow with pre-built styling.
 * This component handles the flow API calls for authentication and delegates UI logic to BaseSignIn.
 * It automatically transforms simple input-based responses into component-driven UI format.
 *
 * @example
 * // Default UI
 * ```tsx
 * import { SignIn } from '@asgardeo/react/component-driven';
 *
 * const App = () => {
 *   return (
 *     <SignIn
 *       onSuccess={(authData) => {
 *         console.log('Authentication successful:', authData);
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
 *
 * @example
 * // Custom UI with render props
 * ```tsx
 * import { SignIn } from '@asgardeo/react/component-driven';
 *
 * const App = () => {
 *   return (
 *     <SignIn
 *       onSuccess={(authData) => console.log('Success:', authData)}
 *       onError={(error) => console.error('Error:', error)}
 *     >
 *       {({signIn, isLoading, components, error, isInitialized}) => (
 *         <div className="custom-signin">
 *           <h1>Custom Sign In</h1>
 *           {!isInitialized ? (
 *             <p>Initializing...</p>
 *           ) : error ? (
 *             <div className="error">{error.message}</div>
 *           ) : (
 *             <form onSubmit={(e) => {
 *               e.preventDefault();
 *               signIn({inputs: {username: 'user', password: 'pass'}});
 *             }}>
 *               <button type="submit" disabled={isLoading}>
 *                 {isLoading ? 'Signing in...' : 'Sign In'}
 *               </button>
 *             </form>
 *           )}
 *         </div>
 *       )}
 *     </SignIn>
 *   );
 * };
 * ```
 */
const SignIn: FC<SignInProps> = ({className, size = 'medium', onSuccess, onError, variant, children}) => {
  const {applicationId, afterSignInUrl, signIn, isInitialized, isLoading} = useAsgardeo();
  const {t} = useTranslation();

  // State management for the flow
  const [components, setComponents] = useState<EmbeddedFlowComponent[]>([]);
  const [currentFlowId, setCurrentFlowId] = useState<string | null>(null);
  const [isFlowInitialized, setIsFlowInitialized] = useState(false);
  const [flowError, setFlowError] = useState<Error | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initializationAttemptedRef = useRef(false);
  const oauthCodeProcessedRef = useRef(false);

  /**
   * Handle REDIRECTION response by storing flow state and redirecting to OAuth provider.
   */
  const handleRedirection = (response: EmbeddedSignInFlowResponseV2): boolean => {
    if (response.type === EmbeddedSignInFlowTypeV2.Redirection) {
      const redirectURL = (response.data as any)?.redirectURL || (response as any)?.redirectURL;

      if (redirectURL) {
        if (response.flowId) {
          sessionStorage.setItem('asgardeo_flow_id', response.flowId);
        }

        const urlParams = new URL(window.location.href).searchParams;
        const sessionDataKeyFromUrl = urlParams.get('sessionDataKey');
        if (sessionDataKeyFromUrl) {
          sessionStorage.setItem('asgardeo_session_data_key', sessionDataKeyFromUrl);
        }

        window.location.href = redirectURL;
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const storedFlowId = sessionStorage.getItem('asgardeo_flow_id');

    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const sessionDataKeyFromUrl = urlParams.get('sessionDataKey');
    if (sessionDataKeyFromUrl) {
      sessionStorage.setItem('asgardeo_session_data_key', sessionDataKeyFromUrl);
    }

    if (code) {
      const flowIdFromUrl = urlParams.get('flowId');
      const flowIdFromState = state || flowIdFromUrl || storedFlowId;

      if (flowIdFromState) {
        setCurrentFlowId(flowIdFromState);
        setIsFlowInitialized(true);
        sessionStorage.setItem('asgardeo_flow_id', flowIdFromState);
        initializationAttemptedRef.current = true;
      }
      return;
    }

    if (
      isInitialized &&
      !isLoading &&
      !isFlowInitialized &&
      !initializationAttemptedRef.current &&
      !currentFlowId
    ) {
      initializationAttemptedRef.current = true;
      initializeFlow();
    }
  }, [isInitialized, isLoading, isFlowInitialized, currentFlowId]);

  /**
   * Initialize the authentication flow.
   * Priority: flowId > applicationId (from context) > applicationId (from URL)
   */
  const initializeFlow = async (): Promise<void> => {
    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get('code');

    if (code) {
      return;
    }


    const flowIdFromUrl: string = urlParams.get('flowId');
    const applicationIdFromUrl: string = urlParams.get('applicationId');
    const sessionDataKeyFromUrl: string = urlParams.get('sessionDataKey');

    // Preserve sessionDataKey in sessionStorage for OAuth callback
    if (sessionDataKeyFromUrl) {
      sessionStorage.setItem('asgardeo_session_data_key', sessionDataKeyFromUrl);
    }

    const effectiveApplicationId = applicationId || applicationIdFromUrl;

    if (!flowIdFromUrl && !effectiveApplicationId) {
      const error = new AsgardeoRuntimeError(
        'Either flowId or applicationId is required for authentication',
        'SignIn-initializeFlow-RuntimeError-001',
        'react',
        'Something went wrong while trying to sign in. Please try again later.',
      );
      setFlowError(error);
      throw error;
    }

    try {
      setFlowError(null);

      let response: EmbeddedSignInFlowResponseV2;

      if (flowIdFromUrl) {
        response = await signIn({
          flowId: flowIdFromUrl,
        }) as EmbeddedSignInFlowResponseV2;
      } else {
        response = await signIn({
          applicationId: effectiveApplicationId,
          flowType: EmbeddedFlowType.Authentication,
        }) as EmbeddedSignInFlowResponseV2;
      }

      if (handleRedirection(response)) {
        return;
      }

      const { flowId, components } = normalizeFlowResponse(response, t);

      if (flowId && components) {
        setCurrentFlowId(flowId);
        setComponents(components);
        setIsFlowInitialized(true);
      }
    } catch (error) {
      const err = error as Error;
      setFlowError(err);
      onError?.(err);

      throw new AsgardeoRuntimeError(
        `Failed to initialize authentication flow: ${error instanceof Error ? error.message : String(error)}`,
        'SignIn-initializeFlow-RuntimeError-002',
        'react',
        'Something went wrong while trying to sign in. Please try again later.',
      );
    }
  };

  /**
   * Handle form submission from BaseSignIn or render props.
   */
  const handleSubmit = async (payload: EmbeddedSignInFlowRequestV2): Promise<void> => {
    // Use flowId from payload if available, otherwise fall back to currentFlowId
    const effectiveFlowId = payload.flowId || currentFlowId;

    if (!effectiveFlowId) {
      console.error('[SignIn] handleSubmit - ERROR: No flowId available', {
        payloadFlowId: payload.flowId,
        currentFlowId,
      });
      throw new Error('No active flow ID');
    }


    try {
      setIsSubmitting(true);
      setFlowError(null);

      // Use effectiveFlowId - either from payload or currentFlowId
      const response: EmbeddedSignInFlowResponseV2 = await signIn({
        flowId: effectiveFlowId,
        ...payload,
      }) as EmbeddedSignInFlowResponseV2;

      if (handleRedirection(response)) {
        return;
      }

      const { flowId, components } = normalizeFlowResponse(response, t);

      if (response.flowStatus === EmbeddedSignInFlowStatusV2.Complete) {
        // Get redirectUrl from response (comes from /oauth2/authorize) or fall back to afterSignInUrl
        const redirectUrl = (response as any).redirectUrl || (response as any).redirect_uri;

        // Clear all OAuth-related storage on successful completion
        sessionStorage.removeItem('asgardeo_flow_id');
        if (redirectUrl) {
          sessionStorage.removeItem('asgardeo_session_data_key');
        }

        const url = new URL(window.location.href);
        url.searchParams.delete('code');
        url.searchParams.delete('state');
        url.searchParams.delete('nonce');
        window.history.replaceState({}, '', url.toString());

        const finalRedirectUrl = redirectUrl || afterSignInUrl;

        onSuccess &&
          onSuccess({
            redirectUrl: finalRedirectUrl,
            ...response.data,
          });

        if (finalRedirectUrl) {
          window.location.href = finalRedirectUrl;
        }

        return;
      }

      if (flowId && components) {
        setCurrentFlowId(flowId);
        setComponents(components);
      }

      if (!currentFlowId && effectiveFlowId) {
        setCurrentFlowId(effectiveFlowId);
      }
    } catch (error) {
      const err = error as Error;
      setFlowError(err);
      onError?.(err);

      throw new AsgardeoRuntimeError(
        `Failed to submit authentication flow: ${error instanceof Error ? error.message : String(error)}`,
        'SignIn-handleSubmit-RuntimeError-001',
        'react',
        'Something went wrong while trying to sign in. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle authentication errors.
   */
  const handleError = (error: Error): void => {
    console.error('Authentication error:', error);
    setFlowError(error);
    onError?.(error);
  };

  useEffect(() => {
    const urlParams = new URL(window.location.href).searchParams;
    const code = urlParams.get('code');
    const nonce = urlParams.get('nonce');
    const state = urlParams.get('state');
    const flowIdFromUrl = urlParams.get('flowId');
    const storedFlowId = sessionStorage.getItem('asgardeo_flow_id');

    if (!code || oauthCodeProcessedRef.current || isSubmitting) {
      return;
    }

    const flowIdToUse = currentFlowId || state || flowIdFromUrl || storedFlowId;

    if (!flowIdToUse || !signIn) {
      return;
    }

    oauthCodeProcessedRef.current = true;

    if (!currentFlowId) {
      setCurrentFlowId(flowIdToUse);
      setIsFlowInitialized(true);
    }
    const submitPayload: EmbeddedSignInFlowRequestV2 = {
      flowId: flowIdToUse,
      inputs: {
        code,
        ...(nonce && { nonce }),
      },
    };

    handleSubmit(submitPayload).catch(() => {
      oauthCodeProcessedRef.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlowInitialized, currentFlowId, isInitialized, isLoading, isSubmitting, signIn]);

  if (children) {
    const renderProps: SignInRenderProps = {
      initialize: initializeFlow,
      onSubmit: handleSubmit,
      isLoading: isLoading || isSubmitting || !isInitialized,
      isInitialized: isFlowInitialized,
      components,
      error: flowError,
    };

    return <>{children(renderProps)}</>;
  }
  // Otherwise, render the default BaseSignIn component
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
