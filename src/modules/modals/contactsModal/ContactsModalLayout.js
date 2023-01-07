import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const ContactsModalLayout = ({children, modalType, filterEven, handleFilterEven, isLoading, onHide, openContactsModal}) => {
  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalType} Contacts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer className='d-flex'>
        {!!handleFilterEven &&
          <Form.Check
            disabled={isLoading}
            checked={filterEven}
            onChange={handleFilterEven}
            className='mr-auto'
            type='checkbox'
            id='even'
            label='Only even'
          />
        }
        <Button className='modal_btn_A' disabled={modalType === 'US'} onClick={openContactsModal('A')}>US Contacts</Button>
        <Button className='modal_btn_B' disabled={modalType === 'All'} onClick={openContactsModal('B')}>All Contacts</Button>
        <Button className='modal_btn_close' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </>
  );
};

export default ContactsModalLayout;