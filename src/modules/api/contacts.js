import {ApiCall} from "./api";
import {stringify} from "query-string";

const COMPANY_ID = '171';

export const getContacts = (data) => ApiCall('get', `contacts.json?${stringify({...data, companyId: COMPANY_ID})}`);