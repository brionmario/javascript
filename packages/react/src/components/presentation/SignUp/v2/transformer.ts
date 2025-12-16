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
  EmbeddedFlowComponentV2 as EmbeddedFlowComponent,
  EmbeddedSignUpFlowErrorResponseV2 as EmbeddedSignUpFlowErrorResponse,
} from '@asgardeo/browser';
import {UseTranslation} from '../../../../hooks/useTranslation';
import resolveTranslationsInArray from '../../../../utils/v2/resolveTranslationsInArray';

/**
 * Extract components from flow response meta structure and resolve translation strings.
 * Since the API already returns components in the correct EmbeddedFlowComponent format,
 * we can use them directly but need to resolve any translation strings.
 */
export const transformToComponentDriven = (response: any, t: UseTranslation['t']): EmbeddedFlowComponent[] => {
  if (!response?.data?.meta?.components) {
    return [];
  }

  // Get components and resolve translation strings
  const components: EmbeddedFlowComponent[] = response.data.meta.components;

  return resolveTranslationsInArray(components, t);
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
    components: transformToComponentDriven(response, t),
  };
};
