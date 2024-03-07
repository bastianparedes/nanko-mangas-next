import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';

/* {
  "token_type": "bearer",
  "expires_in": 14399,
  "scope": "account_info.read files.content.read files.content.write files.metadata.read sharing.read sharing.write",
  "uid": "934053664",
  "account_id": "dbid:AADC0UwaUTDCJf96JLOybOfJkJAsthC5Vb8"
} */

const dropbox = new Dropbox({
  /* accessToken: process.env.DROPBOX_ACCESS_TOKEN, */
  clientId: process.env.DROPBOX_APP_KEY,
  clientSecret: process.env.DROPBOX_APP_SECRET,
  fetch,
  refreshToken: process.env.DROPBOX_REFRESH_TOKEN
});

export default dropbox;
