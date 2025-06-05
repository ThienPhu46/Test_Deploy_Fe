import React, { useState, useEffect, useCallback } from 'react';
import '../../Design_Css/Admin/CustomerManager.css';
import Sidebar from '../../Components/Admin/Components_Js/Sliderbar';
import LogoutModal from '../../Components/Admin/Components_Js/LogoutModal';

const CustomerManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false); // State for error modal
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Single state for error messages

  const API_BASE_URL = process.env.REACT_APP_API_URL;  // URL cố định của backend

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/customers?searchTerm=${searchTerm}&sortBy=MaKhachHang&sortOrder=ASC`
      );
      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status} - ${response.statusText}. Chi tiết: ${(await response.text()).substring(0, 200)}`);
      }
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error('Phản hồi từ server không phải là JSON hợp lệ: ' + text.substring(0, 200));
      }
      const result = await response.json();
      console.log('API Response:', result);
      if (result.success) {
        const customerData = result.data || [];
        console.log('Customer Data:', customerData);
        if (!Array.isArray(customerData)) {
          throw new Error('Dữ liệu khách hàng không phải là mảng');
        }
        const validatedData = customerData.map((customer, index) => ({
          MaKhachHang: customer.maKhachHang || `TEMP_${index}`,
          HoTenKhachHang: customer.hoTenKhachHang || 'N/A',
          DienThoai: customer.dienThoai || 'N/A',
          Email: customer.email || '',
          MaCT: customer.maCT || '',
          TenCT: customer.tenCT || 'N/A',
          TongDiem: customer.tongDiem !== undefined ? customer.tongDiem : 0
        }));
        setCustomers(validatedData);
        setErrorMessage('');
      } else {
        throw new Error(result.message || 'Không thể tải danh sách khách hàng');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setErrorMessage(error.message);
      setCustomers([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer({
      maKhachHang: customer.MaKhachHangasher,
      hoTenKhachHang: customer.HoTenKhachHang,
      dienThoai: customer.DienThoai,
      email: customer.Email,
      maCT: customer.MaCT,
      tenCT: customer.TenCT,
      tongDiem: customer.TongDiem
    });
    setShowDetailsModal(true);
  };

  const handleDelete = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/customers/${customerToDelete.MaKhachHang}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Không thể xóa khách hàng vì khách hàng này đã có lịch đặt phòng.`);
      }
      const result = await response.json();
      if (result.success) {
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
        setErrorMessage(''); // Clear error message on successful deletion
        fetchCustomers();
      } else {
        throw new Error(result.message || 'Xóa khách hàng thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API xóa:', error);
      setShowDeleteConfirm(false);
      setShowDeleteError(true); // Show the error modal
      setErrorMessage(error.message); // Set the error message for the modal
    }
  };

  const handleSave = async () => {
    try {
      if (selectedCustomer) {
        const response = await fetch(`${API_BASE_URL}/api/customers/${selectedCustomer.maKhachHang}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            maKhachHang: selectedCustomer.maKhachHang,
            hoTenKhachHang: selectedCustomer.hoTenKhachHang,
            dienThoai: selectedCustomer.dienThoai,
            email: selectedCustomer.email || '',
            maCT: selectedCustomer.maCT || '1',
            tenCT: selectedCustomer.tenCT || 'Default Program',
            tongDiem: selectedCustomer.tongDiem
          }),
        });
        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status} - ${response.statusText}. Chi tiết: ${(await response.text())}`);
        }
        const result = await response.json();
        console.log('PUT Response:', result);
        if (result.success) {
          setShowDetailsModal(false);
          setShowSaveConfirm(true);
          setErrorMessage(''); // Clear error message on successful save
          fetchCustomers();
        } else {
          throw new Error(result.message || 'Cập nhật khách hàng thất bại');
        }
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setErrorMessage(error.message || 'Đã xảy ra lỗi khi lưu khách hàng');
    }
  };

  const handleCancel = () => {
    setShowDetailsModal(false);
    setSelectedCustomer(null);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleConfirmLogout = () => {
    console.log('Người dùng đã đăng xuất');
    setShowLogoutConfirm(false);
    window.location.href = '/';
  };

  // Clear error message when closing the error modal
  const handleCloseDeleteError = () => {
    setShowDeleteError(false);
    setErrorMessage(''); // Clear the error message when modal is closed
  };

  return (
    <div className="cm-main-container">
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
          <div className="top-title">Quản Lý Khách Hàng</div>
        </div>
        <div className="more-icon" onClick={() => console.log('Mở tùy chọn bổ sung')}>⋮</div>
      </div>

      <div className="cm-content-wrapper">
        {/* Only show error message if there is no modal active */}
        {errorMessage && !showDeleteError && !showDeleteSuccess && !showDeleteConfirm && !showSaveConfirm && (
          <div className="cm-error-message">
            {errorMessage}
          </div>
        )}
        <div className="cm-search-add-section">
          <div className="cm-search-box">
            <span className="cm-search-icon"><img src="/icon_LTW/TimKiem.png" alt="#" /></span>
            <input
              type="text"
              placeholder="Tìm theo tên khách hàng"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="cm-table-container">
          <table className="cm-customer-table">
            <thead>
              <tr>
                <th>Mã khách hàng</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Tổng điểm</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer, index) => (
                  <tr key={customer.MaKhachHang || `TEMP_${index}`}>
                    <td>{customer.MaKhachHang}</td>
                    <td>{customer.HoTenKhachHang}</td>
                    <td>{customer.DienThoai}</td>
                    <td>{customer.TongDiem}</td>
                    <td>
                      <button className="cm-edit-btn">
                        <img
                          onClick={() => handleEdit(customer)}
                          src="/icon_LTW/Edit.png"
                          alt="#"
                        />
                      </button>
                    </td>
                    <td>
                      <button className="cm-delete-btn">
                        <img
                          onClick={() => handleDelete(customer)}
                          src="/icon_LTW/Xoa.png"
                          alt="#"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Không có dữ liệu để hiển thị</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDetailsModal && (
        <div className="cm-modal-overlay">
          <div className="cm-modal-wrapper">
            <h2 className="cm-modal-title">
              {selectedCustomer ? `Sửa khách hàng ${selectedCustomer.maKhachHang}` : 'Sửa khách hàng'}
            </h2>
            <div className="cm-modal-content">
              <div className="cm-form-container">
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/ĐP_Hoten.png" alt="#" /></span>
                  <input
                    type="text"
                    placeholder="Họ và tên khách hàng"
                    value={selectedCustomer ? selectedCustomer.hoTenKhachHang : ''}
                    onChange={(e) => {
                      if (selectedCustomer) {
                        setSelectedCustomer({ ...selectedCustomer, hoTenKhachHang: e.target.value });
                      }
                    }}
                    className="cm-input-field"
                  />
                </div>
                <div className="cm-form-field">
                  <span className="cm-field-icon"><img src="/icon_LTW/ĐP_SĐT.png" alt="#" /></span>
                  <div className="cm-input-with-length">
                    <input
                      type="text"
                      placeholder="Nhập SĐT"
                      value={selectedCustomer ? selectedCustomer.dienThoai : ''}
                      onChange={(e) => {
                        if (selectedCustomer) {
                          setSelectedCustomer({ ...selectedCustomer, dienThoai: e.target.value });
                        }
                      }}
                      className="cm-input-field"
                      maxLength="10"
                    />
                    <span className="cm-field-length">
                      {(selectedCustomer ? selectedCustomer.dienThoai : '').length}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cm-modal-actions">
              <button className="cm-save-btn" onClick={handleSave}>Lưu</button>
              <button className="cm-cancel-btn" onClick={handleCancel}>Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}

      {showSaveConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowSaveConfirm(false)}>
              <img src="/icon_LTW/FontistoClose.png" alt="#" />
            </span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Sửa thông tin khách hàng thành công!</p>
            <div className="logout-modal-buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  setShowSaveConfirm(false);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && customerToDelete && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteConfirm(false)}>
              <img src="/icon_LTW/FontistoClose.png" alt="#" />
            </span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có thực sự muốn xóa {customerToDelete.HoTenKhachHang}?</p>
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
            <span className="close-icon" onClick={() => setShowDeleteSuccess(false)}>
              <img src="/icon_LTW/FontistoClose.png" alt="#" />
            </span>
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
            <span className="close-icon" onClick={handleCloseDeleteError}>
              <img src="/icon_LTW/FontistoClose.png" alt="#" />
            </span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">{errorMessage}</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={handleCloseDeleteError}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;