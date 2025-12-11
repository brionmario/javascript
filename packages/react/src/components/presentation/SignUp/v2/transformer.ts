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

import {EmbeddedFlowComponent, EmbeddedFlowComponentType, EmbeddedSignUpFlowErrorResponseV2} from '@asgardeo/browser';
import {UseTranslation} from '../../../../hooks/useTranslation';

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
    // Tracker: https://github.com/asgardeo/AsgardeoV2 (AKA thunder/issues/725
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
    options?: string[];
  },
  t: UseTranslation['t'],
): EmbeddedFlowComponent => {
  let fieldType: string = input.type;

  // If the field name contains 'password' but type is 'string', change it to 'password'
  // TODO: Need to remove this one the following improvement is done.
  // Tracker: https://github.com/asgardeo/AsgardeoV2 (AKA thunder/issues/725
  if (input.name.toLowerCase().includes('password') && input.type.toLowerCase() === 'string') {
    fieldType = 'password';
  }

  // Handle dropdown type
  if (input.type.toLowerCase() === 'dropdown') {
    const label: string = getInputLabel(input.name, fieldType, t);
    const placeholder: string = getInputPlaceholder(input.name, fieldType, t);

    return {
      id: generateId('select'),
      type: EmbeddedFlowComponentType.Select,
      variant: 'SELECT',
      config: {
        type: fieldType,
        label,
        placeholder,
        required: input.required as boolean,
        identifier: input.name,
        hint: '',
        options: input.options || [],
      },
      components: [],
    };
  }

  const variant: 'TEXT' | 'EMAIL' | 'PASSWORD' = getInputVariant(fieldType, input.name);
  const label: string = getInputLabel(input.name, fieldType, t);
  const placeholder: string = getInputPlaceholder(input.name, fieldType, t);

  return {
    id: generateId('input'),
    type: EmbeddedFlowComponentType.Input,
    variant,
    config: {
      type: fieldType,
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
 * Extract error message from AsgardeoV2 (AKA Thunder) error response format.
 */
export const extractErrorMessage = (error: EmbeddedSignUpFlowErrorResponseV2, t: UseTranslation['t']): string => {
  let errorMessage: string = t('errors.sign.up.flow.failure');

  if (error && typeof error === 'object') {
    // Handle AsgardeoV2 (AKA Thunder) error format with failureReason
    if (
      (error as EmbeddedSignUpFlowErrorResponseV2).flowStatus === 'ERROR' &&
      (error as EmbeddedSignUpFlowErrorResponseV2).failureReason
    ) {
      errorMessage = (error as EmbeddedSignUpFlowErrorResponseV2).failureReason;
    } else if (error instanceof Error && error.name === 'AsgardeoAPIError') {
      try {
        const errorResponse: EmbeddedSignUpFlowErrorResponseV2 = JSON.parse(error.message);

        if ((errorResponse as EmbeddedSignUpFlowErrorResponseV2).failureReason) {
          errorMessage = (errorResponse as EmbeddedSignUpFlowErrorResponseV2).failureReason;
        } else {
          errorMessage = error.message;
        }
      } catch {
        errorMessage = error.message;
      }
    } else if ((error as any)?.message) {
      errorMessage = (error as any).message;
    }
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return errorMessage;
};

/**
 * Check if a response is an error response and extract the error message for AsgardeoV2 (AKA Thunder) format.
 */
export const checkForErrorResponse = (response: any, t: UseTranslation['t']): string | null => {
  if (response?.flowStatus === 'ERROR') {
    return extractErrorMessage(response, t);
  }

  return null;
};

/**
 * Transformer that handles simple responses and AsgardeoV2 (AKA Thunder) error responses
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
