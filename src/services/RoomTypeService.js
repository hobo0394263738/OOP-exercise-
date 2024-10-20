import RoomType from '../models/RoomType.js';

class RoomTypeService {
    // Tạo loại phòng mới
    static async createRoomType(name, price, description) {
        try {
            // Thêm loại phòng mới vào database
            const newRoomType = await RoomType.create({
                name,
                price,
                description
              });
            return newRoomType;
        } catch (error) {
            throw new Error(`Lỗi khi tạo loại phòng mới: ${error.message}`);
        }
    }

    // Lấy danh sách loại phòng từ database
    static async getAllRoomTypes() {
        try {
            const roomTypes = await RoomType.findAll(); // Lấy tất cả các loại phòng
            return roomTypes;
        } catch (error) {
            throw new Error(`Lỗi khi lấy danh sách loại phòng: ${error.message}`);
        }
    }
}

export default RoomTypeService;
