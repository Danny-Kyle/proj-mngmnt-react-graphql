const {projects, clients} = require ('../SampleData.js');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLSchema, GraphQLList, GraphQLBoolean } = require ('graphql')

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

//Project Type DEfinition
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        // clientID: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLBoolean},
        client: {
            type: ClientType,
            resolve(parent, args){
                return clients.find((client) => "C"+client.id === parent.clientID);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return projects
            }
        },
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return projects.find((project) => project.id === args.id)
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return clients
            }
        },
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