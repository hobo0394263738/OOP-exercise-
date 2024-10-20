import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import RoomType from './RoomType.js'; // Import model RoomType

const Room = sequelize.define('Room', {
  room_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('available', 'booked', 'occupied', 'maintenance'),
    defaultValue: 'available'
  }
}, {
  timestamps: true
});

// Thiết lập quan hệ với RoomType và chỉ định khoá ngoại
Room.belongsTo(RoomType, { foreignKey: 'room_type_id', as: 'RoomType' });

export default Room;
