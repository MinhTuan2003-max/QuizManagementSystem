export class Navbar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        // Giả lập trạng thái login (thử đổi thành false để test giao diện chưa login)
        this.isLoggedIn = true; 
        this.user = { name: "Minh Tuan" };
    }

    render() {
        const menuHTML = `
            <div class="navbar__menu">
                <a href="#">Home</a>
                <a href="#">Quizzes</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </div>
        `;

        const authHTML = this.isLoggedIn ? this._renderAuthenticated() : this._renderUnauthenticated();

        this.container.innerHTML = `
            <nav class="navbar">
                <a href="#" class="navbar__brand">
                    <img src="assets/icons/logo.png" style="height:30px" alt=""> Quizzes
                </a>
                ${menuHTML}
                <div class="navbar__auth">${authHTML}</div>
            </nav>
        `;

        if (this.isLoggedIn) this._attachEvents();
    }

    _renderUnauthenticated() {
        return `
            <div class="navbar__btns">
                <button class="btn btn--text">Login</button>
                <button class="btn btn--text">Register</button>
            </div>
        `;
    }

    _renderAuthenticated() {
        return `
            <div class="user-info" id="user-trigger">
                <img src="assets/images/avatar-5.png" class="user-avatar" alt="User">
            </div>
            <div class="context-menu" id="context-menu">
                <a href="#" class="context-menu__item">Minh Tuan</a>
                <div class="divider"></div>
                <a href="#" class="context-menu__item">Change Password</a>
                <div class="divider"></div>
                <a href="#" class="context-menu__item" id="logout-btn">Logout</a>
            </div>
        `;
    }

    _attachEvents() {
        const trigger = document.getElementById('user-trigger');
        const menu = document.getElementById('context-menu');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        // Click ra ngoài thì đóng menu
        document.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    }
}