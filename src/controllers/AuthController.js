import UserService from '../services/UserService.js';
import bcrypt from 'bcrypt';

class AuthController {
    static async register(req, res) {
        const { username, email, password, confirmPassword } = req.body;

        // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
        if (password !== confirmPassword) {
            return res.render('layouts/public-layout', { 
                title: 'Đăng ký', 
                body: '../register', 
                error: 'Mật khẩu và xác nhận mật khẩu không khớp' 
            });
        }

        try {
            // Kiểm tra xem email đã được sử dụng chưa
            const existingUser = await UserService.findUserByEmail(email);
            if (existingUser) {
                return res.render('layouts/public-layout', { 
                title: 'Đăng ký', 
                body: '../register', 
                error: 'Email này đã được sử dụng' 
                });
            }

            // Tạo người dùng mới
            const user = await UserService.createUser(username, email, password);

            // Nếu đăng ký thành công, chuyển hướng người dùng đến trang đăng nhập
            return res.redirect('/login');
        } catch (error) {
            return res.render('layouts/public-layout', { 
                title: 'Đăng ký', 
                body: '../register', 
                error: error.message 
            });
        }
    }

    // Xử lý đăng nhập
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            // Tìm người dùng theo email
            const user = await UserService.findUserByEmail(email);
            
            if (!user) {
                return res.render('layouts/public-layout', {
                    title: 'Đăng nhập',
                    body: '../login',
                    error: 'Email hoặc mật khẩu không đúng'
                });
            }

            // Kiểm tra mật khẩu
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.render('layouts/public-layout', {
                        title: 'Đăng nhập',
                        body: '../login',
                        error: 'Email hoặc mật khẩu không đúng'
                    });
            }

            // Lưu thông tin người dùng vào session
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role
            };

            // Xác định vai trò của người dùng và chuyển hướng
            if (user.role === 'admin') {
                return res.redirect('/admin'); // Trang chủ của admin
            } else {
                return res.redirect('/'); // Trang chủ public
            }

        } catch (error) {
            return res.render('layouts/public-layout', {
                title: 'Đăng nhập',
                body: '../login',
                error: 'Có lỗi xảy ra, vui lòng thử lại'
            });
        }
    }

}

export default AuthController;
