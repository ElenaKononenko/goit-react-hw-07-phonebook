import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import operations from '../../redux/operations';
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

const handleFilter = (allContacts, filter) => {
  const normalizedfilter = filter.toLocaleLowerCase();
  return allContacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedfilter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: handleFilter(items, filter),
});
const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(operations.deleteContact(id)),
  fetchContacts: () => dispatch(operations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
