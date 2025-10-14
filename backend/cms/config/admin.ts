import crypto from 'crypto';

export default ({ env }) => ({
  auth: {
    secret: crypto.randomBytes(16).toString('base64'),
  },
  apiToken: {
    salt: 'API_TOKEN_SALT',
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
