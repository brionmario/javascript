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

export enum EmbeddedSignUpFlowStatusV2 {
  Complete = 'COMPLETE',
  Incomplete = 'INCOMPLETE',
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
 * @experimental
 */
export interface EmbeddedSignUpFlowResponseV2 extends ExtendedEmbeddedSignUpFlowResponseV2 {
  flowId: string;
  flowStatus: EmbeddedSignUpFlowStatusV2;
  type: EmbeddedSignUpFlowTypeV2;
  data: {
    actions?: {
      type: EmbeddedFlowResponseType;
      id: string;
    }[];
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
  sessionDataKey?: string;
}
