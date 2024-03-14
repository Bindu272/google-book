import React from 'react';
import './Modal.css'
const Modal = ({ showModal, setShowModal }) => {
  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex={-1} role="dialog"   style={{ display: showModal ? 'block' : 'none', }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <p>Thanks for the recommendation!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
