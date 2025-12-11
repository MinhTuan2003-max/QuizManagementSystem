export class Sidebar {
    constructor(containerId, menuItems) {
        this.container = document.getElementById(containerId);
        this.menuItems = menuItems; // Mảng chứa các object menu
    }

    render() {
        // Tạo HTML từ mảng dữ liệu
        const listHTML = this.menuItems.map(item => `
            <a href="${item.link}" class="sidebar__item ${item.active ? 'active' : ''}">
                <span class="sidebar__icon">${item.icon}</span> 
                ${item.label}
            </a>
        `).join('');

        this.container.innerHTML = `
            <aside class="sidebar">
                <div class="sidebar__title">Menu</div>
                <div class="sidebar__list">
                    ${listHTML}
                </div>
            </aside>
        `;
    }
}