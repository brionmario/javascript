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

import {EmbeddedFlowExecuteRequestConfig, EmbeddedFlowResponseType, EmbeddedFlowType} from '../embedded-flow';

/**
 * Status enumeration for AsgardeoV2 embedded sign-up flow responses.
 *
 * This enum defines the possible states of a sign-up flow operation,
 * allowing client applications to determine the next appropriate action.
 *
 * @experimental Part of the new AsgardeoV2 API
 */
export enum EmbeddedSignUpFlowStatusV2 {
  /**
   * Sign-up flow has completed successfully.
   *
   * When this status is returned, the user has successfully registered
   * and the flow can proceed to redirection or completion handling.
   * The response will typically contain redirect information.
   */
  Complete = 'COMPLETE',

  /**
   * Sign-up flow is in progress and requires additional user input.
   *
   * This status indicates that more steps are needed to complete the
   * sign-up process. The response will contain form components or
   * actions that need to be presented to the user.
   */
  Incomplete = 'INCOMPLETE',

  /**
   * Sign-up flow encountered an error and cannot proceed.
   *
   * When this status is returned, the response will be of type
   * `EmbeddedSignUpFlowErrorResponseV2` and will contain a `failureReason`
   * field with details about what went wrong. This triggers error
   * handling in the React components to display user-friendly messages.
   *
   * @see {@link EmbeddedSignUpFlowErrorResponseV2} for error response structure
   */
  Error = 'ERROR',
}

export enum EmbeddedSignUpFlowTypeV2 {
  Redirection = 'REDIRECTION',
  View = 'VIEW',
}

/**
 * Extended response structure for the embedded sign-up flow V2.
 * @remarks This response is only done from the SDK level.
 * @experimental
 */
export interface ExtendedEmbeddedSignUpFlowResponseV2 {
  /**
   * The URL to redirect the user after completing the sign-up flow.
   */
  redirectUrl?: string;
}

/**
 * Response structure for the new Asgardeo V2 embedded sign-up flow.
 *
 * This interface defines the structure for successful sign-up flow responses
 * from AsgardeoV2 APIs. For error responses, see `EmbeddedSignUpFlowErrorResponseV2`.
 *
 * **Flow States:**
 * - `INCOMPLETE`: More user input required, `data` contains form components
 * - `COMPLETE`: Sign-up finished, may contain redirect information
 * - For `ERROR` status, a separate `EmbeddedSignUpFlowErrorResponseV2` structure is used
 *
 * **Component-Driven UI:**
 * The `data.inputs` and `data.actions` are transformed by the React transformer
 * into component-driven format for consistent UI rendering across different
 * Asgardeo versions.
 *
 * @experimental Part of the new AsgardeoV2 API
 * @see {@link EmbeddedSignUpFlowErrorResponseV2} for error response structure
 * @see {@link EmbeddedSignUpFlowStatusV2} for available flow statuses
 */
export interface EmbeddedSignUpFlowResponseV2 extends ExtendedEmbeddedSignUpFlowResponseV2 {
  /**
   * Unique identifier for this sign-up flow instance.
   */
  flowId: string;

  /**
   * Current status of the sign-up flow.
   * Determines whether more input is needed or the flow is complete.
   */
  flowStatus: EmbeddedSignUpFlowStatusV2;

  /**
   * Type of response, indicating the expected user interaction.
   */
  type: EmbeddedSignUpFlowTypeV2;

  /**
   * Flow data containing form inputs and available actions.
   * This is transformed to component-driven format by the React transformer.
   */
  data: {
    /**
     * Available actions the user can take (e.g., form submission, social sign-up).
     */
    actions?: {
      type: EmbeddedFlowResponseType;
      id: string;
    }[];

    /**
     * Input fields required for the current step of the sign-up flow.
     */
    inputs?: {
      name: string;
      type: string;
      required: boolean;
    }[];
  };
}

