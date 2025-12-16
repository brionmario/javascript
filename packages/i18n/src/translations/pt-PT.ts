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
  'elements.buttons.signin.text': 'Iniciar Sessão',
  'elements.buttons.signout.text': 'Terminar Sessão',
  'elements.buttons.signup.text': 'Registar-se',
  'elements.buttons.facebook.text': 'Iniciar Sessão com Facebook',
  'elements.buttons.google.text': 'Iniciar Sessão com Google',
  'elements.buttons.github.text': 'Iniciar Sessão com GitHub',
  'elements.buttons.microsoft.text': 'Iniciar Sessão com Microsoft',
  'elements.buttons.linkedin.text': 'Iniciar Sessão com LinkedIn',
  'elements.buttons.ethereum.text': 'Iniciar Sessão com Ethereum',
  'elements.buttons.smsotp.text': 'Iniciar Sessão com SMS',
  'elements.buttons.multi.option.text': 'Iniciar Sessão com {connection}',
  'elements.buttons.social.text': 'Iniciar Sessão com {connection}',

  /* Fields */
  'elements.fields.generic.placeholder': 'Introduza o seu {field}',
  'elements.fields.username.label': 'Nome de utilizador',
  'elements.fields.password.label': 'Palavra-passe',
  'elements.fields.organization.name.label': 'Nome da Organização',
  'elements.fields.organization.handle.label': 'Identificador da Organização',
  'elements.fields.organization.description.label': 'Descrição da Organização',

  /* Validation */
  'validations.required.field.error': 'Este campo é obrigatório',

  /* |---------------------------------------------------------------| */
  /* |                        Widgets                                | */
  /* |---------------------------------------------------------------| */

  /* Base Sign In */
  'signin.heading': 'Iniciar Sessão',
  'signin.subheading': 'Introduza as suas credenciais para continuar.',

  /* Base Sign Up */
  'signup.heading': 'Registar-se',
  'signup.subheading': 'Crie uma nova conta para começar.',

  /* Email OTP */
  'email.otp.heading': 'Verificação OTP',
  'email.otp.subheading': 'Introduza o código enviado para o seu e-mail.',
  'email.otp.submit.button.text': 'Continuar',

  /* Identifier First */
  'identifier.first.heading': 'Iniciar Sessão',
  'identifier.first.subheading': 'Introduza o seu utilizador ou e-mail.',
  'identifier.first.submit.button.text': 'Continuar',

  /* SMS OTP */
  'sms.otp.heading': 'Verificação OTP',
  'sms.otp.subheading': 'Introduza o código enviado para o seu telemóvel.',
  'sms.otp.submit.button.text': 'Continuar',

  /* TOTP */
  'totp.heading': 'Verifique a sua identidade',
  'totp.subheading': 'Introduza o código da sua aplicação autenticadora.',
  'totp.submit.button.text': 'Continuar',

  /* Username Password */
  'username.password.submit.button.text': 'Continuar',
  'username.password.heading': 'Iniciar Sessão',
  'username.password.subheading': 'Introduza o seu utilizador e palavra-passe para continuar.',

  /* |---------------------------------------------------------------| */
  /* |                          User Profile                         | */
  /* |---------------------------------------------------------------| */

  'user.profile.heading': 'Perfil',
  'user.profile.update.generic.error': 'Ocorreu um erro ao actualizar o seu perfil. Tente novamente.',

  /* |---------------------------------------------------------------| */
  /* |                     Organization Switcher                     | */
  /* |---------------------------------------------------------------| */

  'elements.fields.organization.select.label': 'Escolher Organização',
  'organization.switcher.switch.organization': 'Trocar Organização',
  'organization.switcher.loading.placeholder.organizations': 'A carregar organizações...',
  'organization.switcher.members': 'membros',
  'organization.switcher.member': 'membro',
  'organization.switcher.create.organization': 'Criar Organização',
  'organization.switcher.manage.organizations': 'Gerir Organizações',
  'organization.switcher.manage.button.text': 'Gerir',
  'organization.switcher.organizations.heading': 'Organizações',
  'organization.switcher.switch.button.text': 'Trocar',
  'organization.switcher.no.access': 'Sem Acesso',
  'organization.switcher.status.label': 'Estado:',
  'organization.switcher.showing.count': 'A mostrar {showing} de {total} organizações',
  'organization.switcher.refresh.button.text': 'Actualizar',
  'organization.switcher.load_more.button.text': 'Carregar Mais Organizações',
  'organization.switcher.loading.more': 'A carregar...',
  'organization.switcher.no.organizations': 'Nenhuma organização encontrada',
  'organization.switcher.error.prefix': 'Erro:',
  'organization.profile.heading': 'Perfil da Organização',
  'organization.profile.loading': 'A carregar organização...',
  'organization.profile.error': 'Falha ao carregar organização',

  'organization.create.heading': 'Criar Organização',
  'organization.create.button.text': 'Criar Organização',
  'organization.create.button.loading.text': 'A criar...',
  'organization.create.cancel.button.text': 'Cancelar',

  /* |---------------------------------------------------------------| */
  /* |                        Messages                               | */
  /* |---------------------------------------------------------------| */

  'messages.loading.placeholder': 'A carregar...',

  /* |---------------------------------------------------------------| */
  /* |                        Errors                                 | */
  /* |---------------------------------------------------------------| */

  'errors.heading': 'Erro',
  'errors.signin.initialization': 'Ocorreu um erro ao inicializar. Tente novamente mais tarde.',
  'errors.signin.flow.failure': 'Ocorreu um erro durante o início de sessão. Tente novamente mais tarde.',
  'errors.signin.flow.completion.failure':
    'Ocorreu um erro ao completar o início de sessão. Tente novamente mais tarde.',
  'errors.signin.flow.passkeys.failure':
    'Ocorreu um erro ao iniciar sessão com as chaves de acesso (passkeys). Tente novamente mais tarde.',
  'errors.signin.flow.passkeys.completion.failure':
    'Ocorreu um erro ao completar o início de sessão com as chaves de acesso (passkeys). Tente novamente mais tarde.',
  'errors.signup.initialization': 'Ocorreu um erro durante a inicialização. Tente novamente mais tarde.',
  'errors.signup.flow.failure': 'Ocorreu um erro durante o fluxo de registo. Tente novamente mais tarde.',
  'errors.signup.flow.initialization.failure':
    'Ocorreu um erro ao inicializar o fluxo de registo. Tente novamente mais tarde.',
  'errors.signup.components.not.available':
    'O formulário de registo não está disponível de momento. Tente novamente mais tarde.',
  'errors.signin.components.not.available':
    'O formulário de início de sessão não está disponível de momento. Tente novamente mais tarde.',
};

const metadata: I18nMetadata = {
  localeCode: 'pt-PT',
  countryCode: 'PT',
  languageCode: 'pt',
  displayName: 'Português (Portugal)',
  direction: 'ltr',
};

const pt_PT: I18nBundle = {
  metadata,
  translations,
};

export default pt_PT;
