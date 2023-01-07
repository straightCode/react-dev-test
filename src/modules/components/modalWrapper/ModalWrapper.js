import React from 'react';
import {Modal} from "react-bootstrap";

const ModalWrapper = ({modals, children, title, handleModalA, handleModalB, filterEven, handleFilterEven, isLoading, ...restProps}) => {
  return (
    <Modal
      {...restProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;