import React from "react";

import "./modal.scss";

const Modal = ({ handleClose, show, children }) => {    
  
    return (
      <div className={`modal display-${show ? 'block' : 'none'}`}>
        <section className="modal-main">
          {children}          
        </section>
      </div>
    );
  };

export default Modal;
