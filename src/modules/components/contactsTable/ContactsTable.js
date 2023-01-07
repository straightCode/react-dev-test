import React, {useCallback, useMemo} from 'react';
import {Table} from "react-bootstrap";
import {Scrollbars} from "react-custom-scrollbars";
import Preloader from "../preloader/Preloader";

const ContactsTable = ({data, onScrollEnd, isLoading, filterEven, openCurrentContactModal}) => {
  const filteredData = useMemo(() => {
    if(!data) return [];
    if(filterEven){
      return data.filter(contact => contact.id % 2 === 0);
    }
    return data;
  },[data, filterEven])

  const handleScroll = useCallback((e) => {
    if(!isLoading && !!data.length && e.top === 1){
      onScrollEnd();
    }
  },[data, onScrollEnd, isLoading]);

  return (
    <Scrollbars onScrollFrame={handleScroll} style={{ width: 466, height: 300 }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
        {!!filteredData.length && filteredData.map(contact => (
          <tr onClick={openCurrentContactModal(contact.id)} key={contact.id}>
            <td>{contact.id}</td>
            <td>{contact.first_name + ' ' + contact.last_name}</td>
            <td>{contact.country.iso}</td>
            <td>{contact.full_phone_number}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      {isLoading && <Preloader/>}
    </Scrollbars>
  );
};

export default ContactsTable;