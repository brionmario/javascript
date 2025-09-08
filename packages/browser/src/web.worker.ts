/**
 * Copyright (c) 2022, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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

import { Buffer } from 'buffer/';
import {AsgardeoAuthClient} from '@asgardeo/javascript';
import {AuthenticationHelper, SPAHelper} from './__legacy__/helpers';
import {WebWorkerClientConfig} from './__legacy__/models';
import {workerReceiver} from './__legacy__/worker/worker-receiver';

// Set up global polyfills
if (typeof self !== 'undefined' && !(self as any).Buffer) {
  (self as any).Buffer = Buffer;
}

if (typeof self !== 'undefined') {
  if (!(self as any).global) {
    (self as any).global = self;
  }
  // Note: globalThis is read-only, so we don't try to override it
  // The esbuild config already maps globalThis to self via define
}

workerReceiver((authClient: AsgardeoAuthClient<WebWorkerClientConfig>, spaHelper: SPAHelper<WebWorkerClientConfig>) => {
  return new AuthenticationHelper(authClient, spaHelper);
});

export default {} as typeof Worker & {new (): Worker};
