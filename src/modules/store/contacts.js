import { createSlice } from '@reduxjs/toolkit';
import {getContacts} from "../api/contacts";

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    isLoading: false,
    isError: false,
    contacts: {},
    contacts_ids: [],
  },
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload.contacts;
      state.contacts_ids = action.payload.contacts_ids;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const {
  setContacts,
  setIsLoading,
  setIsError,
} = contactsSlice.actions;
export default contactsSlice.reducer;

export const getContactsListReducer = (params, refresh) => async (dispatch, getValues) => {
  try {
    dispatch(setIsLoading(true));
    const response = await getContacts(params);
    const {contacts, contacts_ids} = response;
    if(refresh){
      dispatch(setContacts({contacts, contacts_ids}));
    }else{
      const {contacts: prevContacts, contacts_ids: prevContactsIds} = getValues().contacts;
      dispatch(setContacts({
        contacts: {...prevContacts, ...contacts},
        contacts_ids: [...prevContactsIds, ...contacts_ids],
      }));
    }
    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsError(true));
  }
};

export const clearContactsListReducer = () => async dispatch => {
  dispatch(setContacts({
    contacts: {},
    contacts_ids: [],
  }));
}