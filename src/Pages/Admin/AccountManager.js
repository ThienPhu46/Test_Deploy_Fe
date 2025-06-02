import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../Design_Css/Admin/AccountManager.css';
import Sidebar from '../../Components/Admin/Components_Js/Sliderbar';
import LogoutModal from '../../Components/Admin/Components_Js/LogoutModal';

const AccountManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newAccount, setNewAccount] = useState({
    tenTaiKhoan: '',
    matKhau: '',
    tenHienThi: '',
    email: '',
    phone: '',
    maVaiTro: ''
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [showInputError, setShowInputError] = useState(false); // Thêm state cho modal lỗi nhập liệu
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE_URL = 'http://localhost:5282/api/accounts';

  const fetchAccounts = useCallback(async () => {
    try {
      console.log('Đang gọi API lấy danh sách tài khoản với params:', { pageNumber, pageSize, searchTerm });
      const response = await axios.get(API_BASE_URL, {
        params: {
          pageNumber,
          pageSize,
          searchTerm: searchTerm || null,
          sortBy: 'MaTaiKhoan',
          sortOrder: 'ASC'
        }
      });
      console.log('Phản hồi từ API:', response.data);

      if (response.data.success) {
        setAccounts(response.data.data || []);
        setErrorMessage('');
      } else {
        setErrorMessage(`Lỗi từ backend: ${response.data.message}`);
        setAccounts([]);
      }
    } catch (error) {
      console.error('Lỗi chi tiết khi gọi API:', error);
      if (error.response) {
        setErrorMessage(`Lỗi từ server: ${error.response.status} - ${error.response.data.message || error.message}`);
        if (error.response.status === 400) {
          setErrorMessage('Yêu cầu không hợp lệ. Kiểm tra tham số hoặc cấu hình backend.');
        }
      } else if (error.request) {
        setErrorMessage('Không thể kết nối đến server. Vui lòng kiểm tra backend hoặc CORS.');
      } else {
        setErrorMessage(`Lỗi: ${error.message}`);
      }
      setAccounts([]);
    }
  }, [pageNumber, pageSize, searchTerm]);

  const checkDuplicateAccount = async (username, email) => {
    try {
      const [usernameResponse, emailResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/validate/username/${encodeURIComponent(username)}`),
        axios.get(`${API_BASE_URL}/validate/email/${encodeURIComponent(email)}`)
      ]);

      const errors = [];
      if (usernameResponse.data.success && usernameResponse.data.data) {
        errors.push('Tên tài khoản đã tồn tại');
      }
      if (emailResponse.data.success && emailResponse.data.data) {
        errors.push('Email đã tồn tại');
      }

      if (errors.length > 0) {
        return { isDuplicate: true, message: errors.join(' và ') };
      }
      return { isDuplicate: false, message: '' };
    } catch (error) {
      console.error('Lỗi khi kiểm tra trùng lặp:', error);
      return { isDuplicate: true, message: 'Lỗi khi kiểm tra trùng lặp. Vui lòng thử lại.' };
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPageNumber(1);
  };

  const handleConfirmLogout = () => {
    console.log("Người dùng đã đăng xuất");
    setShowLogoutConfirm(false);
    window.location.href = '/';
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Kiểm tra dữ liệu đầu vào
  const validateAccountData = (accountData) => {
    if (!accountData.tenTaiKhoan.trim()) return 'Vui lòng nhập tên tài khoản.';
    if (!accountData.matKhau.trim()) return 'Vui lòng nhập mật khẩu.';
    if (!accountData.tenHienThi.trim()) return 'Vui lòng nhập tên hiển thị.';
    if (!accountData.email.trim()) return 'Vui lòng nhập email.';
    if (!accountData.phone.trim()) return 'Vui lòng nhập số điện thoại.';
    if (!accountData.maVaiTro) return 'Vui lòng chọn vai trò.';
    return null;
  };

  const handleAddAccount = async () => {
    const validationError = validateAccountData(newAccount);
    if (validationError) {
      setShowInputError(true); // Hiển thị modal lỗi nhập liệu
      return;
    }

    const { isDuplicate, message } = await checkDuplicateAccount(newAccount.tenTaiKhoan, newAccount.email);
    if (isDuplicate) {
      setErrorMessage(message);
      return;
    }

    try {
      const response = await axios.post(API_BASE_URL, newAccount);
      if (response.data.success) {
        setShowAddSuccess(true);
        setShowSaveConfirm(true);
        setShowDetailsModal(false);
        setNewAccount({
          tenTaiKhoan: '',
          matKhau: '',
          tenHienThi: '',
          email: '',
          phone: '',
          maVaiTro: ''
        });
        fetchAccounts();
      } else {
        setErrorMessage(`Lỗi khi thêm tài khoản: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API thêm tài khoản:', error);
      setErrorMessage('Có lỗi xảy ra khi thêm tài khoản');
    }
  };

  const handleUpdateAccount = async () => {
    const validationError = validateAccountData(selectedAccount);
    if (validationError) {
      setShowInputError(true); // Hiển thị modal lỗi nhập liệu
      return;
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/${selectedAccount.maTaiKhoan}`, selectedAccount);
      if (response.data.success) {
        setShowSaveConfirm(true);
        setShowDetailsModal(false);
        fetchAccounts();
      } else {
        setErrorMessage(`Lỗi khi sửa tài khoản: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API sửa tài khoản:', error);
      setErrorMessage('Có lỗi xảy ra khi sửa tài khoản');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      console.log('Đang xóa tài khoản với mã:', accountToDelete.maTaiKhoan);
      const response = await axios.delete(`${API_BASE_URL}/${accountToDelete.maTaiKhoan}`);
      console.log('Phản hồi từ API xóa:', response.data);

      if (response.data.success) {
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
        fetchAccounts();
      } else {
        setShowDeleteConfirm(false);
        setShowDeleteError(true);
      }
    } catch (error) {
      console.error('Lỗi chi tiết khi xóa tài khoản:', error);
      setShowDeleteConfirm(false);
      setShowDeleteError(true);
    }
  };

  return (
    <div className="am-main-container">
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
          <div className="top-title">Quản Lý Tài Khoản</div>
        </div>
        <div className="more-icon" onClick={() => console.log('Mở tùy chọn bổ sung')}>⋮</div>
      </div>

      <div className="am-content-wrapper">
        {errorMessage && (
          <div style={{ color: 'black', margin: '10px 0' }}>
            {errorMessage}
          </div>
        )}
        <div className="am-search-add-section">
          <div className="am-search-box">
            <span className="am-search-icon"><img src="/icon_LTW/TimKiem.png" alt="#" /></span>
            <input
              type="text"
              placeholder="Tìm theo tên đăng nhập"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="am-add-action">
            <button className="am-add-account-btn" onClick={() => {
              setNewAccount({
                tenTaiKhoan: '',
                matKhau: '',
                tenHienThi: '',
                email: '',
                phone: '',
                maVaiTro: ''
              });
              setSelectedAccount(null);
              setShowDetailsModal(true);
              setShowPassword(false);
              setErrorMessage('');
            }}>
              Thêm tài khoản
            </button>
          </div>
        </div>

        <div className="am-table-container">
          <table className="am-account-table">
            <thead>
              <tr>
                <th>Mã tài khoản</th>
                <th>Tên đăng nhập</th>
                <th>Tên hiển thị</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <tr key={account.maTaiKhoan}>
                    <td>{account.maTaiKhoan}</td>
                    <td>{account.tenTaiKhoan}</td>
                    <td>{account.tenHienThi}</td>
                    <td>{account.email}</td>
                    <td>{account.phone}</td>
                    <td>{account.tenVaiTro}</td>
                    <td>
                      <div className="am-edit-action">
                        <button className="am-edit-btn" onClick={() => {
                          setSelectedAccount(account);
                          setShowDetailsModal(true);
                          setShowPassword(false);
                          setErrorMessage('');
                        }}>
                          <span className="am-edit-icon"><img src="/icon_LTW/Edit.png" alt="#" /></span>
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="am-delete-action">
                        <button
                          className="am-delete-btn"
                          onClick={() => {
                            setAccountToDelete(account);
                            setShowDeleteConfirm(true);
                            setErrorMessage('');
                          }}
                        >
                          <span className="am-delete-icon"><img src="/icon_LTW/Xoa.png" alt="#" /></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>
                    {errorMessage || 'Không có dữ liệu tài khoản.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDetailsModal && (
        <div className="am-modal-overlay">
          <div className="am-modal-wrapper">
            <h2 className="am-modal-title">{selectedAccount ? `Sửa tài khoản ${selectedAccount.maTaiKhoan}` : 'Thêm tài khoản'}</h2>
            <div className="am-modal-content">
              <div className="am-form-container">
                <div className="am-form-field">
                  <span className="am-field-icon"><img src="/icon_LTW/QLTKKH_Ten.png" alt="#" /></span>
                  <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={selectedAccount ? selectedAccount.tenTaiKhoan : newAccount.tenTaiKhoan}
                    onChange={(e) => {
                      if (selectedAccount) {
                        setSelectedAccount({ ...selectedAccount, tenTaiKhoan: e.target.value });
                      } else {
                        setNewAccount({ ...newAccount, tenTaiKhoan: e.target.value });
                      }
                    }}
                    className="am-input-field"
                  />
                </div>
                <div className="am-form-field">
                  <span className="am-field-icon"><img src="/icon_LTW/GridiconsLock (1).png" alt="#" /></span>
                  <div style={{ position: 'relative', width: '250px' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mật khẩu"
                      value={selectedAccount ? selectedAccount.matKhau : newAccount.matKhau}
                      onChange={(e) => {
                        if (selectedAccount) {
                          setSelectedAccount({ ...selectedAccount, matKhau: e.target.value });
                        } else {
                          setNewAccount({ ...newAccount, matKhau: e.target.value });
                        }
                      }}
                      className="am-input-field"
                    />
                    <button
                      type="button"
                      className="am-toggle-password"
                      onClick={toggleShowPassword}
                    >
                      <img
                        src={showPassword ? '/icon_LTW/MdiEye (1).png' : '/icon_LTW/MdiEyeOff (1).png'}
                        alt="Toggle Password Visibility"
                        style={{ width: '20px', height: '20px' }}
                      />
                    </button>
                  </div>
                </div>
                <div className="am-form-field">
                  <span className="am-field-icon"><img src="/icon_LTW/ClarityEmployeeSolid.png" alt="#" /></span>
                  <input
                    type="text"
                    placeholder="Tên hiển thị"
                    value={selectedAccount ? selectedAccount.tenHienThi : newAccount.tenHienThi}
                    onChange={(e) => {
                      if (selectedAccount) {
                        setSelectedAccount({ ...selectedAccount, tenHienThi: e.target.value });
                      } else {
                        setNewAccount({ ...newAccount, tenHienThi: e.target.value });
                      }
                    }}
                    className="am-input-field"
                  />
                </div>
                <div className="am-form-field">
                  <span className="am-field-icon"><img src="/icon_LTW/Email.png" alt="#" /></span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={selectedAccount ? selectedAccount.email : newAccount.email}
                    onChange={(e) => {
                      if (selectedAccount) {
                        setSelectedAccount({ ...selectedAccount, email: e.target.value });
                      } else {
                        setNewAccount({ ...newAccount, email: e.target.value });
                      }
                    }}
                    className="am-input-field"
                  />
                </div>
                <div className="am-form-field">
                  <span className="am-field-icon"><img src="/icon_LTW/ĐP_SĐT.png" alt="#" /></span>
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    value={selectedAccount ? selectedAccount.phone : newAccount.phone}
                    onChange={(e) => {
                      if (selectedAccount) {
                        setSelectedAccount({ ...selectedAccount, phone: e.target.value });
                      } else {
                        setNewAccount({ ...newAccount, phone: e.target.value });
                      }
                    }}
                    className="am-input-field"
                  />
                </div>
                <div className="am-form-field">
                  <span className="am-field-icon"><img src="/icon_LTW/EosIconsRoleBinding.png" alt="#" /></span>
                  <select
                    value={selectedAccount ? selectedAccount.maVaiTro : newAccount.maVaiTro}
                    onChange={(e) => {
                      if (selectedAccount) {
                        setSelectedAccount({ ...selectedAccount, maVaiTro: e.target.value });
                      } else {
                        setNewAccount({ ...newAccount, maVaiTro: e.target.value });
                      }
                    }}
                    className="am-input-field"
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="1">Admin</option>
                    <option value="2">Staff</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="am-modal-actions">
              <button className="am-save-btn" onClick={() => {
                if (selectedAccount) {
                  handleUpdateAccount();
                } else {
                  handleAddAccount();
                }
              }}>Lưu</button>
              <button className="am-cancel-btn" onClick={() => {
                setShowDetailsModal(false);
                setSelectedAccount(null);
                setNewAccount({
                  tenTaiKhoan: '',
                  matKhau: '',
                  tenHienThi: '',
                  email: '',
                  phone: '',
                  maVaiTro: ''
                });
                setShowPassword(false);
                setErrorMessage('');
              }}>Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}

      {showSaveConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowSaveConfirm(false)}><img src="/icon_LTW/FontistoClose.png" alt="#" /></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            {showAddSuccess ? (
              <p className="logout-message">Thêm tài khoản thành công!</p>
            ) : (
              <p className="logout-message">Sửa thông tin tài khoản thành công!</p>
            )}
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => {
                setShowSaveConfirm(false);
                setShowAddSuccess(false);
                setErrorMessage('');
              }}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && accountToDelete && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteConfirm(false)}><img src="/icon_LTW/FontistoClose.png" alt="#" /></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có thực sự muốn xóa tài khoản {accountToDelete.tenTaiKhoan}?</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={handleDeleteAccount}>
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
            <span className="close-icon" onClick={() => setShowDeleteSuccess(false)}><img src="/icon_LTW/FontistoClose.png" alt="#" /></span>
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

      {showDeleteError && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteError(false)}><img src="/icon_LTW/FontistoClose.png" alt="#" /></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Tài khoản này đang được sử dụng.</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => setShowDeleteError(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showInputError && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowInputError(false)}><img src="/icon_LTW/FontistoClose.png" alt="#" /></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Vui lòng nhập đầy đủ thông tin.</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={() => setShowInputError(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;