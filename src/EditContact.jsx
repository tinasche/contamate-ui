import React from 'react'
import './Contact'
import { Link, useParams } from 'react-router-dom';

export default function EditContact() {
    const params = useParams()
    

    return (
        <>
            <div className='d-flex justify-content-between'>

                <h3>Editing for Contact  ({params.contactId})</h3>
                <Link to={"/"}  className='btn btn-dark'><i className="bi bi-arrow-left me-2"></i>Back</Link>
            </div>
      <div className='row'>
          
          <div className='col'>
          <div className="card cardly" >
            <div className="card-body">
                <h5 className="card-title">Some content</h5>
                <p className="card-text">Some content</p>
                <p className="card-text">Some content</p>
                <p className="card-text">Some content</p>
            </div>
        </div>
          </div>
          <div className='col'>Editing form</div>
      </div>
      </>
  )
}
