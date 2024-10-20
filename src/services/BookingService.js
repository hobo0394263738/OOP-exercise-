import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import RoomType from '../models/RoomType.js';

class BookingService {
  static async createBooking({ userId, roomId, check_in_date, check_out_date }) {
    try {
      // Tìm phòng theo ID và kết hợp với RoomType
      const room = await Room.findOne({
        where: { id: roomId },
        include: [{ model: RoomType, as: 'RoomType' }] // Include RoomType to access price
      });

      if (!room || room.status !== 'available') {
        throw new Error('Phòng không khả dụng');
      }

      const total_price = room.RoomType.price; // Lấy giá từ RoomType

      // Tạo booking mới
      const booking = await Booking.create({
        check_in_date,
        check_out_date,
        total_price,
        UserId: userId,
        RoomId: roomId,
      });

      // Cập nhật trạng thái phòng thành 'booked'
      await room.update({ status: 'booked' });

      return booking;
    } catch (error) {
      throw new Error(`Có lỗi xảy ra khi đặt phòng: ${error.message}`);
    }
  }

  static async getUserBookings(userId) {
    try {
      const bookings = await Booking.findAll({
        where: { userId }, // Lấy booking theo ID người dùng
        include: [
          { model: Room, include: [{ model: RoomType, as: 'RoomType' }] } // Bao gồm thông tin phòng và loại phòng
        ]
      });

      return bookings;
    } catch (error) {
      throw new Error(`Có lỗi xảy ra khi lấy danh sách phòng đã đặt: ${error.message}`);
    }
  }
}

export default BookingService;
