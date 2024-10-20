import Room from '../models/Room.js';
import RoomType from '../models/RoomType.js';

class RoomService {
  static async getAllRooms() {
    try {
      const rooms = await Room.findAll({
        include: [{
          model: RoomType,
          as: 'RoomType'
        }]
      });
      return rooms
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách phòng: ${error.message}`);
    } 
  }

  static async createRoom({ room_number, room_type_id, status }) {
    try {
      const newRoom = await Room.create({
        room_number,
        room_type_id,
        status
      });
      return newRoom;
    } catch (error) {
      throw new Error(`Lỗi khi thêm phòng: ${error.message}`);
    }
  }

  static async getRoomById(id) {
    try {
      const room = await Room.findOne({
        where: { id },
        include: [{ model: RoomType, as: 'RoomType' }]
      });
      return room;
    } catch (error) {
      throw new Error(`Lỗi khi lấy phòng: ${error.message}`);
    }
  }

  // Update room details
  static async updateRoom(id, updatedData) {
    try {
      const room = await Room.findByPk(id);
      if (!room) {
        throw new Error('Phòng không tồn tại');
      }
      await room.update(updatedData);
      return room;
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật phòng: ${error.message}`);
    }
  }
}

export default RoomService;
