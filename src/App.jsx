import { useEffect, useState } from 'react';
import './App.css';
import { faker } from '@faker-js/faker';
import { Contact } from './Contact';
import { API_URL, } from './utils/endpoint';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    address: '',
    phone: '',
    title: '',
    email: ''
  });
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  useEffect(() => {
    getContacts()
  }, []);

  async function getContacts(pageNumber = 0) {
    try {
      const res = await axios.get(API_URL + `?pageNumber=${pageNumber}`)
      setContacts(res.data.content)
      setCurrentPage(res.data.page.number)
      setTotalPages(res.data.page.totalPages)
      setTotalElements(res.data.page.totalElements)
    } catch (error) {
      console.error(error)
    }
  }


  async function handleAddContact() {
    try {
      await axios.post(API_URL, newContact)
    } catch (err) {
      console.error(err);
    } finally {
      getContacts()
      const closeBtn = document.getElementById("closeBtn")
      closeBtn.click()
      setNewContact({})
    }
  }



  return (
    <>
      <div className='d-flex justify-content-between px-8 m-4'>
        <h4 className='underline'>Contact List ({totalElements})</h4>
        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i className="bi bi-plus"></i>
          Add Contact
        </button>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Contact Information</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" onChange={e => setNewContact({ ...newContact, name: e.target.value })} placeholder="Forename Surname" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input type="email" className="form-control" onChange={e => setNewContact({ ...newContact, email: e.target.value })} placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="text" className="form-control" onChange={e => setNewContact({ ...newContact, phone: e.target.value })} placeholder="+263770781895" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Job Title</label>
                  <input type="text" className="form-control" onChange={e => setNewContact({ ...newContact, title: e.target.value })} placeholder="Football Player" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" onChange={e => setNewContact({ ...newContact, address: e.target.value })} rows="2"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" id="closeBtn" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={() => handleAddContact()} className="btn btn-primary">Save Contact</button>
            </div>
          </div>
        </div>
      </div>
      <ul className='d-flex items-center justify-content-start mx-auto flex-wrap gap-3'>
        {contacts.map((contact, index) => (
          <Contact key={index} contact={contact} />
        ))}
      </ul>

      {contacts.length == 0 ?
        <div className='d-flex gap-4 justify-content-center'>
          <img src='/no_data.svg' width={200} />
        </div>
        : ""}

      {totalPages > 1 ?
        <div className='d-flex items-center justify-content-start mx-auto'>
          <ul className="pagination pagination-sm">
            <li className="page-item">
              <button onClick={() => getContacts(currentPage - 1)} disabled={currentPage == 0} className="page-link">&laquo; Previous</button>
            </li>
            {[...Array(totalPages).keys().map((k) => (
              <li key={k} className="page-item active">
                <button onClick={() => getContacts(k)} className="page-link" >{k + 1}</button>
              </li>
            ))]}
            <li className="page-item">
              <button onClick={() => getContacts(currentPage + 1)} disabled={currentPage + 1 == totalPages} className="page-link">Next &raquo;</button>
            </li>
          </ul>
        </div>
        : ""}

    </>
  );
}

export default App;