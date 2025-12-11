export class Navbar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        // Giả lập check login từ localStorage
        this.isLoggedIn = localStorage.getItem('token') ? true : false;
        this.user = { name: "Minh Tuấn", avatar: "assets/images/avatar-5.png" }; // Ảnh avatar giả lập
    }

    render() {
        // 1. Định nghĩa menu links
        const menuLinks = [
            { label: 'Home', href: '/index.html' },
            { label: 'Quizzes', href: '/quizzes.html' },
            { label: 'About', href: '/about.html' },
            { label: 'Contact', href: '/contact.html' }
        ];

        // Logic: Thêm Management nếu đã login
        if (this.isLoggedIn) {
            menuLinks.splice(2, 0, { label: 'Management', href: '/management.html' });
        }

        // 2. Tạo HTML cho menu items
        const menuHTML = menuLinks.map(link => 
            `<a href="${link.href}" class="navbar__link">${link.label}</a>`
        ).join('');

        // 3. Tạo HTML cho phần Auth (Login/Avatar)
        const authHTML = this.isLoggedIn ? this._renderAuth() : this._renderUnauth();

        // 4. Render cấu trúc chính
        this.container.innerHTML = `
            <nav class="navbar">
                <div class="navbar-container">
                    <div class="navbar__brand">
                        <img src="assets/icons/logo.png" alt="Logo" class="navbar__logo-img"> 
                        <span>Quizzes</span>
                    </div>
                    
                    <div class="navbar__menu">
                        ${menuHTML}
                    </div>
                    
                    <div class="navbar__auth">
                        ${authHTML}
                    </div>
                </div>
            </nav>
        `;
        
        // Gắn sự kiện click cho menu user nếu đã login
        if (this.isLoggedIn) this._attachEvents();
    }

    _renderUnauth() {
        return `
            <div class="navbar__btns">
                <a href="/login-form.html" class="btn btn--secondary">Login</a>
                <a href="/register-form.html" class="btn btn--primary">Register</a>
            </div>
        `;
    }

    _renderAuth() {
        return `
            <div class="user-info" id="user-trigger">
                 <img src="${this.user.avatar}" class="user-avatar" alt="User">
            </div>
            
            <div class="context-menu" id="context-menu">
                <a href="#" class="context-menu__item">${this.user.name}</a>
                <div class="divider"></div>
                <a href="#" class="context-menu__item">Change password</a>
                <div class="divider"></div>
                <a href="#" class="context-menu__item text-danger" id="btn-logout">Logout</a>
            </div>
        `;
    }

    _attachEvents() {
        const trigger = document.getElementById('user-trigger');
        const menu = document.getElementById('context-menu');

        // Toggle menu khi click avatar
        if(trigger && menu) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('active');
            });
        }

        // Đóng menu khi click ra ngoài
        document.addEventListener('click', () => {
            if(menu) menu.classList.remove('active');
        });
        
        // Xử lý logout (Demo)
        const logoutBtn = document.getElementById('btn-logout');
        if(logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('token');
                window.location.reload();
            });
        }
    }
}