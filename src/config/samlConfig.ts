import * as saml from 'saml2-js';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const sp_options = {
  entity_id: process.env.ENTITY_ID,
  private_key: fs.readFileSync(process.env.SP_PRIVATE_KEY_PATH || '').toString(),
  certificate: fs.readFileSync(process.env.SP_CERTIFICATE_PATH ?? '').toString(),
  assert_endpoint: process.env.ASSERT_ENDPOINT,
  allow_unencrypted_assertion: true, // Allow unencrypted assertions
};

const idp_options = {
  sso_login_url: process.env.IDP_SSO_LOGIN_URL || '',
  sso_logout_url: process.env.IDP_SSO_LOGOUT_URL ?? '',
  certificates: [fs.readFileSync(process.env.IDP_CERTIFICATE_PATH ?? '').toString()],
  sign_get_request: false, // Ensure this is set to false if your IdP does not require signed requests
};

export const sp = new saml.ServiceProvider(sp_options as saml.ServiceProviderOptions);
export const idp = new saml.IdentityProvider(idp_options);