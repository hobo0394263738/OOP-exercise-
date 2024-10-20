import { Sequelize } from 'sequelize';

// Khởi tạo kết nối đến MySQL
const sequelize = new Sequelize('db_ql_ks', 'root', '', {
  host: 'localhost',  // Thay đổi nếu cần
  dialect: 'mysql',
});

export default sequelize;
