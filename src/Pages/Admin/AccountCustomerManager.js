import React, { useState } from 'react';
import '../../Design_Css/Admin/AccountCustomerManager.css';
import Sidebar from '../../Components/Admin/Components_Js/Sliderbar';
import LogoutModal from '../../Components/Admin/Components_Js/LogoutModal'; // Import component mới


const AccountCustomerManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);

  const accounts = [
    { id: 1, accountId: '1', username: 'vuvanphu123', name: 'Vũ Văn Phú', email: 'vuvanphu@gmail.com', point: '100' },
    { id: 2, accountId: '2', username: 'tranbichhanh135', name: 'Trần Bích Hạnh', email: 'tranbichhanh@gmail.com', point: '200' },
    { id: 3, accountId: '3', username: 'levanhung246', name: 'Lê Văn Hùng', email: 'levanhung@gmail.com', point: '300' },
    { id: 4, accountId: '4', username: 'nguyenminhtrang578', name: 'Nguyễn Minh Trang', email: 'nguyenminhtrang@gmail.com', point: '300' },
    { id: 5, accountId: '5', username: 'trangiahuy999', name: 'Trần Gia Huy', email: 'trangiahuy@gmail.com', point: '400' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id) => {
    const account = accounts.find((a) => a.id === id);
    setSelectedAccount(account);
    setShowDetailsModal(true);
  };

  const filteredAccounts = accounts.filter((account) =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    const account = accounts.find((a) => a.id === id);
    setAccountToDelete(account);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Xóa tài khoản ${accountToDelete.id}`);
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
  };
  const handleConfirmLogout = () => {
    console.log("Người dùng đã đăng xuất");
    setShowLogoutConfirm(false);
    window.location.href = '/'; // Điều hướng sau khi xác nhận
  };
  const handleSave = () => {
    if (selectedAccount) {
      console.log('Lưu thông tin tài khoản:', selectedAccount);
    }
    setShowDetailsModal(false);
    setShowSaveConfirm(true);
  };

  const handleCancel = () => {
    setShowDetailsModal(false);
    setSelectedAccount(null);
  };
  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };
  return (
    <div className="acm-main-container">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogoutClick={() => setShowLogoutConfirm(true)}
      />
      <LogoutModal
        isOpen={showLogoutConfirm}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
      <div className="top-header">
        <div className="top-title-container">
          <div className="menu-icon" onClick={toggleSidebar}>☰</div>
          <div className="top-title">Quản Lý Tài Khoản Khách Hàng</div>
        </div>
        <div className="more-icon" onClick={() => console.log('Mở tùy chọn bổ sung')}>⋮</div>
      </div>
      <div className="acm-content-wrapper">
        <div className="acm-search-add-section">
          <div className="acm-search-box">
            <span className="acm-search-icon"><img src="/icon_LTW/TimKiem.png" alt="#"></img></span>
            <input
              type="text"
              placeholder="Tìm theo tên người dùng"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="acm-table-container">
          <table className="acm-account-table">
            <thead>
              <tr>
                <th>Mã tài khoản</th>
                <th>Tên tài khoản</th>
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th> Tổng điểm</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.accountId}</td>
                  <td>{account.username}</td>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.point}</td>
                  <td>
                    <button className="acm-edit-btn" onClick={() => handleEdit(account.id)}>
                      <span className="acm-edit-icon"><img src="/icon_LTW/Edit.png" alt="#"></img></span>
                    </button>
                  </td>
                  <td>
                    <button
                      className="acm-delete-btn"
                      onClick={() => handleDelete(account.id)}
                    >
                      <span className="acm-delete-icon"><img src="/icon_LTW/Xoa.png" alt="#"></img></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetailsModal && (
        <div className="acm-modal-overlay">
          <div className="acm-modal-wrapper">
            <h2 className="acm-modal-title">Sửa tài khoản </h2>
            <div className="acm-modal-content">
              <div className="acm-form-container">
                <div className="acm-form-field">
                  <span className="acm-field-icon"><img src="/icon_LTW/QLTKKH_Ten.png" alt="#"></img></span>
                  <input
                    type="text"
                    placeholder="Tên người dùng"
                    value={selectedAccount ? selectedAccount.username : ''}
                    onChange={(e) => {
                      if (selectedAccount) {
                        setSelectedAccount({ ...selectedAccount, username: e.target.value });
                      }
                    }}
                    className="acm-input-field"
                  />
                </div>
                <div className="acm-form-field">
                  <span className="acm-field-icon"><img src="/icon_LTW/Email.png" alt="#"></img></span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={selectedAccount ? selectedAccount.email : ''}
                    onChange={(e) => {
                      if (selectedAccount) {
                        setSelectedAccount({ ...selectedAccount, email: e.target.value });
                      }
                    }}
                    className="acm-input-field"
                  />
                </div>
              </div>
            </div>
            <div className="acm-modal-actions">
              <button className="acm-save-btn" onClick={handleSave}>Lưu</button>
              <button className="acm-cancel-btn" onClick={handleCancel}>Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}


      {showSaveConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowSaveConfirm(false)}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Sửa thông tin tài khoản thành công!</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => setShowSaveConfirm(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && accountToDelete && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteConfirm(false)}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn muốn xóa tài khoản này? </p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={handleConfirmDelete}>
                YES
              </button>
              <button className="cancel-button" onClick={() => setShowDeleteConfirm(false)}>
                NO
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteSuccess && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteSuccess(false)}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Xóa thành công!</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => setShowDeleteSuccess(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCustomerManagement;