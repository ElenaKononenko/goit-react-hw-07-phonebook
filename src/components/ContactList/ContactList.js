import React, { Component } from 'react';
import s from './ContactList.module.css';

class ContactList extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }
  render() {
    const { contacts, onDeleteContact } = this.props;
    return (
      <div>
        <ul className={s.contactList}>
          {contacts.map(({ id, name, number }) => (
            <li key={id} className={s.contactListItem}>
              {name}: {number}
              <button onClick={() => onDeleteContact(id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default ContactList;
