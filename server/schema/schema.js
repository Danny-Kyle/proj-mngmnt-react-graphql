const Project = require("../models/Project")
const Client = require("../models/Client")

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLBoolean, GraphQLNonNull } = require ('graphql')

//Client Type DEfinition
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
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
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientID);
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
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Project.findById(args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Client.findById(args.id);
            }
        }
    }
})

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //to add a client to the database
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                // getting the properties of the mutation from the arguments created above
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                // returning variable above and saving it
                return client.save();
                //easier to do this than to pass in the fields through the create method Client.create("fields").save
            }
        },
        //to delete a client from the database
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Client.findByIdAndDelete(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})