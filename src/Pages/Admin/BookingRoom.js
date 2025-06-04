import React, { useState, useEffect } from 'react';
import '../../Design_Css/Admin/BookingRoom.css';
import Sidebar from '../../Components/Admin/Components_Js/Sliderbar';
import LogoutModal from '../../Components/Admin/Components_Js/LogoutModal';
import axios from 'axios';

const BookingList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState({});
  const [availableRooms, setAvailableRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState({});

  const [customerInfo, setCustomerInfo] = useState({
    hoTen: '',
    sdt: ''
  });
  const [bookingInfo, setBookingInfo] = useState({
    ngayBatDau: '',
    gioBatDau: '',
    ngayKetThuc: '',
    gioKetThuc: ''
  });

  const API_BASE_URL = 'http://localhost:5282/api';

  // Lấy danh sách đặt phòng
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/bookings`, {
          params: {
            pageNumber: 1,
            pageSize: 100,
            searchTerm: null,
            sortBy: 'MaDatPhong',
            sortOrder: 'ASC'
          }
        });
        if (response.data.success) {
          const bookingData = response.data.data;
          setBookings(bookingData);
          await fetchCustomerData(bookingData);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách đặt phòng:', error);
      }
    };
    fetchBookings();
  }, []);

  // Lấy danh sách loại phòng
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/room-types`, {
          params: {
            pageNumber: 1,
            pageSize: 100,
            sortBy: 'MaLoaiPhong',
            sortOrder: 'ASC'
          }
        });
        if (response.data.success) {
          const typesMap = {};
          response.data.data.forEach(type => {
            typesMap[type.maLoaiPhong] = type.tenLoaiPhong;
          });
          setRoomTypes(typesMap);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách loại phòng:', error);
      }
    };
    fetchRoomTypes();
  }, []);

  // Lấy danh sách phòng trống (dựa trên TrangThai = 'Sẵn sàng')
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/rooms`, {
          params: {
            pageNumber: 1,
            pageSize: 100,
            trangThai: 'Trống', // Lọc theo TrangThai
            tinhtrang: 'Đã dọn dẹp',
            sortBy: 'MaPhong',
            sortOrder: 'ASC'
          }
        });
        console.log('Dữ liệu phòng trống từ API:', response.data); // Log để kiểm tra
        if (response.data.success) {
          const rooms = response.data.data.map(room => ({
            id: room.soPhong,
            maLoaiPhong: room.loaiPhong,
            type: roomTypes[room.loaiPhong] || 'Chưa xác định'
          }));
          setAvailableRooms(rooms);
          console.log('Danh sách phòng trống đã được cập nhật:', rooms); // Log danh sách sau khi ánh xạ
        } else {
          console.error('API trả về không thành công:', response.data.message);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng trống:', error);
      }
    };

    if (Object.keys(roomTypes).length > 0) {
      fetchAvailableRooms();
    }
  }, [roomTypes]);

  // Lấy thông tin khách hàng
  const fetchCustomerData = async (bookingData) => {
    try {
      const customerPromises = bookingData.map(async (booking) => {
        try {
          const customerResponse = await axios.get(`${API_BASE_URL}/customers/${booking.maKhachHang}`);
          if (customerResponse.data.success) {
            return { [booking.maKhachHang]: customerResponse.data.data.hoTenKhachHang };
          }
          return { [booking.maKhachHang]: 'Unknown' };
        } catch (error) {
          return { [booking.maKhachHang]: 'Unknown' };
        }
      });
      const customersData = await Promise.all(customerPromises);
      const customersMap = Object.assign({}, ...customersData);
      setCustomers(customersMap);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu khách hàng:', error);
    }
  };

  // Lọc dữ liệu dựa trên searchTerm
  const filteredBookings = bookings.filter((booking) =>
    customers[booking.maKhachHang]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý chi tiết đặt phòng
  const handleDetails = async (maDatPhong) => {
    try {
      const bookingResponse = await axios.get(`${API_BASE_URL}/bookings/${maDatPhong}`);
      if (bookingResponse.data.success) {
        const booking = bookingResponse.data.data;
        const roomResponse = await axios.get(`${API_BASE_URL}/rooms/${booking.maPhong}`);
        let roomNumber = 'Chưa xác định';
        if (roomResponse.data.success) {
          roomNumber = roomResponse.data.data.soPhong;
        }
        setSelectedBooking({
          id: booking.maDatPhong,
          customerName: customers[booking.maKhachHang] || 'Unknown',
          bookingDate: new Date(booking.ngayDat).toLocaleDateString('vi-VN'),
          employeeName: 'Chu Ngọc Sơn',
          roomNumber: roomNumber,
          startDate: new Date(booking.gioCheckIn).toLocaleString('vi-VN'),
          endDate: new Date(booking.gioCheckOut).toLocaleString('vi-VN')
        });
        setShowDetailsModal(true);
      }
    } catch (error) {
      console.error('Lỗi khi tải chi tiết đặt phòng:', error);
    }
  };

  // Xử lý xóa đặt phòng
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingToDelete.id}`);
      if (response.data.success) {
        setBookings(bookings.filter((booking) => booking.maDatPhong !== bookingToDelete.id));
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
        const roomResponse = await axios.get(`${API_BASE_URL}/rooms`, {
          params: {
            pageNumber: 1,
            pageSize: 100,
            trangThai: 'Sẵn sàng',
            sortBy: 'MaPhong',
            sortOrder: 'ASC'
          }
        });
        if (roomResponse.data.success) {
          const rooms = roomResponse.data.data.map(room => ({
            id: room.soPhong,
            maLoaiPhong: room.loaiPhong,
            type: roomTypes[room.loaiPhong] || 'Chưa xác định'
          }));
          setAvailableRooms(rooms);
        }
      }
    } catch (error) {
      console.error('Lỗi khi xóa đặt phòng:', error);
    }
  };

  // Xử lý lưu đặt phòng từ form
  const handleSaveBooking = async () => {
    if (selectedRooms.length === 0) {
      alert('Vui lòng chọn ít nhất một phòng trước khi lưu.');
      return;
    }

    // Kiểm tra dữ liệu đầu vào
    if (!customerInfo.hoTen || !customerInfo.sdt) {
      alert('Vui lòng điền đầy đủ thông tin khách hàng (Họ tên và Số điện thoại).');
      return;
    }
    if (!bookingInfo.ngayBatDau || !bookingInfo.gioBatDau || !bookingInfo.ngayKetThuc || !bookingInfo.gioKetThuc) {
      alert('Vui lòng điền đầy đủ thông tin thời gian đặt phòng (Ngày và Giờ bắt đầu/kết thúc).');
      return;
    }

    try {
      // Bước 1: Tạo khách hàng mới
      console.log('Bắt đầu tạo khách hàng:', customerInfo);
      const customerResponse = await axios.post(`${API_BASE_URL}/customers`, {
        hoTenKhachHang: customerInfo.hoTen,
        email: `${customerInfo.sdt}@example.com`,
        dienThoai: customerInfo.sdt,
        maCT: '1'
      });
      console.log('Phản hồi từ API tạo khách hàng:', customerResponse.data);
      if (!customerResponse.data.success) {
        alert('Không thể tạo khách hàng: ' + customerResponse.data.message);
        return;
      }
      const maKhachHang = customerResponse.data.data;
      console.log('Mã khách hàng:', maKhachHang);

      // Bước 2: Tạo đặt phòng cho từng phòng đã chọn
      console.log('Bắt đầu tạo đặt phòng cho các phòng:', selectedRooms);
      const bookingPromises = selectedRooms.map(async (room) => {
        console.log('Tìm phòng với số phòng:', room.id);
        const roomResponse = await axios.get(`${API_BASE_URL}/rooms/search?soPhong=${room.id}`);
        console.log('Phản hồi từ API tìm phòng:', roomResponse.data);
        if (!roomResponse.data.success) {
          throw new Error(`Không tìm thấy phòng ${room.id}: ${roomResponse.data.message}`);
        }
        const maPhong = roomResponse.data.data.maPhong;
        if (!maPhong) {
          throw new Error(`Mã phòng không tồn tại cho phòng ${room.id}`);
        }
        console.log('Mã phòng:', maPhong);

        const checkIn = new Date(`${bookingInfo.ngayBatDau}T${bookingInfo.gioBatDau}:00`);
        const checkOut = new Date(`${bookingInfo.ngayKetThuc}T${bookingInfo.gioKetThuc}:00`);

        // Kiểm tra thời gian hợp lệ
        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
          throw new Error('Thời gian check-in hoặc check-out không hợp lệ.');
        }
        if (checkIn >= checkOut) {
          throw new Error('Thời gian check-out phải sau thời gian check-in.');
        }

        console.log('Thời gian check-in:', checkIn.toISOString());
        console.log('Thời gian check-out:', checkOut.toISOString());

        const bookingData = {
          maKhachHang: parseInt(maKhachHang),
          maPhong: parseInt(maPhong),
          gioCheckIn: checkIn.toISOString(),
          gioCheckOut: checkOut.toISOString(),
          ngayDat: new Date().toISOString(),
          loaiTinhTien: 'Nightly'
        };
        console.log('Dữ liệu gửi đến API đặt phòng:', bookingData);

        return axios.post(`${API_BASE_URL}/bookings`, bookingData);
      });

      const responses = await Promise.all(bookingPromises);
      console.log('Phản hồi từ API tạo đặt phòng:', responses.map(res => res.data));
      const allSuccess = responses.every((res) => res.data.success);
      if (allSuccess) {
        setShowSaveConfirm(true);
        setIsFormOpen(false);
        setSelectedRooms([]);
        setCustomerInfo({ hoTen: '', sdt: '' });
        setBookingInfo({ ngayBatDau: '', gioBatDau: '', ngayKetThuc: '', gioKetThuc: '' });

        // Làm mới danh sách đặt phòng
        const bookingResponse = await axios.get(`${API_BASE_URL}/bookings`, {
          params: { pageNumber: 1, pageSize: 100, sortBy: 'MaDatPhong', sortOrder: 'ASC' }
        });
        console.log('Danh sách đặt phòng sau khi làm mới:', bookingResponse.data);
        if (bookingResponse.data.success) {
          setBookings(bookingResponse.data.data);
          await fetchCustomerData(bookingResponse.data.data);
        }

        // Làm mới danh sách phòng trống
        const roomResponse = await axios.get(`${API_BASE_URL}/rooms`, {
          params: {
            pageNumber: 1,
            pageSize: 100,
            trangThai: 'Sẵn sàng',
            sortBy: 'MaPhong',
            sortOrder: 'ASC'
          }
        });
        console.log('Danh sách phòng trống sau khi làm mới:', roomResponse.data);
        if (roomResponse.data.success) {
          const rooms = roomResponse.data.data.map(room => ({
            id: room.soPhong,
            maLoaiPhong: room.loaiPhong,
            type: roomTypes[room.loaiPhong] || 'Chưa xác định'
          }));
          setAvailableRooms(rooms);
        }
      } else {
        const failedResponse = responses.find(res => !res.data.success);
        throw new Error(`Tạo đặt phòng thất bại: ${failedResponse?.data.message || 'Không có thông tin lỗi'}`);
      }
    } catch (error) {
      console.error('Lỗi khi tạo đặt phòng:', error);
      alert('Đã xảy ra lỗi khi tạo đặt phòng: ' + error.message);
    }
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingInfoChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    window.location.href = '/';
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleSaveConfirm = () => {
    setShowSaveConfirm(false);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const booking = bookings.find((b) => b.maDatPhong === id);
    setBookingToDelete({ id: booking.maDatPhong });
    setShowDeleteConfirm(true);
  };

  const handleAddBooking = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRooms([]);
    setCustomerInfo({ hoTen: '', sdt: '' });
    setBookingInfo({ ngayBatDau: '', gioBatDau: '', ngayKetThuc: '', gioKetThuc: '' });
  };

  const handleAddRoom = (room) => {
    setSelectedRooms([...selectedRooms, { ...room, guests: 1 }]);
    setAvailableRooms(availableRooms.filter((r) => r.id !== room.id));
  };

  const handleRemoveRoom = (roomId) => {
    const removedRoom = selectedRooms.find((r) => r.id === roomId);
    setSelectedRooms(selectedRooms.filter((room) => room.id !== roomId));
    setAvailableRooms([...availableRooms, removedRoom]);
  };

  const handleMoreOptions = () => {
    console.log('Mở tùy chọn bổ sung');
  };

  return (
    <div className="booking-list-container">
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
          <div className="top-title">Đặt Phòng</div>
        </div>
        <div className="more-icon" onClick={handleMoreOptions}>⋮</div>
      </div>

      <div className="content-wrapperr">
        <div className="search-bar-container">
          <div className="search-barr">
            <span className="search-icon"><img src="/icon_LTW/TimKiem.png" alt="Tìm kiếm"></img></span>
            <input
              type="text"
              placeholder="Tìm theo tên khách hàng"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="add-booking-button" onClick={handleAddBooking}>
            Đặt phòng
          </button>
        </div>

        <div className="table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Số phiếu thuê</th>
                <th>Tên khách hàng</th>
                <th>Ngày lập phiếu</th>
                <th>Tên nhân viên</th>
                <th>Chi tiết</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.maDatPhong}>
                  <td>{booking.maDatPhong}</td>
                  <td>{customers[booking.maKhachHang] || 'Unknown'}</td>
                  <td>{new Date(booking.ngayDat).toLocaleDateString('vi-VN')}</td>
                  <td>Chu Ngọc Sơn</td>
                  <td>
                    <button
                      className="details-buttonn"
                      onClick={() => handleDetails(booking.maDatPhong)}
                    >
                      <img src="/icon_LTW/ChiTiet.png" alt="Chi tiết"></img>
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(booking.maDatPhong)}
                    >
                      <img src="/icon_LTW/Xoa.png" alt="Xóa"></img>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <div className="booking-form-overlay">
          <div className="booking-form-container">
            <h2 className="booking-form-title">Đặt Phòng</h2>

            <div className="form-sections">
              <div className="form-section">
                <h3>Thông tin khách hàng</h3>
                <div className="form-group">
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/ĐP_Hoten.png" alt="Họ tên"></img></span>
                    <input
                      type="text"
                      name="hoTen"
                      placeholder="Họ và tên"
                      value={customerInfo.hoTen}
                      onChange={handleCustomerInfoChange}
                    />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/ĐP_SĐT.png" alt="SĐT"></img></span>
                    <input
                      type="text"
                      name="sdt"
                      placeholder="Nhập SĐT"
                      value={customerInfo.sdt}
                      onChange={handleCustomerInfoChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Thông tin phòng</h3>
                <div className="form-group">
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/Lich.png" alt="Ngày bắt đầu"></img></span>
                    <input
                      type="date"
                      name="ngayBatDau"
                      placeholder="Ngày bắt đầu"
                      value={bookingInfo.ngayBatDau}
                      onChange={handleBookingInfoChange}
                    />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/DongHo.png" alt="Giờ bắt đầu"></img></span>
                    <input
                      type="time"
                      name="gioBatDau"
                      placeholder="Giờ bắt đầu"
                      value={bookingInfo.gioBatDau}
                      onChange={handleBookingInfoChange}
                    />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/Lich.png" alt="Ngày kết thúc"></img></span>
                    <input
                      type="date"
                      name="ngayKetThuc"
                      placeholder="Ngày kết thúc"
                      value={bookingInfo.ngayKetThuc}
                      onChange={handleBookingInfoChange}
                    />
                  </div>
                  <div className="form-row">
                    <span className="form-icon"><img src="/icon_LTW/DongHo.png" alt="Giờ kết thúc"></img></span>
                    <input
                      type="time"
                      name="gioKetThuc"
                      placeholder="Giờ kết thúc"
                      value={bookingInfo.gioKetThuc}
                      onChange={handleBookingInfoChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rooms-scrollable-container">
              <div className="rooms-container">
                <div className="rooms-section">
                  <h4>Danh sách phòng trống</h4>
                  <table className="room-table">
                    <thead>
                      <tr>
                        <th>Số phòng</th>
                        <th>Loại phòng</th>
                        <th>Thêm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availableRooms.length > 0 ? (
                        availableRooms.map((room) => (
                          <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.type}</td>
                            <td>
                              <button
                                className="action-button add-room-button"
                                onClick={() => handleAddRoom(room)}
                              >
                                <img src="/icon_LTW/MdiPlusCircle.png" alt="Thêm phòng"></img>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">Không có phòng trống</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="rooms-section">
                  <h4>Phòng đã chọn</h4>
                  <table className="room-table">
                    <thead>
                      <tr>
                        <th>Số phòng</th>
                        <th>Loại phòng</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRooms.length > 0 ? (
                        selectedRooms.map((room) => (
                          <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.type}</td>
                            <td>
                              <button
                                className="action-button remove-room-button"
                                onClick={() => handleRemoveRoom(room.id)}
                              >
                                <img src="/icon_LTW/MdiMinusCircle.png" alt="Xóa phòng"></img>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">Chưa có phòng nào được chọn</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="form-buttons">
              <button className="cancel-buttonn" onClick={handleSaveBooking}>LƯU</button>
              <button className="cancel-buttonn" onClick={handleCloseForm}>THOÁT</button>
            </div>
          </div>
        </div>
      )}

      {showSaveConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={handleSaveConfirm}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn đã đặt phòng thành công !</p>
            <div className="logout-modal-buttons">
              <button className="confirm-button" onClick={handleSaveConfirm}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && bookingToDelete && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <span className="close-icon" onClick={() => setShowDeleteConfirm(false)}><img src="/icon_LTW/FontistoClose.png" alt="#"></img></span>
            <div className="logout-modal-header">
              <span className="header-text">Thông Báo</span>
            </div>
            <p className="logout-message">Bạn có muốn xóa khách hàng này?</p>
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

      {showDetailsModal && selectedBooking && (
        <div className="details-modal">
          <div className="details-modal-contentt">
            <h2 className="details-modal-title">Chi Tiết Phiếu Thuê {selectedBooking.id}</h2>
            <div className="details-modal-header">
              <div className="header-item">
                <span role="img" aria-label="user"><img src="/icon_LTW/ĐP_Chitietphieuthue.png" alt="Khách hàng"></img></span>
                {selectedBooking.customerName}
              </div>
              <div className="header-item">
                <span role="img" aria-label="calendar"><img src="/icon_LTW/Lich.png" alt="Ngày lập"></img></span>
                {selectedBooking.bookingDate}
              </div>
              <div className="header-item">
                <span role="img" aria-label="employee"><img src="/icon_LTW/ĐPChitietphieuthue2.png" alt="Nhân viên"></img></span>
                {selectedBooking.employeeName}
              </div>
            </div>
            <table className="bk-details-table">
              <thead>
                <tr>
                  <th>Số phòng</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedBooking.roomNumber || 'Không xác định'}</td>
                  <td>{selectedBooking.startDate || 'Không xác định'}</td>
                  <td>{selectedBooking.endDate || 'Không xác định'}</td>
                </tr>
              </tbody>
            </table>
            <div className="details-modal-buttons">
              <button className="close-details-buttonn" onClick={handleCloseDetails}>
                Thoát
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingList;