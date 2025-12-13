export class Sidebar {
    constructor(containerId, menuItems = []) {
        this.container = document.getElementById(containerId);
        this.menuItems = menuItems.length > 0 ? menuItems : this.getDefaultMenuItems();
        this.activeItem = null;
    }

    getDefaultMenuItems() {
        return [
            {
                id: 'quiz-management',
                label: 'Quiz Management',
                link: '#quiz-management',
                icon: `<img src="assets/icons/person-circle-question-solid.png" alt="quiz" class="contact-icon">`,
                active: true
            },
            {
                id: 'question-management',
                label: 'Question Management',
                link: '#question-management',
                icon: `<img src="assets/icons/question-solid.png" alt="question" class="contact-icon">`,
                active: false
            },
            {
                id: 'user-management',
                label: 'User Management',
                link: '#user-management',
                icon: `<img src="assets/icons/user-solid.png" alt="user" class="contact-icon">`,
                active: false
            },
            {
                id: 'role-management',
                label: 'Role Management',
                link: '#role-management',
                icon: `<img src="assets/icons/user-shield-solid.png" alt="role" class="contact-icon">`,
                active: false
            }
        ];
    }

    render() {
        // Tạo HTML từ mảng dữ liệu
        const listHTML = this.menuItems.map(item => `
            <a 
                href="${item.link}" 
                class="sidebar__item ${item.active ? 'active' : ''}" 
                data-page="${item.id}"
            >
                <span class="sidebar__icon">${item.icon}</span>
                <span class="sidebar__label">${item.label}</span>
            </a>
            <hr>
        `).join('');

        this.container.innerHTML = `
            <aside class="sidebar">
                <div class="sidebar__title">Menu</div>
                <nav class="sidebar__list">
                    ${listHTML}
                </nav>
            </aside>
        `;

        this._attachEvents();
    }

    _attachEvents() {
        const items = this.container.querySelectorAll('.sidebar__item');
        
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active from all
                items.forEach(i => i.classList.remove('active'));
                
                // Add active to clicked
                item.classList.add('active');
                
                // Get page ID
                const pageId = item.dataset.page;
                this.activeItem = pageId;
                
                // Dispatch custom event for page change
                window.dispatchEvent(new CustomEvent('sidebar-navigate', { 
                    detail: { 
                        page: pageId,
                        link: item.getAttribute('href')
                    } 
                }));
            });
        });
    }

    setActive(pageId) {
        const items = this.container.querySelectorAll('.sidebar__item');
        items.forEach(item => {
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        this.activeItem = pageId;
    }

    updateMenuItems(newMenuItems) {
        this.menuItems = newMenuItems;
        this.render();
    }

    addMenuItem(menuItem) {
        this.menuItems.push(menuItem);
        this.render();
    }

    removeMenuItem(pageId) {
        this.menuItems = this.menuItems.filter(item => item.id !== pageId);
        this.render();
    }
}