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

/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/naming-convention */

import {I18nTranslations, I18nMetadata, I18nBundle} from '../models/i18n';

const translations: I18nTranslations = {
  /* |---------------------------------------------------------------| */
  /* |                        Elements                               | */
  /* |---------------------------------------------------------------| */

  /* Buttons */
  'elements.buttons.signin.text': 'உள்நுழை',
  'elements.buttons.signout.text': 'வெளியேறு',
  'elements.buttons.signup.text': 'பதிவு செய்',
  'elements.buttons.facebook.text': 'Facebook மூலம் தொடரவும்',
  'elements.buttons.google.text': 'Google மூலம் தொடரவும்',
  'elements.buttons.github.text': 'GitHub மூலம் தொடரவும்',
  'elements.buttons.microsoft.text': 'Microsoft மூலம் தொடரவும்',
  'elements.buttons.linkedin.text': 'LinkedIn மூலம் தொடரவும்',
  'elements.buttons.ethereum.text': 'Ethereum மூலம் உள்நுழை',
  'elements.buttons.smsotp.text': 'SMS மூலம் தொடரவும்',
  'elements.buttons.multi.option.text': '{connection} மூலம் தொடரவும்',
  'elements.buttons.social.text': '{connection} மூலம் தொடரவும்',

  /* Fields */
  'elements.fields.generic.placeholder': '{field} உள்ளிடவும்',
  'elements.fields.username.label': 'பயனர்பெயர்',
  'elements.fields.password.label': 'கடவுச்சொல்',
  'elements.fields.organization.name.label': 'அமைப்பின் பெயர்',
  'elements.fields.organization.handle.label': 'அமைப்பு கையாளுதல்',
  'elements.fields.organization.description.label': 'அமைப்பு விளக்கம்',

  /* Validation */
  'validations.required.field.error': 'இந்த புலம் தேவை',

  /* |---------------------------------------------------------------| */
  /* |                        Widgets                                | */
  /* |---------------------------------------------------------------| */

  /* Base Sign In */
  'signin.heading': 'உள்நுழை',
  'signin.subheading': 'தொடர உங்கள் சான்றுகளை உள்ளிடவும்.',

  /* Base Sign Up */
  'signup.heading': 'பதிவு செய்',
  'signup.subheading': 'தொடங்க புதிய கணக்கை உருவாக்கவும்.',

  /* Email OTP */
  'email.otp.heading': 'OTP சரிபார்ப்பு',
  'email.otp.subheading': 'உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்ட குறியீட்டை உள்ளிடவும்.',
  'email.otp.submit.button.text': 'தொடரவும்',

  /* Identifier First */
  'identifier.first.heading': 'உள்நுழை',
  'identifier.first.subheading': 'பயனர்பெயர் அல்லது மின்னஞ்சல் முகவரியை உள்ளிடவும்.',
  'identifier.first.submit.button.text': 'தொடரவும்',

  /* SMS OTP */
  'sms.otp.heading': 'OTP சரிபார்ப்பு',
  'sms.otp.subheading': 'உங்கள் தொலைபேசிக்கு அனுப்பப்பட்ட குறியீட்டை உள்ளிடவும்.',
  'sms.otp.submit.button.text': 'தொடரவும்',

  /* TOTP */
  'totp.heading': 'உங்கள் அடையாளத்தை சரிபார்க்கவும்',
  'totp.subheading': 'உங்கள் அங்கீகரிப்பு செயலியில் உள்ள குறியீட்டை உள்ளிடவும்.',
  'totp.submit.button.text': 'தொடரவும்',

  /* Username Password */
  'username.password.submit.button.text': 'தொடரவும்',
  'username.password.heading': 'உள்நுழை',
  'username.password.subheading': 'தொடர உங்கள் பயனர்பெயர் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.',

  /* |---------------------------------------------------------------| */
  /* |                          User Profile                         | */
  /* |---------------------------------------------------------------| */

  'user.profile.heading': 'சுயவிவரம்',
  'user.profile.update.generic.error':
    'உங்கள் சுயவிவரத்தை புதுப்பிக்கும் போது பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.',

  /* |---------------------------------------------------------------| */
  /* |                     Organization Switcher                     | */
  /* |---------------------------------------------------------------| */

  'elements.fields.organization.select.label': 'அமைப்பை தேர்ந்தெடு',
  'organization.switcher.switch.organization': 'அமைப்பை மாற்று',
  'organization.switcher.loading.placeholder.organizations': 'அமைப்புகள் ஏற்றப்படுகின்றன...',
  'organization.switcher.members': 'உறுப்பினர்கள்',
  'organization.switcher.member': 'உறுப்பினர்',
  'organization.switcher.create.organization': 'அமைப்பை உருவாக்கு',
  'organization.switcher.manage.organizations': 'அமைப்புகளை நிர்வகிக்கவும்',
  'organization.switcher.manage.button.text': 'நிர்வகி',
  'organization.switcher.organizations.heading': 'அமைப்புகள்',
  'organization.switcher.switch.button.text': 'மாற்று',
  'organization.switcher.no.access': 'அணுகல் இல்லை',
  'organization.switcher.status.label': 'நிலை:',
  'organization.switcher.showing.count': 'மொத்த {total} அமைப்புகளில் {showing} காட்டப்படுகிறது',
  'organization.switcher.refresh.button.text': 'புதுப்பி',
  'organization.switcher.load_more.button.text': 'மேலும் அமைப்புகளை ஏற்று',
  'organization.switcher.loading.more': 'ஏற்றப்படுகிறது...',
  'organization.switcher.no.organizations': 'எந்த அமைப்பும் கிடைக்கவில்லை',
  'organization.switcher.error.prefix': 'பிழை:',
  'organization.profile.heading': 'அமைப்பு சுயவிவரம்',
  'organization.profile.loading': 'அமைப்பை ஏற்றுகிறது...',
  'organization.profile.error': 'அமைப்பை ஏற்ற முடியவில்லை',

  'organization.create.heading': 'அமைப்பை உருவாக்கு',
  'organization.create.button.text': 'அமைப்பை உருவாக்கு',
  'organization.create.button.loading.text': 'உருவாக்கப்படுகிறது...',
  'organization.create.cancel.button.text': 'ரத்து செய்',

  /* |---------------------------------------------------------------| */
  /* |                        Messages                               | */
  /* |---------------------------------------------------------------| */

  'messages.loading.placeholder': 'ஏற்றப்படுகிறது...',

  /* |---------------------------------------------------------------| */
  /* |                        Errors                                 | */
  /* |---------------------------------------------------------------| */

  'errors.heading': 'பிழை',
  'errors.signin.initialization': 'தொடக்கத்தில் பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
  'errors.signin.flow.failure': 'உள்நுழைவு செயல்பாட்டின் போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
  'errors.signin.flow.completion.failure':
    'உள்நுழைவு செயல்பாட்டை முடிக்கும் போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
  'errors.signin.flow.passkeys.failure':
    'பாஸ்கீக்கள் மூலம் உள்நுழையும்போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
  'errors.signin.flow.passkeys.completion.failure':
    'பாஸ்கீ உள்நுழைவு முடிக்கும் போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
  'errors.signup.initialization': 'தொடங்கும்போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
  'errors.signup.flow.failure': 'பதிவு செய்யும் செயல்பாட்டில் பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
  'errors.signup.flow.initialization.failure':
    'பதிவு செய்யும் செயல்பாட்டை தொடங்கும்போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
  'errors.signup.components.not.available': 'பதிவு படிவம் இப்போது கிடைக்கவில்லை. பின்னர் மீண்டும் முயற்சிக்கவும்.',
  'errors.signin.components.not.available': 'உள்நுழைவு படிவம் இப்போது கிடைக்கவில்லை. பின்னர் மீண்டும் முயற்சிக்கவும்.',
};

const metadata: I18nMetadata = {
  localeCode: 'ta-IN',
  countryCode: 'IN',
  languageCode: 'ta',
  displayName: 'தமிழ் (இலங்கை)',
  direction: 'ltr',
};

const ta_IN: I18nBundle = {
  metadata,
  translations,
};

export default ta_IN;
