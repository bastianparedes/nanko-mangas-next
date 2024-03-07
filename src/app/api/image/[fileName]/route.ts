import dropbox from '../../../../../modules/fileSystem';

interface Params {
  params: {
    fileName: string;
  };
}

const GET = async (_request: Request, params: Params) => {
  const file = await dropbox.filesDownload({
    path: '/images/' + params.params.fileName
  });

  const response = new Response((file.result as any).fileBinary);
  return response;
};

export { GET };
