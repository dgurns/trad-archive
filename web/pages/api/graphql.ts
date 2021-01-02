import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { createServer } from 'api/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const server = await createServer();
  const handler = server.createHandler({ path: '/api/graphql' });
  return handler(req, res);
};
