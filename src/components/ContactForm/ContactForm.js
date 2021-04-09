import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import operations from '../../redux/operations';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit, value } = this.props;
    const uniqueContact = value.find(
      item => item.name.toLowerCase() === this.state.name.toLocaleLowerCase(),
    );
    if (!uniqueContact) {
      onSubmit(this.state);
      this.reset();
      return;
    }
    alert(`${this.state.name} is already in contacts`);
    // this.reset();
  };

  render() {
    const { name, number } = this.state;
    const { handleInputChange, handleSubmit } = this;
    return (
      <>
        {this.props.isLoading && <h1>Загружаем...</h1>}
        <form className={s.ContactForm} action="" onSubmit={handleSubmit}>
          <p>111-22-33</p>
          <label className={s.formLabel} name="name" htmlFor="">
            Name
            <input
              className={s.formInput}
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              required
              onChange={handleInputChange}
            />
          </label>
          <label className={s.formLabel} name="number" htmlFor="">
            Number
            <input
              className={s.formInput}
              name="number"
              type="tel"
              placeholder="000-00-00"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
              required
              value={number}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  value: state.contacts.items,
  isLoading: state.contacts.loading,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: obj => dispatch(operations.addContact(obj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
