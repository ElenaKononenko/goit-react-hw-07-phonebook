import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import operations from '../../redux/operations';
import ContactList from './ContactList';
import { getVisibleContacts } from '../../redux/selectors';

const mapStateToProps = state => ({
  contacts: getVisibleContacts(state),
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
