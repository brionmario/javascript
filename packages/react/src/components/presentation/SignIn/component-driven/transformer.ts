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

import {EmbeddedFlowComponent, EmbeddedFlowComponentType} from '@asgardeo/browser';
import useTranslation, {UseTranslation} from '../../../../hooks/useTranslation';

/**
 * Generate a unique ID for components
 */
const generateId = (prefix: string): string => {
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${prefix}_${suffix}`;
};

/**
 * Convert simple input type to component variant
 */
const getInputVariant = (type: string): 'TEXT' | 'EMAIL' | 'PASSWORD' => {
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
  // Use i18n keys for labels, fallback to capitalized name
  const i18nKey = `elements.fields.${name}`;
  // Try translation, fallback to capitalized name
  const label = t(i18nKey);

  if (label === i18nKey || !label) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return label;
};

/**
 * Get appropriate placeholder for input based on name and type
 */
const getInputPlaceholder = (name: string, type: string, t: UseTranslation['t']): string => {
  const label = getInputLabel(name, type, t);
  const placeholder = t('elements.fields.placeholder', {field: label});
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
  const variant = getInputVariant(input.type);
  const label = getInputLabel(input.name, input.type, t);
  const placeholder = getInputPlaceholder(input.name, input.type, t);

  return {
    id: generateId('input'),
    type: EmbeddedFlowComponentType.Input,
    variant,
    config: {
      type: input.type === 'string' ? 'text' : input.type,
      label,
      placeholder,
      required: input.required,
      identifier: input.name,
      hint: '',
    },
    components: [],
  };
};

/**
 * Transform simple flow response to component-driven format
 */
export const transformSimpleToComponentDriven = (response: any, t: UseTranslation['t']): EmbeddedFlowComponent[] => {
  // Create a form container with input components
  const inputComponents = response?.data?.inputs?.map((input: any) => convertSimpleInputToComponent(input, t));

  // Add a submit button with i18n
  const submitButton: EmbeddedFlowComponent = {
    id: generateId('button'),
    type: EmbeddedFlowComponentType.Button,
    variant: 'PRIMARY',
    config: {
      type: 'submit',
      text: t('elements.buttons.signIn'),
    },
    components: [],
  };

  // Create a form component containing all inputs and the submit button
  const formComponent: EmbeddedFlowComponent = {
    id: generateId('form'),
    type: EmbeddedFlowComponentType.Form,
    config: {},
    components: [...inputComponents, submitButton],
  };

  return [formComponent];
};

/**
 * Generic transformer that handles both simple and component-driven responses
 */
export const normalizeFlowResponse = (
  response: any,
  t: UseTranslation['t'],
): {
  flowId: string;
  components: EmbeddedFlowComponent[];
} => {
  return {
    flowId: response.flowId,
    components: transformSimpleToComponentDriven(response, t),
  };
};
