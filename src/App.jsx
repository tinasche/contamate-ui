import { useEffect, useState } from 'react';
import './App.css';
import { faker } from '@faker-js/faker';
import { Contact } from './Contact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    address: '',
    phone: '',
    title: '',
    email: ''
  });

  useEffect(() => {
    generateContacts(13);
  }, []);

  function generateContacts(count) {
    const fakeContacts = Array.from({ length: count }, () => ({
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.person.fullName(),
      address: faker.location.streetAddress(false),
      phone: faker.phone.number({ style: 'international' }),
      title: faker.person.jobTitle(),
      active: faker.datatype.boolean(),
      email: faker.internet.exampleEmail()
    }));
    setContacts(fakeContacts);
  }


  function handleAddContact() {
    console.log('button clicked')
    console.table(newContact)
  }

  return (
    <>
      <div className='d-flex justify-content-between px-8 m-4'>
        <h4 className='underline'>Contact List ({contacts.length})</h4>
        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i className="bi bi-plus"></i>
          Add Contact
        </button>
      </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Contact Information</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label  className="form-label">Full Name</label>
                    <input type="text" className="form-control" onChange={e => setNewContact({...newContact, name: e.target.value })} placeholder="Forename Surname" />
                  </div>
                  <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={e => setNewContact({...newContact, email: e.target.value })} placeholder="name@example.com" />
                  </div>
                  <div className="mb-3">
                    <label  className="form-label">Phone Number</label>
                    <input type="text" className="form-control" onChange={e => setNewContact({...newContact, phone: e.target.value })} placeholder="+263770781895" />
                  </div>
                  <div className="mb-3">
                    <label  className="form-label">Job Title</label>
                    <input type="text" className="form-control" onChange={e => setNewContact({...newContact, title: e.target.value })} placeholder="Football Player" />
                  </div>
                  <div className="mb-3">
                    <label  className="form-label">Address</label>
                    <textarea className="form-control" onChange={e => setNewContact({...newContact, address: e.target.value })} rows="3"></textarea>
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={() => handleAddContact()}  className="btn btn-primary">Save Contact</button>
              </div>
            </div>
          </div>
        </div>
      <ul className='d-flex items-center justify-content-center mx-auto flex-wrap gap-3'>
        {contacts.map((contact, index) => (
          <Contact key={index} contact={contact} />
        ))}
      </ul>
    </>
  );
}

export default App;