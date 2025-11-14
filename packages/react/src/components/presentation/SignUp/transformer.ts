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

import {
  EmbeddedFlowComponent,
  EmbeddedFlowComponentType,
  EmbeddedSignUpFlowErrorResponseV2,
  EmbeddedFlowExecuteErrorResponse,
} from '@asgardeo/browser';
import useTranslation, {UseTranslation} from '../../../hooks/useTranslation';

/**
 * Generate a unique ID for components
 */
const generateId = (prefix: string): string => {
  const suffix: string = Math.random().toString(36).substring(2, 6);

  return `${prefix}_${suffix}`;
};

/**
 * Convert simple input type to component variant
 */
const getInputVariant = (type: string, name: string): 'TEXT' | 'EMAIL' | 'PASSWORD' => {
  // Then check type
  switch (type.toLowerCase()) {
    case 'email':
      return 'EMAIL';
    case 'password':
      return 'PASSWORD';
    default:
      return 'TEXT';
  }
};

/**
 * Get appropriate label for input based on name and type
 */
const getInputLabel = (name: string, type: string, t: UseTranslation['t']): string => {
  const i18nKey: string = `elements.fields.${name}`;
  const label: string = t(i18nKey);

  if (label === i18nKey || !label) {
    // Convert camelCase to sentence case (e.g., "firstName" -> "First name")
    // TODO: Need to remove this one the following improvement is done.
    // Tracker: https://github.com/asgardeo/thunder/issues/725
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  return label;
};

/**
 * Get appropriate placeholder for input based on name and type.
 *
 * @param name - The input field name
 * @param type - The input field type
 * @param t - Translation function
 * @returns Localized or fallback placeholder for the input
 */
const getInputPlaceholder = (name: string, type: string, t: UseTranslation['t']): string => {
  const label: string = getInputLabel(name, type, t);
  const placeholder: string = t('elements.fields.placeholder', {field: label});

  // If translation not found, fallback
  if (!placeholder || placeholder === 'elements.fields.placeholder') {
    return `Enter your ${label}`;
  }

  return placeholder;
};

/**
 * Convert simple input to component-driven input component
 */
const convertSimpleInputToComponent = (
  input: {
    name: string;
    type: string;
    required: boolean;
  },
  t: UseTranslation['t'],
): EmbeddedFlowComponent => {
  let fieldType: string = input.type;

  // If the field name contains 'password' but type is 'string', change it to 'password'
  // TODO: Need to remove this one the following improvement is done.
  // Tracker: https://github.com/asgardeo/thunder/issues/725
  if (input.name.toLowerCase().includes('password') && input.type.toLowerCase() === 'string') {
    fieldType = 'password';
  }

  const variant: 'TEXT' | 'EMAIL' | 'PASSWORD' = getInputVariant(fieldType, input.name);
  const label: string = getInputLabel(input.name, fieldType, t);
  const placeholder: string = getInputPlaceholder(input.name, fieldType, t);

  return {
    id: generateId('input'),
    type: EmbeddedFlowComponentType.Input,
    variant,
    config: {
      type: input.type,
      label,
      placeholder,
      required: input.required as boolean,
      identifier: input.name,
      hint: '',
    },
    components: [],
  };
};

/**
 * Convert action to component-driven button component
 */
const convertActionToComponent = (
  action: {type: string; id: string},
  t: UseTranslation['t'],
): EmbeddedFlowComponent => {
  // Normalize action ID for translation lookup (e.g., "google_auth" -> "google")
  const normalizedId: string = action.id.replace(/_auth$/, '');

  // Use i18n key for button text, fallback to capitalized id
  const i18nKey: string = `elements.buttons.${normalizedId}`;
  let text: string = t(i18nKey);

  if (!text || text === i18nKey) {
    // Fallback: format the original action ID
    text = action.id.replace(/_/g, ' ');
    text = text.charAt(0).toUpperCase() + text.slice(1);
  }

  return {
    id: generateId('action'),
    type: EmbeddedFlowComponentType.Button,
    variant: 'SECONDARY',
    config: {
      type: 'button',
      text,
      actionId: action.id,
      actionType: action.type,
    },
    components: [],
  };
};

/**
 * Transform simple flow response to component-driven format
 */
export const transformSimpleToComponentDriven = (response: any, t: UseTranslation['t']): EmbeddedFlowComponent[] => {
  // Create input components if present
  const inputComponents: EmbeddedFlowComponent[] =
    response?.data?.inputs?.map((input: any) => convertSimpleInputToComponent(input, t)) || [];

  // Create action buttons if present
  const actionComponents: EmbeddedFlowComponent[] =
    response?.data?.actions?.map((action: any) => convertActionToComponent(action, t)) || [];

  // Add a submit button if there are inputs
  const submitButton: EmbeddedFlowComponent | null =
    inputComponents.length > 0
      ? {
          id: generateId('button'),
          type: EmbeddedFlowComponentType.Button,
          variant: 'PRIMARY',
          config: {
            type: 'submit',
            text: t('elements.buttons.signUp'),
          },
          components: [],
        }
      : null;

  // Compose form components (inputs + submit only)
  const formComponents: EmbeddedFlowComponent[] = [];
  if (inputComponents.length > 0) {
    formComponents.push(...inputComponents);
    if (submitButton) formComponents.push(submitButton);
  }

  const result: EmbeddedFlowComponent[] = [];
  // Add form if there are input fields
  if (formComponents.length > 0) {
    result.push({
      id: generateId('form'),
      type: EmbeddedFlowComponentType.Form,
      config: {},
      components: formComponents,
    });
  }

  // Add actions outside the form
  if (actionComponents.length > 0) {
    result.push(...actionComponents);
  }

  return result;
};

/**
 * Extract error message from various error response formats.
 *
 * This function supports multiple error formats from different versions of Asgardeo APIs:
 * - **AsgardeoV2 format**: Uses `failureReason` field from responses with `flowStatus: "ERROR"`
 * - **AsgardeoV1 format**: Uses `description` or `message` fields from responses with error `code`
 * - **AsgardeoAPIError**: Parses JSON from error messages to extract detailed error information
 * - **Standard Error objects**: Falls back to the `message` property
 * - **String errors**: Returns the string as-is
 *
 * @param error - The error object, which can be:
 *   - AsgardeoV2 error response: `{ flowStatus: "ERROR", failureReason: string, ... }`
 *   - AsgardeoV1 error response: `{ code: string, message?: string, description?: string, ... }`
 *   - AsgardeoAPIError instance with JSON message
 *   - Standard Error object
 *   - String error message
 * @param t - Translation function for fallback error messages
 * @returns Localized error message extracted from the error object
 *
 * @example
 * ```typescript
 * // AsgardeoV2 error
 * const v2Error = { flowStatus: "ERROR", failureReason: "User already exists" };
 * const message = extractErrorMessage(v2Error, t); // "User already exists"
 *
 * // AsgardeoV1 error
 * const v1Error = { code: "FEE-60005", description: "Error while provisioning user" };
 * const message = extractErrorMessage(v1Error, t); // "Error while provisioning user"
 *
 * // AsgardeoAPIError
 * const apiError = new AsgardeoAPIError('{"failureReason": "Invalid credentials"}');
 * const message = extractErrorMessage(apiError, t); // "Invalid credentials"
 * ```
 */
export const extractErrorMessage = (
  error: EmbeddedSignUpFlowErrorResponseV2 | EmbeddedFlowExecuteErrorResponse,
  t: UseTranslation['t'],
): string => {
  let errorMessage: string = t('errors.sign.up.flow.failure');

  if (error && typeof error === 'object') {
    // Handle AsgardeoV2 error format with failureReason
    if (
      (error as EmbeddedSignUpFlowErrorResponseV2).flowStatus === 'ERROR' &&
      (error as EmbeddedSignUpFlowErrorResponseV2).failureReason
    ) {
      errorMessage = (error as EmbeddedSignUpFlowErrorResponseV2).failureReason;
    } else if (
      (error as EmbeddedFlowExecuteErrorResponse).code &&
      ((error as EmbeddedFlowExecuteErrorResponse).message || (error as EmbeddedFlowExecuteErrorResponse).description)
    ) {
      errorMessage =
        (error as EmbeddedFlowExecuteErrorResponse).description || (error as EmbeddedFlowExecuteErrorResponse).message;
    } else if (error instanceof Error && error.name === 'AsgardeoAPIError') {
      try {
        const errorResponse: EmbeddedSignUpFlowErrorResponseV2 | EmbeddedFlowExecuteErrorResponse = JSON.parse(
          error.message,
        );

        // Try AsgardeoV2 format first
        if ((errorResponse as EmbeddedSignUpFlowErrorResponseV2).failureReason) {
          errorMessage = (errorResponse as EmbeddedSignUpFlowErrorResponseV2).failureReason;
        }

        // Try AsgardeoV1 format
        else if ((errorResponse as EmbeddedFlowExecuteErrorResponse).description) {
          errorMessage = (errorResponse as EmbeddedFlowExecuteErrorResponse).description;
        } else if ((errorResponse as EmbeddedFlowExecuteErrorResponse).message) {
          errorMessage = (errorResponse as EmbeddedFlowExecuteErrorResponse).message;
        } else {
          errorMessage = error.message;
        }
      } catch {
        errorMessage = error.message;
      }
    } else if (
      (
        error as {
          message: string;
        }
      ).message
    ) {
      errorMessage = (
        error as {
          message: string;
        }
      ).message;
    }
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return errorMessage;
};

/**
 * Check if a response is an error response and extract the error message.
 *
 * This function serves as a guard to identify error responses from successful responses
 * in both AsgardeoV1 and AsgardeoV2 API formats. It's particularly useful for flow
 * normalization where error responses should be handled differently from success responses.
 *
 * **Supported Error Response Formats:**
 * - **AsgardeoV2**: Responses with `flowStatus: "ERROR"` and `failureReason`
 * - **AsgardeoV1**: Responses with error `code` and `message`/`description` fields
 *
 * @param response - The API response object to check for error indicators
 * @param t - Translation function for extracting localized error messages
 * @returns `null` if the response is not an error, or the extracted error message string if it is an error
 *
 * @example
 * ```typescript
 * // Success response
 * const successResponse = { flowStatus: "INCOMPLETE", data: { components: [] } };
 * const error = checkForErrorResponse(successResponse, t); // null
 *
 * // AsgardeoV2 error response
 * const v2ErrorResponse = {
 *   flowStatus: "ERROR",
 *   failureReason: "User already exists with the provided username."
 * };
 * const error = checkForErrorResponse(v2ErrorResponse, t); // "User already exists with the provided username."
 *
 * // AsgardeoV1 error response
 * const v1ErrorResponse = {
 *   code: "FEE-60005",
 *   message: "Error while provisioning user.",
 *   description: "Error occurred while provisioning user in the request of flow id: ac57315c-6ca6-49dc-8664-fcdcff354f46"
 * };
 * const error = checkForErrorResponse(v1ErrorResponse, t); // "Error occurred while provisioning user in the request of flow id: ac57315c-6ca6-49dc-8664-fcdcff354f46"
 * ```
 */
export const checkForErrorResponse = (response: any, t: UseTranslation['t']): string | null => {
  // Check for AsgardeoV2 error response format
  if (response?.flowStatus === 'ERROR') {
    return extractErrorMessage(response, t);
  }

  // Check for AsgardeoV1 error response format
  if (response?.code && (response?.message || response?.description)) {
    return extractErrorMessage(response, t);
  }

  return null;
};

/**
 * Generic transformer that handles both simple and component-driven responses
 * Also handles AsgardeoV2 error responses that should be thrown as errors
 */
export const normalizeFlowResponse = (
  response: any,
  t: UseTranslation['t'],
): {
  flowId: string;
  components: EmbeddedFlowComponent[];
} => {
  // Check if this is an error response and throw it as an error
  // so it can be caught by the error handling in BaseSignUp
  const errorMessage: string | null = checkForErrorResponse(response, t);

  if (errorMessage) {
    throw response;
  }

  return {
    flowId: response.flowId,
    components: transformSimpleToComponentDriven(response, t),
  };
};
