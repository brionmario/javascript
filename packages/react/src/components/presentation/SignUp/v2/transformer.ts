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
  EmbeddedFlowComponentTypeV2 as EmbeddedFlowComponentType,
  EmbeddedSignUpFlowErrorResponseV2 as EmbeddedSignUpFlowErrorResponse,
} from '@asgardeo/browser';
import {UseTranslation} from '../../../../hooks/useTranslation';

/**
 * Transform flow response using meta.components structure.
 * Converts the API component format to the legacy format expected by UI components.
 */
export const transformToComponentDriven = (response: any): EmbeddedFlowComponent[] => {
  if (!response?.data?.meta?.components) {
    return [];
  }

  return transformComponents(response.data.meta.components);
};

/**
 * Convert API component format to the format expected by UI components.
 */
const transformComponents = (apiComponents: any[]): EmbeddedFlowComponent[] => {
  return apiComponents.map(transformSingleComponent).filter(Boolean);
};

/**
 * Transform a single API component to the expected format
 */
const transformSingleComponent = (apiComponent: any): EmbeddedFlowComponent | null => {
  if (!apiComponent?.type) return null;

  const baseComponent: EmbeddedFlowComponent = {
    id: apiComponent.id,
    type: apiComponent.type,
    variant: apiComponent.variant,
    config: {
      label: apiComponent.label,
      placeholder: apiComponent.placeholder,
      required: apiComponent.required,
      identifier: apiComponent.id,
      eventType: apiComponent.eventType,
    },
    components: [],
  };

  // Handle nested components (for BLOCK type)
  if (apiComponent.components && Array.isArray(apiComponent.components)) {
    baseComponent.components = transformComponents(apiComponent.components);
  }

  return baseComponent;
};

/**
 * Extract error message from error response format.
 */
export const extractErrorMessage = (error: EmbeddedSignUpFlowErrorResponse, t: UseTranslation['t']): string => {
  if (error.failureReason) {
    return error.failureReason;
  }

  // Fallback to a generic error message
  return t('components.signUp.errors.generic');
};

/**
 * Check if a response is an error response and extract the error message.
 */
export const checkForErrorResponse = (response: any, t: UseTranslation['t']): string | null => {
  if (response?.flowStatus === 'ERROR' && response.failureReason) {
    return extractErrorMessage(response as EmbeddedSignUpFlowErrorResponse, t);
  }
  return null;
};

/**
 * Generic transformer that handles flow responses with error checking
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
    components: transformToComponentDriven(response),
  };
};
