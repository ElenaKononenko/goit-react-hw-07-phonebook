import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../redux/action';
import s from './Filter.module.css';

class Filter extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label>
          Find contacts by name
          <input
            className={s.filterInput}
            type="text"
            name="filter"
            value={value}
            onChange={onChange}
          />
        </label>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(actions.changeFilter(e.currentTarget.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
