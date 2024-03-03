import sendMail from '../../../lib/mail';

const POST = (request: Request) => {
  try {
    // const { message } = await req.json();
    // sendMail(message);
    // console.log(message);
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false });
  }
};

export { POST };