/**
 * Response structure for the new Asgardeo V2 embedded sign-up flow when the flow is complete.
 * @experimental
 */
export interface EmbeddedSignUpFlowCompleteResponse {
  redirect_uri: string;
}

/**
 * Request payload for initiating the new Asgardeo V2 embedded sign-up flow.
 * @experimental
 */
export type EmbeddedSignUpFlowInitiateRequestV2 = {
  applicationId: string;
  flowType: EmbeddedFlowType;
};

/**
 * Request payload for executing steps in the new Asgardeo V2 embedded sign-up flow.
 * @experimental
 */
export interface EmbeddedSignUpFlowRequestV2 extends Partial<EmbeddedSignUpFlowInitiateRequestV2> {
  flowId?: string;
  actionId?: string;
  inputs?: Record<string, any>;
}

/**
 * Request config for executing the new Asgardeo V2 embedded sign-up flow.
 * @experimental
 */
export interface EmbeddedFlowExecuteRequestConfigV2<T = any> extends EmbeddedFlowExecuteRequestConfig<T> {
  authId?: string;
}

/**
 * Error response structure for the new Asgardeo V2 embedded sign-up flow.
 *
 * This interface defines the structure of error responses returned by AsgardeoV2 APIs
 * when sign-up operations fail. Unlike AsgardeoV1 which uses generic error codes and
 * descriptions, AsgardeoV2 provides more specific failure reasons within the flow context.
 *
 * **Key Differences from AsgardeoV1:**
 * - Uses `failureReason` instead of `message`/`description` for error details
 * - Maintains flow context with `flowId` for tracking failed operations
 * - Uses structured `flowStatus` enum instead of generic error codes
 * - Provides empty `data` object for consistency with success responses
 *
 * **Error Handling:**
 * This error response format is automatically detected and processed by the
 * `extractErrorMessage()` and `checkForErrorResponse()` functions in the transformer
 * to extract meaningful error messages for display to users.
 *
 * @example
 * ```typescript
 * // Typical AsgardeoV2 error response
 * const errorResponse: EmbeddedSignUpFlowErrorResponseV2 = {
 *   flowId: "0ccfeaf9-18b3-43a5-bcc1-07d863dcb2c0",
 *   flowStatus: EmbeddedSignUpFlowStatusV2.Error,
 *   data: {},
 *   failureReason: "User already exists with the provided username."
 * };
 *
 * // This will be automatically transformed to a user-friendly error message:
 * // "User already exists with the provided username."
 * ```
 *
 * @experimental This is part of the new AsgardeoV2 API and may change in future versions
 * @see {@link EmbeddedSignUpFlowStatusV2.Error} for the error status enum value
 * @see {@link EmbeddedSignUpFlowResponseV2} for the corresponding success response structure
 */
export interface EmbeddedSignUpFlowErrorResponseV2 {
  /**
   * Unique identifier for the sign-up flow instance.
   * This ID is used to track the flow state and correlate error responses
   * with the specific sign-up attempt that failed.
   */
  flowId: string;

  /**
   * Status of the sign-up flow, which will be `EmbeddedSignUpFlowStatusV2.Error`
   * for error responses. This field is used by error detection logic to
   * identify failed flow responses.
   */
  flowStatus: EmbeddedSignUpFlowStatusV2;

  /**
   * Additional response data, typically empty for error responses.
   * Maintained for structural consistency with successful flow responses
   * which contain components, actions, and other flow data.
   */
  data: Record<string, any>;

  /**
   * Human-readable explanation of why the sign-up operation failed.
   *
   * This field contains specific error details that can be directly displayed
   * to users, such as:
   * - "User already exists with the provided username."
   * - "Invalid email address format."
   * - "Password does not meet complexity requirements."
   *
   * Unlike generic error codes, this provides contextual information
   * that helps users understand and resolve the issue.
   */
  failureReason: string;
}
