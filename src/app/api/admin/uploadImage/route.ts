// import { insertImage } from '../../../../../modules/db';
import sharp from 'sharp';
import fs from 'fs/promises';

const POST = async (request: Request) => {
  const data = await request.formData();
  const descriptiveName: string | null = data.get(
    'descriptiveName'
  ) as unknown as string;
  const file: File = data.get('image') as unknown as File;
  const arrayBuffer = await file.arrayBuffer();

  const newFile = await sharp(arrayBuffer).resize(200, 323).toFile('');
  console.log('AYUDA');
  console.log(newFile);

  return Response.json({});
  /* const response = await insertImage({
    descriptiveName,
    file
  });

  return Response.json(response); */
};

export { POST };
