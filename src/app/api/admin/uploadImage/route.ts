import dropbox from '../../../../../lib/dropbox';
import path from 'path';

const POST = async (request: Request) => {
  const data = await request.formData();
  const file: File | null = data.get('image') as unknown as File;

  if (!file) {
    return Response.json({ success: false }, { status: 404 });
  }

  try {
    await dropbox.filesUpload({
      path: path.join('/images', file.name),
      contents: file
    });
  } catch {
    return Response.json({ success: false }, { status: 404 });
  }

  return Response.json({ success: true });
};

export { POST };