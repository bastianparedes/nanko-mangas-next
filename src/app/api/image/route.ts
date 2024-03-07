import dropbox from '../../../../modules/fileSystem';

const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('fileName');

  const file = await dropbox.filesDownload({
    path: '/images/' + fileName
  });

  const response = new Response((file.result as any).fileBinary);
  return response;
};

export { GET };
