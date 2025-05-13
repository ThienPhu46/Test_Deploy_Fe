import React from 'react';
import './RoomCard.css';

const RoomCard = ({ roomNumber, status, date, roomType, condition }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'Phòng trống':
        return 'room-available';
      case 'Phòng đã đặt':
        return 'room-booked';
      case 'Phòng đang thuê':
        return 'room-occupied';
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'Phòng trống':
        return '✖';
      case 'Phòng đã đặt':
        return '✓';
      case 'Phòng đang thuê':
        return '👤';
      default:
        return '';
    }
  };

  return (
    <div className={`room-card ${getStatusClass()}`}>
      <div className="room-header">
        <span>{roomNumber} ({roomType})</span>
        <span className="status-text">{status}</span>
      </div>
      <div className="room-content">
        <span className="status-icon">{getStatusIcon()}</span>
        <span className="content-status">{status}</span>
      </div>
      <div className="room-footer">
        <span>📅 {date}</span>
        <span>{condition}</span>
      </div>
    </div>
  );
};

export default RoomCard;