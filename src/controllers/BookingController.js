import BookingService from '../services/BookingService.js';
import RoomService from '../services/RoomService.js';

class BookingController {

    static async createBooking(req, res) {
        const { id } = req.params;
        const user = req.session.user;

        if (!user) {
            return res.redirect('/login');
        }

        const { check_in_date, check_out_date } = req.body;

        try {
            const booking = await BookingService.createBooking({
                userId: user.id,
                roomId: id,
                check_in_date,
                check_out_date,
            });

            req.session.success = 'Đặt phòng thành công!';
            return res.redirect(`/room/${id}`);
        } catch (error) {
            console.log(error.message)
            req.session.error = `Có lỗi xảy ra khi đặt phòng: ${error.message}`;
            return res.redirect(`/room/book/${id}`);
        }
    }

  // Lấy danh sách phòng đã đặt của người dùng hiện tại
    static async getMyBookings(req, res) {
        const user = req.session.user;

        if (!user) {
            return res.redirect('/login');
        }

        try {
            const bookings = await BookingService.getUserBookings(user.id);
            res.render('layouts/public-layout', { 
                title: 'Phòng đã đặt', 
                body: '../my-bookings',
                bookings,
                user: req.session.user
            });
        } catch (error) {
            req.session.error = `Có lỗi xảy ra: ${error.message}`;
            return res.redirect('/');
        }
    }

}

export default BookingController;
