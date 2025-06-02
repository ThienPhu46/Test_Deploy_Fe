import React from 'react';
import '../Components_Css/LogoutModal.css';

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal">
      <div className="logout-modal-content">
        <div className="logout-modal-header">
          <span className="header-text">Thông Báo</span>
            <span className="close-icon" onClick={onCancel}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
        </div>
        <p className="logout-message">Bạn có muốn đăng xuất?</p>
        <div className="logout-modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            YES
          </button>
          <button className="cancel-button" onClick={onCancel}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;