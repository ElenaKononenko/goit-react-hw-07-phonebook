import axios from 'axios';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
} from './action';
axios.defaults.baseURL = `http://localhost:4040`;

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());
  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error));
  }
};

const addContact = text => dispatch => {
  const contact = { name: text.name, number: text.number };
  dispatch(addContactRequest());
  axios
    .post('/contacts', contact)
    .then(({ data }) => {
      console.log(data);
      return dispatch(addContactSuccess(data));
    })
    .catch(error => dispatch(addContactError(error)));
};

const deleteContact = contactId => dispatch => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(deleteContactSuccess(contactId)))
    .catch(error => dispatch(deleteContactError(error)));
};

// eslint-disable-next-line
export default { fetchContacts, addContact, deleteContact };
