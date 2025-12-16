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

import React, {ReactElement} from 'react';
import {
  AsgardeoRuntimeError,
  FieldType,
  EmbeddedFlowComponentV2 as EmbeddedFlowComponent,
  EmbeddedFlowComponentTypeV2 as EmbeddedFlowComponentType,
  EmbeddedFlowTextVariantV2 as EmbeddedFlowTextVariant,
} from '@asgardeo/browser';
import {createField} from '../../../factories/FieldFactory';
import Button from '../../../primitives/Button/Button';
import GoogleButton from '../../../adapters/GoogleButton';
import GitHubButton from '../../../adapters/GitHubButton';
import FacebookButton from '../../../adapters/FacebookButton';
import Typography from '../../../primitives/Typography/Typography';
import Divider from '../../../primitives/Divider/Divider';
import SmsOtpButton from '../../../adapters/SmsOtpButton';
import {TypographyVariant} from '../../../primitives/Typography/Typography.styles';

/**
 * Get the appropriate FieldType for an input component.
 */
const getFieldType = (variant: string): FieldType => {
  switch (variant) {
    case 'EMAIL':
      return FieldType.Email;
    case 'PASSWORD':
      return FieldType.Password;
    case 'TEXT':
    default:
      return FieldType.Text;
  }
};

/**
 * Get typography variant from component variant.
 */
const getTypographyVariant = (variant: string) => {
  const variantMap: Record<EmbeddedFlowTextVariant, TypographyVariant> = {
    HEADING_1: 'h1',
    HEADING_2: 'h2',
    HEADING_3: 'h3',
    HEADING_4: 'h4',
    HEADING_5: 'h5',
    HEADING_6: 'h6',
    SUBTITLE_1: 'subtitle1',
    SUBTITLE_2: 'subtitle2',
    BODY_1: 'body1',
    BODY_2: 'body2',
    CAPTION: 'caption',
    OVERLINE: 'overline',
    BUTTON_TEXT: 'button',
  };

  return variantMap[variant] || 'h3';
};

/**
 * Create a sign-in component from flow component configuration.
 */
