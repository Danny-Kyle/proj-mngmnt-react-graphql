import { PiTrashBold } from "react-icons/pi"

export default function ClientRow({client}) {
  return (
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
            <button className="btn btn-danger btn-sm">
                <PiTrashBold />
            </button>
        </td>
    </tr>
  )
}
