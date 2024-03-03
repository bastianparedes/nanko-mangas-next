import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';

const config = {
  accessToken: process.env.dropboxAccessToken,
  fetch
};

const dropbox = new Dropbox(config);

export default dropbox;
