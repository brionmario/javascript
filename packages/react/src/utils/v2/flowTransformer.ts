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

/**
 * @fileoverview Shared flow response transformer utilities for v2 embedded flows.
 *
 * This module provides reusable transformation functions for normalizing embedded flow
 * responses from Asgardeo APIs. It handles both successful responses with component
 * extraction and error responses with proper error message extraction.
 *
 * Key features:
 * - Component extraction from flow meta structure
 * - Translation string resolution in components
 * - Error response detection and message extraction
 * - Configurable error handling (throw vs return errors)
 *
 * Usage:
 * ```typescript
 * import { normalizeFlowResponse } from '../../../utils/v2/flowTransformer';
 *
 * const { flowId, components } = normalizeFlowResponse(apiResponse, t, {
 *   defaultErrorKey: 'components.signIn.errors.generic'
 * });
 * ```
 *
 * This transformer is used by both SignIn and SignUp v2 components to ensure
 * consistent response handling across all embedded flows.
 */

import {
  EmbeddedFlowComponentV2 as EmbeddedFlowComponent,
  EmbeddedSignUpFlowErrorResponseV2 as EmbeddedSignUpFlowErrorResponse,
} from '@asgardeo/browser';
import {UseTranslation} from '../../hooks/useTranslation';
import resolveTranslationsInArray from './resolveTranslationsInArray';

/**
 * Generic flow error response interface that covers common error structure
 */
export interface FlowErrorResponse {
  flowId: string;
  flowStatus: 'ERROR';
  failureReason?: string;
}

/**
 * Configuration options for flow transformation
 */
export interface FlowTransformOptions {
  /**
   * Whether to throw errors or return them as normalized response
   * @default true
   */
  throwOnError?: boolean;
  /**
   * Default error message key for translation fallback
   * @default 'errors.flow.generic'
   */
  defaultErrorKey?: string;
}

/**
 * Transform and resolve translations in components from flow response.
 * This function extracts components from the response meta structure and resolves
 * any translation strings within them.
 *
 * @param response - The flow response object containing components in meta structure
 * @param t - Translation function from useTranslation hook
 * @returns Array of flow components with resolved translations
 */
export const transformComponents = (response: any, t: UseTranslation['t']): EmbeddedFlowComponent[] => {
  if (!response?.data?.meta?.components) {
    return [];
  }

  const components: EmbeddedFlowComponent[] = response.data.meta.components;

  return resolveTranslationsInArray(components, t);
};

/**
 * Extract error message from flow error response.
 * Supports any flow error response that follows the standard structure.
 *
 * @param error - The error response object
 * @param t - Translation function for fallback messages
 * @param defaultErrorKey - Default translation key for generic errors
 * @returns Extracted error message or fallback
 */
export const extractErrorMessage = (
  error: FlowErrorResponse | any,
  t: UseTranslation['t'],
  defaultErrorKey: string = 'errors.flow.generic',
): string => {
  if (error && typeof error === 'object' && error.failureReason) {
    return error.failureReason;
  }

  // Fallback to a generic error message
  return t(defaultErrorKey);
};

/**
 * Check if a response is an error response and extract the error message.
 * This function identifies error responses by checking for ERROR status and failure reasons.
 *
 * @param response - The flow response to check
 * @param t - Translation function for error messages
 * @param defaultErrorKey - Default translation key for generic errors
 * @returns Error message string if response is an error, null otherwise
 */
export const checkForErrorResponse = (
  response: any,
  t: UseTranslation['t'],
  defaultErrorKey: string = 'errors.flow.generic',
): string | null => {
  if (response?.flowStatus === 'ERROR') {
    return extractErrorMessage(response, t, defaultErrorKey);
  }

  return null;
};

/**
 * Generic flow response normalizer that handles both success and error responses.
 * This is the main transformer function that should be used by all flow components.
 *
 * @param response - The raw flow response from the API
 * @param t - Translation function from useTranslation hook
 * @param options - Configuration options for transformation behavior
 * @returns Normalized flow response with flowId and transformed components
 * @throws {any} The original response if it's an error and throwOnError is true
 */
export const normalizeFlowResponse = (
  response: any,
  t: UseTranslation['t'],
  options: FlowTransformOptions = {},
): {
  flowId: string;
  components: EmbeddedFlowComponent[];
} => {
  const {throwOnError = true, defaultErrorKey = 'errors.flow.generic'} = options;

  // Check if this is an error response
  const errorMessage: string | null = checkForErrorResponse(response, t, defaultErrorKey);

  if (errorMessage && throwOnError) {
    // Throw the original response so it can be caught by error handling
    throw response;
  }

  return {
    flowId: response.flowId,
    components: transformComponents(response, t),
  };
};
