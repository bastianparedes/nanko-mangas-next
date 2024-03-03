import sendMail from '../../../../lib/mail';

const POST = async (request: Request) => {
  try {
    const { message } = await request.json();
    sendMail(message);
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false });
  }
};

export { POST };
