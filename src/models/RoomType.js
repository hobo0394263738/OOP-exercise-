import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RoomType = sequelize.define('RoomType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER, // Giá tiền là số nguyên
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

export default RoomType;
