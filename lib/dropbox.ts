import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';

const config = {
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch
};

const dropbox = new Dropbox(config);

export default dropbox;
