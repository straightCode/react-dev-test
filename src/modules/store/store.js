import { configureStore } from '@reduxjs/toolkit'
import contactsSlice from "./contacts";

export default configureStore({
  reducer: {
    contacts: contactsSlice,
  },
})