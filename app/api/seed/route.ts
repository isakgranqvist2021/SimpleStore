import fs from 'fs';
import models from 'models/models';

export async function GET(request: Request) {
  const data = fs.readFileSync('data.json');
  const parsedData = JSON.parse(data.toString());

  const res = await models.product.insertMany(parsedData);
  console.log(res);

  return new Response('OK');
}
