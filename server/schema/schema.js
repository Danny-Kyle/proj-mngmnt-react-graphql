const {projects, clients} = require ('../SampleData.js');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLSchema } = require ('graphql')

//Client Type DEfinition
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLFloat}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return clients.find(client => client.id === args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})