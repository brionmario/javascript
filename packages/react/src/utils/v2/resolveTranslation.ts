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

import {UseTranslation} from '../../hooks/useTranslation';

/**
 * Checks if a string is a translation template string.
 * @param text - The text to check
 * @returns true if the text is a translation template string
 */
const isTranslationString = (text: string): boolean => {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const trimmed: string = text.trim();

  return trimmed.startsWith('{{') && trimmed.endsWith('}}');
};

/**
 * Extracts the translation key from a translation template string.
 * @param text - The translation template string (e.g., "{{ t(signin:heading.label) }}")
 * @returns The translation key or null if not a valid translation string
 */
const extractTranslationKey = (text: string): string | null => {
  if (!isTranslationString(text)) {
    return null;
  }

  // Remove {{ and }} and trim
  const content: string = text.trim().slice(2, -2).trim();

  // Check if it contains t() function call
  const tFunctionMatch: RegExpMatchArray | null = content.match(/^t\((.+)\)$/);

  if (!tFunctionMatch) {
    return null;
  }

  // Extract the key inside t()
  let key: string = tFunctionMatch[1].trim();

  // Remove quotes if present
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }

  // Transform colon-separated keys to dot-separated keys
  // e.g., "signin:fields.password.label" -> "signin.fields.password.label"
  const transformedKey: string = key.replace(/:/g, '.');

  return transformedKey;
};

/**
 * Resolves a translation string using the provided translation function.
 * If the text is not a translation string, returns the original text.
 * @param text - The text to resolve (could be a translation string or regular text)
 * @param t - The translation function from useTranslation
 * @returns The resolved text
 */
export const resolveTranslation = (text: string | undefined, t: UseTranslation['t']): string => {
  if (!text) {
    return '';
  }

  const translationKey: string | null = extractTranslationKey(text);

  if (translationKey) {
    return t(translationKey);
  }

  // Return original text if not a translation string
  return text;
};

export default resolveTranslation;
