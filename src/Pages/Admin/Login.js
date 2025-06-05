// src/components/Admin/Login.js (Hoặc đường dẫn tương ứng)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios trực tiếp
import '../../Design_Css/Admin/Login.css'; // Đảm bảo đường dẫn CSS đúng
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Lấy baseURL từ biến môi trường
const API_BASE_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState(null);
  const navigate = useNavigate();

  const mapMaVaiTroToRole = (maVaiTro) => {
    console.log('MaVaiTro received by mapMaVaiTroToRole:', maVaiTro);
    switch (parseInt(maVaiTro, 10)) {
      case 1:
        return 'admin';
      case 2:
        return 'staff';
      default:
        return 'unknown';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // VERIFY WITH BACKEND: Endpoint 'auth/login' có chính xác không?
    const loginEndpoint = `${API_BASE_URL}/auth/login`; 

    try {
      const response = await axios.post(loginEndpoint, { // Sử dụng axios.post với URL đầy đủ
        // VERIFY WITH BACKEND: Tên các trường 'TenTaiKhoan' và 'MatKhau' có khớp không?
        TenTaiKhoan: username,
        MatKhau: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Nếu API cần token (dù trang Login thường không cần gửi token có sẵn), bạn có thể thêm ở đây
          // Ví dụ: Authorization: `Bearer ${localStorage.getItem('some_other_token')}`
        }
      });
      console.log('Full Response from backend:', response.data);

      // VERIFY WITH BACKEND: Backend có trả về trường 'success' (boolean) không?
      if (!response.data.success) {
        setError(response.data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra tên đăng nhập và mật khẩu.');
        setLoading(false);
        return;
      }

      // VERIFY WITH BACKEND: Dữ liệu chính (token, role) có nằm trong một object con tên là 'data' không?
      if (!response.data.data) {
        setError('Không nhận được đối tượng "data" từ server. Vui lòng thử lại.');
        setLoading(false);
        return;
      }

      const responseData = response.data.data;
      // VERIFY WITH BACKEND: Tên chính xác của trường chứa access token là gì?
      const accessToken = responseData.accessToken || responseData.AccessToken || responseData.token;
      // VERIFY WITH BACKEND: Tên chính xác của trường chứa mã vai trò là gì?
      const maVaiTro = responseData.MaVaiTro || responseData.maVaiTro || responseData.role || responseData.Role;

      console.log('Extracted - accessToken:', accessToken, 'MaVaiTro:', maVaiTro);

      if (!accessToken || maVaiTro === undefined || maVaiTro === null) {
        setError('Dữ liệu đăng nhập không hợp lệ: Thiếu accessToken hoặc MaVaiTro từ response của backend.');
        setLoading(false);
        return;
      }

      const role = mapMaVaiTroToRole(maVaiTro);
      console.log('Mapped Role:', role);

      if (role === 'unknown') {
          setError(`Mã vai trò không xác định: ${maVaiTro}. Vui lòng liên hệ quản trị viên.`);
          setLoading(false);
          return;
      }

      try {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('role', role);
        console.log('Stored in localStorage - Token:', localStorage.getItem('token'), 'Role:', localStorage.getItem('role'));
      } catch (storageError) {
        console.error('Failed to save to localStorage:', storageError);
        setError('Không thể lưu thông tin đăng nhập. Vui lòng thử lại.');
        setLoading(false);
        return;
      }

      setLoggedInRole(role);
    } catch (err) {
      console.error('Login request failed:', err);
      if (err.response) {
        setError(err.response.data.message || err.response.data.title || 'Đăng nhập thất bại. Lỗi từ server.');
        console.error('Backend error response:', err.response.data);
      } else if (err.request) {
        setError('Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối mạng và URL backend.');
        console.error('No response received:', err.request);
      } else {
        setError('Đăng nhập thất bại. Có lỗi xảy ra trong quá trình gửi yêu cầu.');
        console.error('Error setting up request:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInRole) {
      console.log('useEffect for navigation triggered with role:', loggedInRole);
      if (loggedInRole === 'admin') {
        console.log('Attempting to navigate to /Dashboard');
        navigate('/Dashboard', { replace: true });
      } else if (loggedInRole === 'staff') {
        console.log('Attempting to navigate to /Staff/Dashboard');
        navigate('/Staff/Dashboard', { replace: true });
      } else {
        console.warn('Invalid role for navigation after login:', loggedInRole);
      }
    }
  }, [loggedInRole, navigate]);

  return (
    <div className="login-container">
      <div className="logologin">
        <img src="/icon_LTW/LogoDeBugTeam.jpg" alt="Logo" />
      </div>
      <div className="login-box">
        <h2>Đăng Nhập</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <span className="icon">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="buttonlogin">
            <button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đăng Nháp'} {/* Sửa lại thành Đăng Nhập nếu đây là lỗi chính tả */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;