require("dotenv").config();
const { AppoloServer, ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { connect, client } = require("./db");

const PORT = process.env.PORT || 4000;

async function start() {
  const db = await connect();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({ db }),
  });

  const { url } = await server.listen({ port: PORT });
  console.log(`GraphQL server ready at ${url}`);

  const shut = async () => {
    await server.stop();
    await client.close();
    process.exit(0);
  };
  process.on("SIGINT", shut);
  process.on("SIGTERM", shut);
}

start().catch((err) => {
  console.error("Failed to start server : ", err);
  process.exit(1);
});
