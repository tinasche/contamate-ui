import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css'

export const Contact = ({ contact }) => {
    return (
        <div className="card cardly" >
            <div className="card-body">
                <h5 className="card-title">{ contact.name}</h5>
                <p className="card-text">{contact.address}</p>
                <p className="card-text">{contact.email}</p>
                <p className="card-text">{contact.phone}</p>
                <Link to={`/edit/${contact.id}`} className="btn btn-sm btn-primary">More<i className="bi bi-arrow-right ms-2"></i></Link>
            </div>
        </div>
    );
};
