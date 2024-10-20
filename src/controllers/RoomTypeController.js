import RoomTypeService from '../services/RoomTypeService.js';

class RoomTypeController {
    static async renderRoomTypesPage(req, res) {
        try {
            const roomTypes = await RoomTypeService.getAllRoomTypes();
            res.render('layouts/admin-layout', {
                title: 'Quản lý Loại Phòng',
                body: '../admin/room-types',
                roomTypes
            });
        } catch (error) {
            res.render('layouts/admin-layout', {
                title: 'Quản lý Loại Phòng',
                body: '../admin/room-types',
                error: 'Có lỗi xảy ra khi lấy dữ liệu loại phòng'
            });
        }
    }

    static async addRoomType(req, res) {
        const { name, price, description } = req.body;

        if (!name || !price) {
            req.session.error = 'Vui lòng điền đủ thông tin cần thiết';
            return res.redirect('/admin/room-types/add');
        }

        try {
            await RoomTypeService.createRoomType(name, price, description);
            req.session.success = 'Loại phòng mới đã được thêm thành công';
            return res.redirect('/admin/room-types');
        } catch (error) {
            req.session.error = `Lỗi khi thêm loại phòng: ${error.message}`;
            return res.redirect('/admin/room-types/add');
        }
    }
}

export default RoomTypeController;
