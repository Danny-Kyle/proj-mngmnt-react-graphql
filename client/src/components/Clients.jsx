import {gql, useQuery} from "@apollo/client"

const GET_CLIENTS = gql`
    query getClients {
        clients{
            id
            name
            email
            phone
        }
    }
`

export default function Clients() {
    const {loading, error, data} = useQuery(GET_CLIENTS);

    if(loading) return <div>Loading .......................</div>
    if(error) return <div>Something went wrong!..</div>
  return (
    <>
    {!loading && !error && (
        <h2>Clients</h2>
    )}
    </>
  )
}
