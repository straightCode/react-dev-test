import React, {useCallback, useState} from 'react';
import {Button} from "react-bootstrap";
import {useRouter} from "../../hooks/useRouter";
import {stringify} from "query-string";
import {clearContactsListReducer} from "../../store/contacts";
import {useDispatch} from "react-redux";
import ContactsModal from "../../modals/contactsModal/ContactsModal";
import CurrentContactModal from "../../modals/currentContactModal/CurrentContactModal";

const INIT_MODALS = {contactsList: false, currentContact: false};

const MainPage = () => {
  const dispatch = useDispatch();
  const {history} = useRouter();

  const [modals, setModals] = useState(INIT_MODALS);
  const [currentContactId, setCurrentContactId] = useState(null);

  const openContactsModal = useCallback((mode) => () => {
    dispatch(clearContactsListReducer());
    // starting from page 3 because the previous ones have duplicate IDs
    let params = {page: '3'};
    if(mode === 'A'){
        params.countryId = '226';
    }
    history.push('/contacts?' + stringify(params));
    setModals(prevState => ({...prevState, contactsList: true}));
  },[dispatch, history]);

  const closeContactsModal = useCallback(() => {
    setModals(prevState => ({...prevState, contactsList: false}));
    history.push('/');
  },[setModals, history]);

  const handleCurrentContactModal = useCallback((contactId) => () => {
    closeContactsModal();
    setModals(prevState => ({...prevState, currentContact: !!contactId}));
    setCurrentContactId(contactId);
  },[closeContactsModal]);

  return (
    <div className='content'>
      <div className="row">
        <Button className='modal_btn_A mr-2' onClick={openContactsModal('A')}>button A</Button>
        <Button className='modal_btn_B' onClick={openContactsModal('B')}>button B</Button>
      </div>
      <ContactsModal
        show={modals.contactsList}
        onHide={closeContactsModal}
        openContactsModal={openContactsModal}
        openCurrentContactModal={handleCurrentContactModal}
      />
      <CurrentContactModal
        show={modals.currentContact}
        contactId={currentContactId}
        onHide={handleCurrentContactModal}
      />
    </div>
  );
};

export default MainPage;