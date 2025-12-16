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
  'elements.buttons.signin.text': 'Entrar',
  'elements.buttons.signout.text': 'Sair',
  'elements.buttons.signup.text': 'Cadastre-se',
  'elements.buttons.facebook.text': 'Entrar com Facebook',
  'elements.buttons.google.text': 'Entrar com Google',
  'elements.buttons.github.text': 'Entrar com GitHub',
  'elements.buttons.microsoft.text': 'Entrar com Microsoft',
  'elements.buttons.linkedin.text': 'Entrar com LinkedIn',
  'elements.buttons.ethereum.text': 'Entrar com Ethereum',
  'elements.buttons.smsotp.text': 'Entrar com SMS',
  'elements.buttons.multi.option.text': 'Entrar com {connection}',
  'elements.buttons.social.text': 'Entrar com {connection}',

  /* Fields */
  'elements.fields.generic.placeholder': 'Digite seu {field}',
  'elements.fields.username.label': 'Nome de usuário',
  'elements.fields.password.label': 'Senha',
  'elements.fields.organization.name.label': 'Nome da Organização',
  'elements.fields.organization.handle.label': 'Identificador da Organização',
  'elements.fields.organization.description.label': 'Descrição da Organização',

  /* Validation */
  'validations.required.field.error': 'Este campo é obrigatório',

  /* |---------------------------------------------------------------| */
  /* |                        Widgets                                | */
  /* |---------------------------------------------------------------| */

  /* Base Sign In */
  'signin.heading': 'Entrar',
  'signin.subheading': 'Digite suas credencias para continuar.',

  /* Base Sign Up */
  'signup.heading': 'Cadastra-se',
  'signup.subheading': 'Crie uma nova conta para iniciar.',

  /* Email OTP */
  'email.otp.heading': 'Verificação OTP',
  'email.otp.subheading': 'Digite o código enviado para seu e-mail.',
  'email.otp.submit.button.text': 'Continue',

  /* Identifier First */
  'identifier.first.heading': 'Entrar',
  'identifier.first.subheading': 'Digite seu usuário ou e-mail.',
  'identifier.first.submit.button.text': 'Continue',

  /* SMS OTP */
  'sms.otp.heading': 'Verificação OTP',
  'sms.otp.subheading': 'Digite o código enviado para seu telefone.',
  'sms.otp.submit.button.text': 'Continue',

  /* TOTP */
  'totp.heading': 'Verifique sua identidade',
  'totp.subheading': 'Digite o código do seu aplicativo autenticador.',
  'totp.submit.button.text': 'Continue',

  /* Username Password */
  'username.password.submit.button.text': 'Continue',
  'username.password.heading': 'Entrar',
  'username.password.subheading': 'Digite seu usuário e senha para continuar.',

  /* |---------------------------------------------------------------| */
  /* |                          User Profile                         | */
  /* |---------------------------------------------------------------| */

  'user.profile.heading': 'Perfil',
  'user.profile.update.generic.error': 'Ocorreu um erro ao atualizar seu perfil. Tente novamente.',

  /* |---------------------------------------------------------------| */
  /* |                     Organization Switcher                     | */
  /* |---------------------------------------------------------------| */

  'elements.fields.organization.select.label': 'Escolher Organização',
  'organization.switcher.switch.organization': 'Trocar Organização',
  'organization.switcher.loading.placeholder.organizations': 'Carregando organizações...',
  'organization.switcher.members': 'membros',
  'organization.switcher.member': 'membro',
  'organization.switcher.create.organization': 'Criar Organização',
  'organization.switcher.manage.organizations': 'Gerenciar Organizações',
  'organization.switcher.manage.button.text': 'Gerenciar',
  'organization.switcher.organizations.heading': 'Organizações',
  'organization.switcher.switch.button.text': 'Trocar',
  'organization.switcher.no.access': 'Sem Acesso',
  'organization.switcher.status.label': 'Situação:',
  'organization.switcher.showing.count': 'Exibindo {showing} de {total} organizações',
  'organization.switcher.refresh.button.text': 'Atualizar',
  'organization.switcher.load_more.button.text': 'Carregar Mais Organizações',
  'organization.switcher.loading.more': 'Carregando...',
  'organization.switcher.no.organizations': 'Nenhuma organização encontrada',
  'organization.switcher.error.prefix': 'Erro:',
  'organization.profile.heading': 'Perfil da Organização',
  'organization.profile.loading': 'Carregando organização...',
  'organization.profile.error': 'Falha ao carregar organização',

  'organization.create.heading': 'Criar Organização',
  'organization.create.button.text': 'Criar Organização',
  'organization.create.button.loading.text': 'Criando...',
  'organization.create.cancel.button.text': 'Cancelar',

  /* |---------------------------------------------------------------| */
  /* |                        Messages                               | */
  /* |---------------------------------------------------------------| */

  'messages.loading.placeholder': 'Carregando...',

  /* |---------------------------------------------------------------| */
  /* |                        Errors                                 | */
  /* |---------------------------------------------------------------| */

  'errors.heading': 'Erro',
  'errors.signin.initialization': 'Ocorreu um erro ao inicializar. Tente novamente mais tarde.',
  'errors.signin.flow.failure': 'Ocorreu um erro durante o login. Tente novamente mais tarde.',
  'errors.signin.flow.completion.failure': 'Ocorreu um erro ao completar o login. Tente novamente mais tarde.',
  'errors.signin.flow.passkeys.failure':
    'Ocorreu um erro ao entrar com as chaves de acesso (passkeys). Tente novamente mais tarde.',
  'errors.signin.flow.passkeys.completion.failure':
    'Ocorreu um erro ao completar o login com as chaves de acesso (passkeys). Tente novamente mais tarde.',
  'errors.signup.initialization': 'Ocorreu um erro durante a inicialização. Tente novamente mais tarde.',
  'errors.signup.flow.failure': 'Ocorreu um erro durante o fluxo de cadastro. Tente novamente mais tarde.',
  'errors.signup.flow.initialization.failure':
    'Ocorreu um erro ao inicializar o fluxo de cadastro. Tente novamente mais tarde.',
  'errors.signup.components.not.available':
    'O formulário de cadastro não está disponível no momento. Tente novamente mais tarde.',
  'errors.signin.components.not.available':
    'O formulário de login não está disponível no momento. Tente novamente mais tarde.',
};

const metadata: I18nMetadata = {
  localeCode: 'pt-BR',
  countryCode: 'BR',
  languageCode: 'pt',
  displayName: 'Português (Brazil)',
  direction: 'ltr',
};

const pt_BR: I18nBundle = {
  metadata,
  translations,
};

export default pt_BR;
