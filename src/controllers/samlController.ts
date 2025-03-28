import { Request, Response } from 'express';
import { sp, idp } from '../config/samlConfig';
import logger from '../config/logger';

export const acs = (req: Request, res: Response) => {
  const options = { request_body: req.body };

  console.log('Sending SAML assertion to IdP with options:', options);

  sp.post_assert(idp, options, (err, saml_response) => {
    if (err) {
      logger.error(`Error processing SAML response: ${err.message}`);
      return res.status(500).send("Error processing SAML response");
    }
    // Log the full SAML response for info
    logger.info(`SAML response: ${JSON.stringify(saml_response)}`);

    const attributes = saml_response?.user?.attributes;
    if (attributes) {
      logger.info(`User authenticated: ${attributes.mail}`);
      logger.info(`Group: ${attributes.groups}`);
      logger.info(`Display Name: ${attributes.displayName}`);
      const groups = attributes.groups || "Group attribute not defined";
      res.json({
        mail: attributes.mail,
        groups,
        displayName: attributes.displayName
      });
    } else {
      logger.error("Error processing SAML response: attributes are undefined");
      res.status(500).send("Error processing SAML response: attributes are undefined");
    }
  });
};

export const metadata = (req: Request, res: Response) => {
  res.type('application/xml');
  res.send(sp.create_metadata());
};

export const login = (req: Request, res: Response) => {
  console.log('Creating SAML login request URL');

  sp.create_login_request_url(idp, {}, (err, login_url) => {
    if (err) {
      logger.error(`Error creating SAML login request: ${err.message}`);
      return res.status(500).send("Error creating SAML login request");
    }
    logger.info(`Redirecting to IdP login URL: ${login_url}`);
    console.log(`Redirecting to IdP login URL: ${login_url}`);
    res.redirect(login_url);
  });
};

export const logout = (req: Request, res: Response) => {
  console.log('Creating SAML logout request URL');

  sp.create_logout_request_url(idp, {}, (err, logout_url) => {
    if (err) {
      logger.error(`Error creating SAML logout request: ${err.message}`);
      return res.status(500).send("Error creating SAML logout request");
    }
    logger.info(`Redirecting to IdP logout URL: ${logout_url}`);
    console.log(`Redirecting to IdP logout URL: ${logout_url}`);
    res.redirect(logout_url);
  });
};