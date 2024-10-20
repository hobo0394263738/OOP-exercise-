import User from '../models/User.js';
import bcrypt from 'bcrypt';

class UserService {
  // Tạo mới người dùng
  static async createUser(username, email, password) {
    try {
      // Mã hóa mật khẩu trước khi lưu
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Tạo người dùng mới với vai trò mặc định là 'guest'
      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        role: 'guest' // Mặc định là khách hàng
      });

      return user;
    } catch (error) {
      throw new Error(`Lỗi khi tạo người dùng: ${error.message}`);
    }
  }

  // Tìm người dùng theo email để kiểm tra nếu đã tồn tại
  static async findUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error(`Lỗi khi tìm người dùng: ${error.message}`);
    }
  }
}

export default UserService;
