import React, {useState} from 'react'
import { FaUser } from 'react-icons/fa'
import {useMutation} from "@apollo/client"
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/ClientQueries'

export default function AddClientModal() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name, email, phone},
        update(cache, {data: {addClient}}){
            const { clients } = cache.readQuery({query: GET_CLIENTS})
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: [...clients, addClient]
                },
            })
        }
    })

    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    }
    function handleEmailChange(e){
        e.preventDefault();
        setEmail(e.target.value)
    }
    function handlePhoneChange(e){
        e.preventDefault();
        setPhone(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        if(name ==='' || email==="" || phone===""){
            return alert("Please ensure all fields are filled!!")
        }
        addClient(name, email, phone)
        setName("")
        setEmail("")
        setPhone("")
        // console.log(name, email, phone)
    }
  return (
    <>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  <div className="d-flex align-items-center">
    <FaUser className='icon'/>
    <span>Add Client</span>
  </div>
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Client</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div className="modal-body">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" id='name' value={name} onChange={handleNameChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" id='email' value={email} onChange={handleEmailChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-control" id='phone' value={phone} onChange={handlePhoneChange}/>
            </div>
            <div className='modal-footer'>
        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
        </div>
        </form>
      </div>

      {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div> */}
    </div>
  </div>
</div>
    </>
  )
}
