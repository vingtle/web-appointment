require("dotenv").config(); // Load .env variables

const credentials = {
  google: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: process.env.REDIRECT_URIS.split(","),
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
    javascript_origins: process.env.ORIGINS.split(","),
  },
  appSecret: process.env.APP_SECRET,
};

module.exports = credentials;
