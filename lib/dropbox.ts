import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';

const config = {
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  clientId: process.env.DROPBOX_APP_KEY,
  clientSecret: process.env.DROPBOX_APP_SECRET,
  fetch
};

const dropbox = new Dropbox(config);

export default dropbox;
