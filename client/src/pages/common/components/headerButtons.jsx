import React from 'react';
import PropTypes from 'prop-types';
import { TiPencil, TiTrash, TiPlus } from 'react-icons/ti';
import { FiBook } from 'react-icons/fi';
import MenuButton from './menuButton';

const HeaderButtons = ({
  editMode,
  processing,
  onNewClick,
  onEditClick,
  onDeleteClick,
}) => (
  <div className="header-buttons">
    <MenuButton
      onClick={onNewClick}
      disabled={false}
    >
      <TiPlus />
      {'NEW..'}
    </MenuButton>
    <MenuButton
      onClick={onDeleteClick}
      disabled={processing}
    >
      {processing
        ? <div className="spinner" />
        : <TiTrash />}
      {processing
        ? ''
        : 'Delete'}
    </MenuButton>
    <MenuButton
      onClick={onEditClick}
      disabled={false}
    >
      {editMode
        ? <TiPencil />
        : <FiBook />}
      {editMode
        ? 'Edit mode'
        : 'View mode'}
    </MenuButton>
  </div>
);

HeaderButtons.propTypes = {
  editMode: PropTypes.bool,
  processing: PropTypes.bool,
  onNewClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default HeaderButtons;
