import dropbox from '../../../../modules/dropbox';

const GET = async (request: Request) => {
  /* console.log(
    `https://www.dropbox.com/oauth2/authorize?token_access_type=offline&response_type=code&client_id=${process.env.DROPBOX_APP_KEY}`
  );

  console.log(
    `curl https://api.dropbox.com/oauth2/token -d code=${process.env.DROPBOX_CODE} -d grant_type=authorization_code -u ${process.env.DROPBOX_APP_KEY}:${process.env.DROPBOX_APP_SECRET}`
  ); */

  /* console.log(
    `curl https://api.dropbox.com/oauth2/token -d grant_type=refresh_token -d refresh_token=${process.env.DROPBOX_REFRESH_TOKEN} -d client_id=${process.env.DROPBOX_APP_KEY} -d client_secret=${process.env.DROPBOX_APP_SECRET}`
  ); */

  return new Response('HOLA MUNDO');
};

export { GET };
