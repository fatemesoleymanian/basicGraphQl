import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
//types
import { typeDefs } from "./schema.js";
//resolver functions 
import { resolvers } from "./resolvers.js";

//setup server
const PORT = process.env.PORT || '4000'
const server = new ApolloServer({
    typeDefs,
    resolvers
})
const {url} = await startStandaloneServer(server,{
    listen:{port:PORT}
})

console.log('Server ready at '+url)