const createSignInComponentFromFlow = (
  component: EmbeddedFlowComponent,
  formValues: Record<string, string>,
  touchedFields: Record<string, boolean>,
  formErrors: Record<string, string>,
  isLoading: boolean,
  isFormValid: boolean,
  onInputChange: (name: string, value: string) => void,
  options: {
    buttonClassName?: string;
    inputClassName?: string;
    key?: string | number;
    onInputBlur?: (name: string) => void;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>) => void;
    size?: 'small' | 'medium' | 'large';
    variant?: any;
  } = {},
): ReactElement | null => {
  const key: string | number = options.key || component.id;

  switch (component.type) {
    case EmbeddedFlowComponentType.TextInput: {
      const identifier: string = component.id;
      const value: string = formValues[identifier] || '';
      const isTouched: boolean = touchedFields[identifier] || false;
      const error: string = isTouched ? formErrors[identifier] : undefined;
      const fieldType: string = getFieldType('TEXT');

      const field = createField({
        type: fieldType as FieldType,
        name: identifier,
        label: component.label || '',
        placeholder: component.placeholder || '',
        required: component.required || false,
        value,
        error,
        onChange: (newValue: string) => onInputChange(identifier, newValue),
        onBlur: () => options.onInputBlur?.(identifier),
        className: options.inputClassName,
      });

      return React.cloneElement(field, {key});
    }

    case EmbeddedFlowComponentType.PasswordInput: {
      const identifier: string = component.id;
      const value: string = formValues[identifier] || '';
      const isTouched: boolean = touchedFields[identifier] || false;
      const error: string = isTouched ? formErrors[identifier] : undefined;
      const fieldType: string = getFieldType('PASSWORD');

      const field = createField({
        type: fieldType as FieldType,
        name: identifier,
        label: component.label || '',
        placeholder: component.placeholder || '',
        required: component.required || false,
        value,
        error,
        onChange: (newValue: string) => onInputChange(identifier, newValue),
        onBlur: () => options.onInputBlur?.(identifier),
        className: options.inputClassName,
      });

      return React.cloneElement(field, {key});
    }

    case EmbeddedFlowComponentType.Action: {
      const handleClick = () => {
        if (options.onSubmit) {
          const formData: Record<string, any> = {};
          Object.keys(formValues).forEach(field => {
            if (formValues[field]) {
              formData[field] = formValues[field];
            }
          });
          options.onSubmit(component, formData);
        }
      };

      // Render branded social login buttons for known action IDs
      const actionId: string = component.id;
      const eventType: string = (component.eventType as string) || '';

      if (actionId === 'google_auth' || eventType === 'google_auth') {
        return <GoogleButton key={key} onClick={handleClick} className={options.buttonClassName} />;
      }
      if (actionId === 'github_auth' || eventType === 'github_auth') {
        return <GitHubButton key={key} onClick={handleClick} className={options.buttonClassName} />;
      }
      if (actionId === 'facebook_auth' || eventType === 'facebook_auth') {
        return <FacebookButton key={key} onClick={handleClick} className={options.buttonClassName} />;
      }
      if (actionId === 'prompt_mobile' || eventType === 'prompt_mobile') {
        return <SmsOtpButton key={key} onClick={handleClick} className={options.buttonClassName} />;
      }

      // Fallback to generic button
      return (
        <Button
          fullWidth
          key={key}
          onClick={handleClick}
          disabled={isLoading || !isFormValid}
          className={options.buttonClassName}
          variant={component.variant?.toLowerCase() === 'primary' ? 'solid' : 'outline'}
          color={component.variant?.toLowerCase() === 'primary' ? 'primary' : 'secondary'}
        >
          {component.label || 'Submit'}
        </Button>
      );
    }

    case EmbeddedFlowComponentType.Text: {
      const variant = getTypographyVariant(component.variant);
      return (
        <Typography key={key} variant={variant}>
          {component.label || ''}
        </Typography>
      );
    }

    case EmbeddedFlowComponentType.Block: {
      if (component.components && component.components.length > 0) {
        const blockComponents = component.components
          .map((childComponent, index) =>
            createSignInComponentFromFlow(
              childComponent,
              formValues,
              touchedFields,
              formErrors,
              isLoading,
              isFormValid,
              onInputChange,
              {
                ...options,
                key: childComponent.id || `${component.id}_${index}`,
              },
            ),
          )
          .filter(Boolean);

        return <div key={key}>{blockComponents}</div>;
      }
      return null;
    }

    // case EmbeddedFlowComponentType.Divider: {
    //   return <Divider key={key} />;
    // }

    default:
      throw new AsgardeoRuntimeError(
        `Unsupported component type: ${component.type}`,
        'SignIn-UnsupportedComponentType-001',
        'react',
        'Something went wrong while rendering the sign-in component. Please try again later.',
      );
  }
};

/**
 * Processes an array of components and renders them as React elements.
 */
export const renderSignInComponents = (
  components: EmbeddedFlowComponent[],
  formValues: Record<string, string>,
  touchedFields: Record<string, boolean>,
  formErrors: Record<string, string>,
  isLoading: boolean,
  isFormValid: boolean,
  onInputChange: (name: string, value: string) => void,
  options?: {
    buttonClassName?: string;
    inputClassName?: string;
    onInputBlur?: (name: string) => void;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>) => void;
    size?: 'small' | 'medium' | 'large';
    variant?: any;
  },
): ReactElement[] =>
  components
    .map((component, index) =>
      createSignInComponentFromFlow(
        component,
        formValues,
        touchedFields,
        formErrors,
        isLoading,
        isFormValid,
        onInputChange,
        {
          ...options,
          key: component.id || index,
        },
      ),
    )
    .filter(Boolean);
