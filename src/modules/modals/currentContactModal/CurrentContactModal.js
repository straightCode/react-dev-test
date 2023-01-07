import React, {useMemo} from 'react';
import ModalWrapper from "../../components/modalWrapper/ModalWrapper";
import {Button, Modal, Table} from "react-bootstrap";
import {useSelector} from "react-redux";

const CurrentContactModal = ({show, onHide, contactId}) => {
  const {contacts} = useSelector(state => state.contacts);

  const currentContact = useMemo(() => {
    return contacts[contactId];
  },[contacts, contactId]);

  return (
    <ModalWrapper show={show} onHide={onHide(null)}>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          contact <span style={{color: currentContact?.color}}>#{contactId}</span>
        </Modal.Title>
      </Modal.Header>
      {!!currentContact &&
        <Modal.Body>
          <Table striped bordered hover>
            <tbody>
            <tr>
              <td>Name: </td>
              <td>{`${currentContact.first_name} ${currentContact.last_name}`}</td>
            </tr>
            <tr>
              <td>Address: </td>
              <td>{currentContact.address}</td>
            </tr>
            <tr>
              <td>Country: </td>
              <td>{currentContact.country.iso}</td>
            </tr>
            <tr>
              <td>Duplicate: </td>
              <td>{currentContact.has_duplicate}</td>
            </tr>
            <tr>
              <td>Phone: </td>
              <td>{currentContact.phone_number}</td>
            </tr>
            </tbody>
          </Table>
        </Modal.Body>
      }
      <Modal.Footer className='d-flex'>
        <Button onClick={onHide(null)}>Close</Button>
      </Modal.Footer>
    </ModalWrapper>
  );
};

export default CurrentContactModal;