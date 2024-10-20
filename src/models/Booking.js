import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';  // Import model User
import Room from './Room.js';  // Import model Room

const Booking = sequelize.define('Booking', {
  check_in_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  check_out_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('booked', 'checked_in', 'checked_out'),
    defaultValue: 'booked'
  }
}, {
  timestamps: true
});

// Thiết lập quan hệ với User và Room
Booking.belongsTo(User);
Booking.belongsTo(Room);

export default Booking;
