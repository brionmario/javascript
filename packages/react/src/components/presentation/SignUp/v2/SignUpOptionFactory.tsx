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
} from '@asgardeo/browser';
import {createField} from '../../../factories/FieldFactory';
import Button from '../../../primitives/Button/Button';
import GoogleButton from '../../../adapters/GoogleButton';
import GitHubButton from '../../../adapters/GitHubButton';
import FacebookButton from '../../../adapters/FacebookButton';
import Typography from '../../../primitives/Typography/Typography';
import Divider from '../../../primitives/Divider/Divider';
import SmsOtpButton from '../../../adapters/SmsOtpButton';
import MicrosoftButton from '../../../adapters/MicrosoftButton';
import LinkedInButton from '../../../adapters/LinkedInButton';
import SignInWithEthereumButton from '../../../adapters/SignInWithEthereumButton';
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
  const variantMap: Record<string, any> = {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    H4: 'h4',
    H5: 'h5',
    H6: 'h6',
  };
  return variantMap[variant] || 'h3';
};

/**
 * Create a sign-up component from flow component configuration.
 */
/**
 * Create a sign-up component from flow component configuration.
 */
const createSignUpComponentFromFlow = (
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
      const buttonText: string = component.label || '';

      if (actionId === 'google_auth' || eventType === 'google_auth' || buttonText.toLowerCase().includes('google')) {
        return <GoogleButton key={key} onClick={handleClick} className={options.buttonClassName} />;
      }
      if (actionId === 'github_auth' || eventType === 'github_auth' || buttonText.toLowerCase().includes('github')) {
        return <GitHubButton key={key} onClick={handleClick} className={options.buttonClassName} />;
      }
      if (
        actionId === 'facebook_auth' ||
        eventType === 'facebook_auth' ||
        buttonText.toLowerCase().includes('facebook')
      ) {
        return <FacebookButton key={key} onClick={handleClick} className={options.buttonClassName} />;
      }
      if (
        actionId === 'microsoft_auth' ||
        eventType === 'microsoft_auth' ||
        buttonText.toLowerCase().includes('microsoft')
      ) {
        return <MicrosoftButton key={key} onClick={handleClick} className={options.buttonClassName} />;
      }
      if (
        actionId === 'linkedin_auth' ||
        eventType === 'linkedin_auth' ||
        buttonText.toLowerCase().includes('linkedin')
      ) {
        return <LinkedInButton key={key} onClick={handleClick} className={options.buttonClassName} />;
      }
      if (
        actionId === 'ethereum_auth' ||
        eventType === 'ethereum_auth' ||
        buttonText.toLowerCase().includes('ethereum')
      ) {
        return <SignInWithEthereumButton key={key} onClick={handleClick} className={options.buttonClassName} />;
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
          {buttonText || 'Submit'}
        </Button>
      );
    }

    case EmbeddedFlowComponentType.Text: {
      const variant = getTypographyVariant(component.variant || 'H3');
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
            createSignUpComponentFromFlow(
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

    default:
      throw new AsgardeoRuntimeError(
        `Unsupported component type: ${component.type}`,
        'SignUp-UnsupportedComponentType-001',
        'react',
        'Something went wrong while rendering the sign-up component. Please try again later.',
      );
  }
};

/**
 * Processes an array of components and renders them as React elements.
 */
export const renderSignUpComponents = (
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
      createSignUpComponentFromFlow(
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
