import RoomService from '../services/RoomService.js';
import RoomTypeService from '../services/RoomTypeService.js'; 

class RoomController {
  // Render the homepage with a list of rooms inside the public layout
  static async renderHomePage(req, res) {
    try {
      const rooms = await RoomService.getAllRooms(); // Fetch all rooms
      res.render('layouts/public-layout', {
        title: 'Trang Chủ',
        body: '../index',
        user: req.session.user,
        rooms
      });
    } catch (error) {
      res.render('layouts/public-layout', {
        title: 'Trang Chủ',
        body: '../index',
        error: 'Có lỗi xảy ra khi tải danh sách phòng',
        user: req.session.user 
      });
    }
  }

  // Render the room details page inside the public layout
  static async renderRoomDetailsPage(req, res) {
    const { id } = req.params;
    try {
      const room = await RoomService.getRoomById(id);
      if (!room) {
        return res.redirect('/');
      }
      res.render('layouts/public-layout', {
        title: `Chi Tiết Phòng ${room.room_number}`,
        body: '../room-details',
        user: req.session.user,
        room
      });
    } catch (error) {
      res.redirect('/');
    }
  }

  // Hiển thị trang quản lý phòng
  static async renderRoomsPage(req, res) {
    try {
      const rooms = await RoomService.getAllRooms(); // Lấy danh sách phòng từ service
      res.render('layouts/admin-layout', {
        title: 'Quản lý Phòng',
        body: '../admin/rooms',  // Passing the body template path
        rooms                    // Passing the rooms data
      });
    } catch (error) {
      res.render('layouts/admin-layout', {
        title: 'Quản lý Phòng',
        body: '../admin/rooms',
        error: 'Có lỗi xảy ra khi lấy dữ liệu phòng'  // Hiển thị thông báo lỗi nếu có
      });
    }
  }

  // Render the "Add Room" page within the layout
  static async renderAddRoomPage(req, res) {
    try {
      const roomTypes = await RoomTypeService.getAllRoomTypes(); // Fetch all room types for selection
      res.render('layouts/admin-layout', { 
        title: 'Thêm Phòng', 
        body: '../admin/add-room', // Path to the EJS template for the add-room page
        roomTypes
      });
    } catch (error) {
      res.render('layouts/admin-layout', {
        title: 'Thêm Phòng',
        body: '../admin/add-room',
        error: 'Có lỗi xảy ra khi tải trang'
      });
    }
  }

  // Handle adding a new room
  static async addRoom(req, res) {
    const { room_number, room_type_id, status } = req.body;

    // Basic validation
    if (!room_number || !room_type_id) {
      req.session.error = 'Vui lòng điền đầy đủ thông tin cần thiết';
      return res.redirect('/admin/room/add');
    }

    try {
      await RoomService.createRoom({ room_number, room_type_id, status });
      req.session.success = 'Phòng đã được thêm thành công';
      return res.redirect('/admin/rooms');
    } catch (error) {
      req.session.error = `Có lỗi xảy ra: ${error.message}`;
      return res.redirect('/admin/room/add');
    }
  }

  static async renderEditRoomPage(req, res) {
  const { id } = req.params;
  try {
    const room = await RoomService.getRoomById(id); // Fetch the room details by ID
    const roomTypes = await RoomTypeService.getAllRoomTypes(); // Fetch available room types
    if (!room) {
      req.session.error = 'Không tìm thấy phòng';
      return res.redirect('/admin/rooms');
    }
    // Render with admin layout
    res.render('layouts/admin-layout', {
      title: 'Sửa Phòng',
      body: '../admin/edit-room', // Path to the EJS template for editing a room
      room,
      roomTypes
    });
  } catch (error) {
    req.session.error = `Có lỗi xảy ra: ${error.message}`;
    res.redirect('/admin/rooms');
  }
}

  // Handle the room update
  static async updateRoom(req, res) {
    const { id } = req.params;
    const { room_number, room_type_id, status } = req.body;

    // Basic validation
    if (!room_number || !room_type_id || !status) {
      req.session.error = 'Vui lòng điền đầy đủ thông tin';
      return res.redirect(`/admin/room/edit/${id}`);
    }

    try {
      await RoomService.updateRoom(id, { room_number, room_type_id, status });
      req.session.success = 'Phòng đã được cập nhật thành công';
      res.redirect('/admin/rooms');
    } catch (error) {
      req.session.error = `Có lỗi xảy ra: ${error.message}`;
      res.redirect(`/admin/room/edit/${id}`);
    }
  }
}

export default RoomController;
