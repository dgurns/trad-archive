const { createServer } = require('./apolloServer');

const createHandler = async () => {
  const server = await createServer();
  return server.createHandler();
};

exports.graphqlHandler = (event, context, callback) => {
  createHandler().then((handler) => handler(event, context, callback));
};
