import React, { useEffect, useState } from 'react'
import './Contact'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL,  } from './utils/endpoint';


export default function EditContact() {
    const [contact, setContact] = useState()
    const [loading, setLoading] = useState(false)
    let navigator = useNavigate()
    const { contactId } = useParams()

    useEffect(() => {
        async function getContact() {
            const res = await axios.get(API_URL + `/${contactId}`)
            setContact(res.data)
        }
        getContact()
    }, [contactId])


    async function handleUpdateContact() {
        try {
            var res = await axios.put(API_URL, contact)
            setContact(res.data)
            setLoading(true)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleDeleteContact(contactId) {
        try {
            await axios.delete(API_URL + `/${contactId}`)
            navigator("/")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className='d-flex justify-content-end mb-2'>
                <Link to={"/"} className='btn btn-dark'><i className="bi bi-arrow-left me-2"></i>Back</Link>
            </div>
          
            {contact &&
                <div className='row mt-5'>
                    <div className='col-4'>
                        <div className="card " >
                            <div className="card-header">Contact Information</div>
                            <div className="card-body">
                                <h4 className="card-title"> {contact.name}</h4>
                                <p className="card-text"><i className="bi bi-sliders me-2"></i> {contact.title}</p>
                                <p className="card-text"><i className="bi bi-envelope-fill me-2"></i>{contact.email}</p>
                                <p className="card-text"><i className="bi bi-telephone-fill me-2"></i> {contact.phone}</p>
                                <p className="card-text"><i className="bi bi-house-door-fill me-2"></i> {contact.address}</p>
                                {(contact.active === true)
                                    ? <span className='badge bg-success'>Active</span>
                                    : <span className='badge bg-danger'>InActive</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='card px-3 py-4'>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control" onChange={e => setContact({ ...contact, name: e.target.value })} value={contact.name} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Job Title</label>
                                    <input type="text" className="form-control" onChange={e => setContact({ ...contact, title: e.target.value })} value={contact.title} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-control" onChange={e => setContact({ ...contact, email: e.target.value })} value={contact.email} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text" className="form-control" onChange={e => setContact({ ...contact, phone: e.target.value })} value={contact.phone} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <textarea className="form-control" onChange={e => setContact({ ...contact, address: e.target.value })} value={contact.address} rows="3"></textarea>

                                </div>
                                <fieldset>
                                    <legend className="mt-4">Active Status</legend>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" checked={contact.active == true ? "on" : "off"}
                                            onChange={e => setContact({ ...contact, active: e.target.value })} />
                                        <label className="form-check-label"></label>
                                    </div>
                                </fieldset>

                                <div className="mt-1 py-2 ">
                                    <button type="button" onClick={() => handleUpdateContact()} className="btn btn-primary mx-1">Update Contact</button>
                                    <button type="button" onClick={() => handleDeleteContact(contact.id)} className="btn btn-danger mx-1"><i className="bi bi-trash me-2"></i>Delete Contact</button>
                                </div>

                            </form>
                        </div>
                    </div >



                </div >
            }

            {loading == true ?
                <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">ContaMate</strong>
                        <button type="button" onClick={() => setLoading(false)} className="btn-close ms-2 mb-1" data-bs-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="toast-body">
                        Contact updated successfully
                    </div>
                </div>
                : ""
            }
        </>
    )
}
