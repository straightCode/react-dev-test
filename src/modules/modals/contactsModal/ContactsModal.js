import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ModalWrapper from "../../components/modalWrapper/ModalWrapper";
import ContactsModalLayout from "./ContactsModalLayout";
import ContactsTable from "../../components/contactsTable/ContactsTable";
import {useRouter} from "../../hooks/useRouter";
import {useDispatch, useSelector} from "react-redux";
import {parse, stringify} from "query-string";
import {getContactsListReducer} from "../../store/contacts";
import {Form} from "react-bootstrap";
import useDebouncedCallback from "../../hooks/useDebouncedCallback";

const ContactsModal = (
  {
    show,
    onHide,
    openContactsModal,
    openCurrentContactModal
  }
) => {
  const {location, history} = useRouter();
  const dispatch = useDispatch();
  const {contacts, contacts_ids, isLoading} = useSelector(state => state.contacts);

  const contactsList = useMemo(() => {
    if(Object.keys(contacts).length && contacts_ids.length){
      return contacts_ids.map(id => contacts[id]);
    }
  },[contacts_ids, contacts])

  const params = useMemo(() => parse(location.search), [location]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterEven, setFilterEven] = useState(false);

  const onDebouncedSearch = useDebouncedCallback(value => {
    if(!isLoading)
      dispatch(getContactsListReducer({...params, query: value}, true));
  }, 500)

  const onSearchInput = useCallback((e) => {
    setSearchQuery(e.target.value);
    onDebouncedSearch(e.target.value);
  },[setSearchQuery, onDebouncedSearch]);

  const modalType = useMemo(() => {
    return params.countryId === '226' ? 'US' : 'All';
  },[params]);

  const handleFilterEven = useCallback(() => {
    setFilterEven(prevState => !prevState);
  },[])

  const fetchMoreData = useCallback(() => {
    history.push(location.pathname + '?' + stringify({...params, page: +params.page + 1}));
  },[history, location, params]);

  useEffect(() => {
    if(show && params.page){
      dispatch(getContactsListReducer({...params}));
    }
  },[show, dispatch, params])
  return (
    <ModalWrapper show={show} onHide={onHide}>
      <ContactsModalLayout
        modalType={modalType}
        filterEven={filterEven}
        handleFilterEven={handleFilterEven}
        openContactsModal={openContactsModal}
        isLoading={isLoading}
        onHide={onHide}
      >
        <Form.Control
          onChange={onSearchInput}
          value={searchQuery}
          className='mb-3'
          type="text"
          placeholder="search"
        />
        <ContactsTable
          isLoading={isLoading}
          onScrollEnd={fetchMoreData}
          filterEven={filterEven}
          data={contactsList}
          openCurrentContactModal={openCurrentContactModal}
        />
      </ContactsModalLayout>
    </ModalWrapper>
  );
};

export default ContactsModal;