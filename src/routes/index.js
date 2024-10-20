import express from 'express';
import AuthController from '../controllers/AuthController.js';
import RoomTypeController from '../controllers/RoomTypeController.js';
import RoomController from '../controllers/RoomController.js';
import BookingController from '../controllers/BookingController.js';

const router = express.Router();

// Route for rendering the homepage with a list of rooms
router.get('/', RoomController.renderHomePage);

// Route for rendering the room details page
router.get('/room/:id', RoomController.renderRoomDetailsPage);

// Route cho trang đăng nhập
router.get('/login', (req, res) => {
  res.render('layouts/public-layout', {
    title: 'Đăng nhập',
    body: '../login',
    user: req.session.user // Truyền thông tin user từ session vào EJS
  });
});

// Route xử lý đăng nhập (POST)
router.post('/login', AuthController.login);

router.get('/register', (req, res) => {
  res.render('layouts/public-layout', {
    title: 'Đăng ký',
    body: '../register',
    user: req.session.user
  });
});

// Route xử lý đăng ký (POST)
router.post('/register', AuthController.register);

router.get('/admin', (req, res) => {
  res.render('layouts/admin-layout', { 
    title: 'Admin Home', 
    body: '../admin/admin-home'  // Đường dẫn tới file room-types.ejs
  });
});

router.get('/admin/room-types', RoomTypeController.renderRoomTypesPage);

// Route hiển thị form thêm loại phòng mới
router.get('/admin/room-types/add', (req, res) => {
  res.render('layouts/admin-layout', {
    title: 'Thêm Loại Phòng',
    body: '../admin/add-room-type'  // File EJS cho form thêm loại phòng
  });
});

// Route xử lý thêm loại phòng mới (POST)
router.post('/admin/room-types/add', RoomTypeController.addRoomType);

// Route hiển thị trang quản lý phòng
router.get('/admin/rooms', RoomController.renderRoomsPage);

// Route to render the "Add Room" page
router.get('/admin/room/add', RoomController.renderAddRoomPage);

// Route to handle room creation
router.post('/admin/room/add', RoomController.addRoom);

// Route to render the "Edit Room" page
router.get('/admin/room/edit/:id', RoomController.renderEditRoomPage);

// Route to handle the room update submission
router.post('/admin/room/edit/:id', RoomController.updateRoom);

// Route để xử lý việc đặt phòng
router.get('/room/book/:id', BookingController.createBooking);

// Route hiển thị danh sách phòng đã đặt của 1 khách hàng
router.get('/my-bookings', BookingController.getMyBookings);

// Route cho logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/'); // Nếu có lỗi khi xóa session, điều hướng về trang chủ
    }
    res.redirect('/login'); // Điều hướng đến trang login sau khi đăng xuất
  });
});

export default router;
