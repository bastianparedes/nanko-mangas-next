import { insertImage } from '../../../../../modules/db';

const POST = async (request: Request) => {
  const data = await request.formData();
  const descriptiveName: string = data.get(
    'descriptiveName'
  ) as unknown as string;
  const file: File = data.get('image') as unknown as File;

  const response = await insertImage({
    descriptiveName,
    file
  });

  return Response.json(response);
};

export { POST };
