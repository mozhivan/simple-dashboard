import React from 'react';
import PropTypes from 'prop-types';
import AuthorsSelect from '../containers/authorsSelect';

const CreateRecordPopup = ({
  options,
  onChange,
  onSumbit,
  onClose,
  open,
  table,
  processing,
}) => {
  const mainClass = open ? 'popup-layout popup-open' : 'popup-layout';
  return (
    <div className={mainClass} id="popup-layout">
      <form
        className="popup-content"
        onSubmit={onSumbit}
      >
        <div
          className="close"
          onClick={onClose}
        >
          &times;
        </div>
        <div className="popup-header">
          <h2>{`New record, ${table}`}</h2>
        </div>
        {options.map((option) => {
          const {
            name,
            label,
            required = false,
          } = option;

          return (
            <div className="input-field" key={name}>
              <span className="input-label">{label}</span>
              {name === 'authorId'
                ? <AuthorsSelect />
                : (
                  <input
                    type="text"
                    placeholder={`Enter ${label}`}
                    onChange={onChange}
                    name={name}
                    required={required}
                  />
                )
              }
            </div>
          );
        })}
        <div className="popup-button-group">
          <button
            type="submit"
            disabled={processing}
          >
            {processing
              ? <div className="spinner" />
              : 'Ok'}
          </button>
          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

CreateRecordPopup.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  onSumbit: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  processing: PropTypes.bool,
  table: PropTypes.string,
};

export default CreateRecordPopup;
