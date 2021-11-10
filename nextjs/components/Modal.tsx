import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  }, []);

  return (
    <div className="modal" onClick={closeModal}>
      <p>{modalContent}</p>
      <div className="meter">
        <span className="width:80%;">
          <span className="progress"></span>
        </span>
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalContent: PropTypes.string,
  closeModal: PropTypes.func,
};

Modal.defaultProps = {
  modalContent: "Something went wrong",
  closeModal: () => {},
};

export default Modal;
