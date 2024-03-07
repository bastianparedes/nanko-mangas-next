import dropbox from '../../../../../modules/fileSystem';
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

    const sharedLink = (
      await dropbox.sharingCreateSharedLinkWithSettings({
        path: path.join('/images', file.name)
      })
    ).result.url;
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 404 });
  }

  return Response.json({ success: true });
};

export { POST };
