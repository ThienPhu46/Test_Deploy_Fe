import React, { useState } from 'react';
import '../../Design_Css/Admin/BillAdmin.css';
import Sidebar from '../../Components/Admin/Components_Js/Sliderbar';
import LogoutModal from '../../Components/Admin/Components_Js/LogoutModal'; // Import component mới


const InvoiceList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const invoices = [
    {
      id: 1,
      date: '17/05/2025 08:43:33 AM',
      employeeName: 'Chu Ngọc Sơn',
      total: '1,575,000 VND',
      bookingId: 1,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 2,
      date: '18/05/2025 10:15:12 AM',
      employeeName: 'Chu Ngọc Sơn',
      total: '2,150,000 VND',
      bookingId: 2,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 3,
      date: '18/05/2025 03:42:58 PM',
      employeeName: 'Chu Ngọc Sơn',
      total: '850,000 VND',
      bookingId: 3,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 4,
      date: '19/05/2025 08:05:45 AM',
      employeeName: 'Chu Ngọc Sơn',
      total: '1,200,000 VND',
      bookingId: 4,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 5,
      date: '20/05/2025 01:20:00 PM',
      employeeName: 'Chu Ngọc Sơn',
      total: '3,000,000 VND',
      bookingId: 5,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 6,
      date: '20/05/2025 03:45:10 PM',
      employeeName: 'Chu Ngọc Sơn',
      total: '1,800,000 VND',
      bookingId: 6,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 7,
      date: '21/05/2025 09:12:30 AM',
      employeeName: 'Chu Ngọc Sơn',
      total: '2,500,000 VND',
      bookingId: 7,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 8,
      date: '21/05/2025 11:34:20 AM',
      employeeName: 'Chu Ngọc Sơn',
      total: '950,000 VND',
      bookingId: 8,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 9,
      date: '22/05/2025 08:25:00 AM',
      employeeName: 'Chu Ngọc Sơn',
      total: '1,120,000 VND',
      bookingId: 9,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 10,
      date: '22/05/2025 03:55:45 PM',
      employeeName: 'Chu Ngọc Sơn',
      total: '1,670,000 VND',
      bookingId: 11,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 11,
      date: '23/05/2025 01:10:10 PM',
      employeeName: 'Chu Ngọc Sơn',
      total: '2,800,000 VND',
      bookingId: 13,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 12,
      date: '23/05/2025 01:25:35 PM',
      employeeName: 'Chu Ngọc Sơn',
      total: '765,000 VND',
      bookingId: 14,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 13,
      date: '24/05/2025 09:00:00 AM',
      employeeName: 'Chu Ngọc Sơn',
      total: '3,450,000 VND',
      bookingId: 16,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 14,
      date: '24/05/2025 11:11:11 AM',
      employeeName: 'Chu Ngọc Sơn',
      total: '1,000,000 VND',
      bookingId: 18,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 15,
      date: '25/05/2025 02:15:22 PM',
      employeeName: 'Chu Ngọc Sơn',
      total: '2,175,000 VND',
      bookingId: 15,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 16,
      date: '25/05/2025 04:40:30 PM',
      employeeName: 'Chu Ngọc Sơn',
      total: '1,930,000 VND',
      bookingId: 12,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 17,
      date: '26/05/2025 08:08:08 AM',
      employeeName: 'Chu Ngọc Sơn',
      total: '2,250,000 VND',
      bookingId: 20,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
    {
      id: 18,
      date: '26/05/2025 01:30:15 PM',
      employeeName: 'Chu Ngọc Sơn',
      total: '3,074,000 VND',
      bookingId: 19,
      customerName: 'Vũ Văn Phú',
      customerRoom: 'P301',
      customerDays: 6,
      customerPeople: 6,
      services: [
        { name: 'Cơm chiên', price: '30,000', quantity: 2, total: '60,000' },
        { name: 'Pepsi', price: '12,000', quantity: 2, total: '24,000' },
        { name: 'Thuê phòng', price: '300,000', quantity: 5, total: '1,500,000' },
      ],
      grandTotal: '1,584,000 VND'
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const [year, month, day] = dateValue.split('-');
      setSelectedDate(`${day}/${month}/${year}`);
    } else {
      setSelectedDate('');
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const invoiceDate = invoice.date.split(' ')[0];
    const invoiceIdStr = invoice.id.toString();
    return (
      (!selectedDate || invoiceDate === selectedDate) &&
      (!searchTerm || invoiceIdStr.includes(searchTerm))
    );
  });

  const handleDetails = (id) => {
    const invoice = invoices.find((inv) => inv.id === id);
    setSelectedInvoice(invoice);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedInvoice(null);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

 const handleConfirmLogout = () => {
    console.log("Người dùng đã đăng xuất");
    setShowLogoutConfirm(false);
    window.location.href = '/'; 
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };
  const handleMoreOptions = () => {
    console.log('Mở tùy chọn bổ sung');
  };

  return (
    <div className="invoice-list-container">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogoutClick={handleLogoutClick}
      />
       <LogoutModal 
        isOpen={showLogoutConfirm}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
      <div className="top-header">
        <div className="top-title-container">
          <div className="menu-icon" onClick={toggleSidebar}>☰</div>
          <div className="top-title">Hóa Đơn</div>
        </div>
        <div className="more-icon" onClick={handleMoreOptions}>⋮</div>
      </div>

      <div className="content-wrapperr">
        <div className="search-barr-container">
          <div className="date-picker">
            <span className="calendar-icon"><img src="/icon_LTW/Lich.png" alt="#"></img></span>
            <input
              type="date"
              onChange={handleDateChange}
              placeholder="Chọn ngày"
            />
          </div>
          <div className="search-bar">
            <span className="search-icon"><img src="/icon_LTW/TimKiem.png" alt="#"></img></span>
            <input
              type="text"
              placeholder="Tìm kiếm hóa đơn"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Mã hóa đơn</th>
                <th>Ngày lập</th>
                <th>Tên nhân viên lập</th>
                <th>Tổng tiền</th>
                <th>Mã chi tiết phiếu thuê</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.employeeName}</td>
                  <td>{invoice.total}</td>
                  <td>{invoice.bookingId}</td>
                  <td>
                    <button
                      className="details-button"
                      onClick={() => handleDetails(invoice.id)}
                    >
                      <img src="/icon_LTW/ChiTiet.png" alt="#"></img>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetailsModal && selectedInvoice && (
        <div className="details-modal">
          <div className="details-modal-content">
            <div className="button_red">
              <p> Hóa Đơn </p>
              <img onClick={handleCloseDetails} src="/icon_LTW/thoat2.png" alt="#"></img>
            </div>
            <div className="invoice-header">
              <div className="invoice-logo"> <img src="/icon_LTW/LogoDeBugTeam2.jpg" alt="#"></img></div>
              <div className="invoice-title">HÓA ĐƠN</div>
              <div className="invoice-print"> <img src="/icon_LTW/HĐ_Print.png" alt="#"></img></div>
            </div>
            <span className="info-name">{selectedInvoice.customerName}</span>
            <div className="invoice-info">
              <div className="info-row">
                <div className="info-rod">
                  <span className="info-label">Ngày lập hóa đơn:</span>
                  <span className="info-value">{selectedInvoice.date}</span> </div>
                <div className="info-rod">
                  <span className="info-label">Số phòng:</span>
                  <span className="info-value">{selectedInvoice.customerRoom}</span> </div>
              </div>
              <div className="info-row">
                <div className="info-rod">
                  <span className="info-label">Số hóa đơn:</span>
                  <span className="info-value">{selectedInvoice.bookingId}</span> </div>
                <div className="info-rod">
                  <span className="info-label">Số người:</span>
                  <span className="info-value">{selectedInvoice.customerPeople}</span></div>
              </div>
              <div className="info-row">
                <div className="info-rod">
                  <span className="info-label">Nhân viên lập:</span>
                  <span className="info-value">{selectedInvoice.employeeName}</span></div>
                <div className="info-rod">
                  <span className="info-label">Số ngày:</span>
                  <span className="info-value">{selectedInvoice.customerDays}</span></div>
              </div>
            </div>
            <table className="details-table">
              <thead>
                <tr>
                  <th>Dịch vụ</th>
                  <th>Giá tiền</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.services.map((service, index) => (
                  <tr key={index}>
                    <td>{service.name}</td>
                    <td>{service.price}</td>
                    <td>{service.quantity}</td>
                    <td>{service.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="invoice-total">
              <span className="total-label">Tổng tiền:</span>
              <span className="total-value">{selectedInvoice.grandTotal}</span>
            </div>
            <div className="invoice-footer">
              <div className="footer-text">Cảm ơn quý khách!💙</div>
              <div className="footer-contact">debugteam@gmail.com - +84 123 456 789</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InvoiceList;