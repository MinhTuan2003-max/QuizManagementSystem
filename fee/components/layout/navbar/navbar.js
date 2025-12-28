export class Navbar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.isLoggedIn = localStorage.getItem('token') ? true : false;
        this.user = { name: "Minh Tuấn", avatar: "assets/images/avatar-5.png" };
    }

    render() {
        const menuLinks = [
            { label: 'Home', href: '/index.html' },
            { label: 'Quizzes', href: '/quizzes.html' },
            { label: 'About', href: '/about.html' },
            { label: 'Contact', href: '/contact.html' }
        ];

        if (this.isLoggedIn) {
            menuLinks.splice(2, 0, { label: 'Management', href: '/management.html' });
        }

        const menuHTML = menuLinks.map(link => 
            `<li><a href="${link.href}" class="navbar__link">${link.label}</a></li>`
        ).join('');

        const authHTML = this.isLoggedIn ? this._renderAuth() : this._renderUnauth();

        this.container.innerHTML = `
            <nav class="navbar">
                <div class="navbar-container">
                    <button class="navbar__mobile-toggle" id="mobile-toggle">
                        ☰
                    </button>

                    <a href="/index.html" class="navbar__brand">
                        <img src="assets/icons/logo.png" alt="Logo" class="navbar__logo-img"> 
                        <span>Quizzes</span>
                    </a>
                    
                    <div class="navbar__menu" id="navbar-menu">
                        <ul class="navbar__list">
                            ${menuHTML}
                        </ul>
                    </div>
                    
                    <div class="navbar__auth">
                        ${authHTML}
                    </div>
                </div>
            </nav>
        `;
        
        this._attachEvents();
    }

    _renderUnauth() {
        return `
            <div class="navbar__btns">
                <a href="/login-form.html" class="btn btn--secondary" style="text-decoration: none;">Login</a>
                <a href="/register-form.html" class="btn btn--primary" style="text-decoration: none;">Register</a>
            </div>
        `;
    }

    _renderAuth() {
        return `
            <div class="user-info" id="user-trigger">
                 <img src="${this.user.avatar}" class="user-avatar" alt="User Avatar">
            </div>
            
            <div class="context-menu" id="context-menu">
                <div class="context-menu__header" style="padding: 12px 16px; border-bottom: 1px solid #eee; font-weight: 600;">
                    ${this.user.name}
                </div>
                <a href="#" class="context-menu__item">Change password</a>
                <a href="#" class="context-menu__item text-danger" id="btn-logout">Logout</a>
            </div>
        `;
    }

    _attachEvents() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('navbar-menu');
        const userTrigger = document.getElementById('user-trigger');
        const contextMenu = document.getElementById('context-menu');
        const logoutBtn = document.getElementById('btn-logout');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('active');
            });
        }

        if (userTrigger && contextMenu) {
            userTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                contextMenu.classList.toggle('active');
            });
        }

        document.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (contextMenu) contextMenu.classList.remove('active');
        });

        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                window.location.reload();
            });
        }
    }
}