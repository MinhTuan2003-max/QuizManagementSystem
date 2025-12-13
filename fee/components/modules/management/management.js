import { Navbar } from '../../../components/layout/navbar/navbar.js';
import { Sidebar } from '../../../components/layout/sidebar/sidebar.js';
import { Footer } from '../../../components/layout/footer/footer.js';
import { QuizManagementPage } from './quiz-management/quiz-management-page.js';

class ManagementApp {
    constructor() {
        this.currentPage = 'quiz-management';
        this.init();
    }

    init() {
        // Render Navbar
        const navbar = new Navbar('app-navbar');
        navbar.render();

        // Define custom menu items (có thể customize)
        const menuItems = [
            {
                id: 'quiz-management',
                label: 'Quiz Management',
                link: '#quiz-management',
                icon: `<img src="assets/icons/person-circle-question-solid.png" alt="user" class="contact-icon">`,
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

        // Render Sidebar with custom menu items
        this.sidebar = new Sidebar('app-sidebar', menuItems);
        this.sidebar.render();

        // Render Footer
        const footer = new Footer('app-footer');
        footer.render();

        // Load initial page
        this.loadPage('quiz-management');

        // Listen for sidebar navigation
        window.addEventListener('sidebar-navigate', (e) => {
            this.loadPage(e.detail.page);
        });

        // Setup mobile sidebar
        this.setupMobileSidebar();
    }

    loadPage(pageName) {
        this.currentPage = pageName;
        const content = document.getElementById('page-content');

        // Update sidebar active state
        this.sidebar.setActive(pageName);

        switch(pageName) {
            case 'quiz-management':
                this.loadQuizManagement(content);
                break;
            case 'question-management':
                this.loadQuestionManagement(content);
                break;
            case 'user-management':
                this.loadUserManagement(content);
                break;
            case 'role-management':
                this.loadRoleManagement(content);
                break;
            default:
                content.innerHTML = '<h1>Page not found</h1>';
        }
    }

    loadQuizManagement(container) {
        container.innerHTML = '<div id="quiz-management-content"></div>';
        const quizPage = new QuizManagementPage('quiz-management-content');
        quizPage.render();
    }

    loadQuestionManagement(container) {
        container.innerHTML = `
            <div class="page-container">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Question Management</h1>
                        <p class="page-subtitle">Manage all quiz questions</p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2>Question List</h2>
                    </div>
                    <div style="padding: 40px; text-align: center; color: #666;">
                        <svg style="width: 80px; height: 80px; margin: 0 auto 20px; opacity: 0.3;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <p style="font-size: 18px; margin-bottom: 8px;">Question Management</p>
                        <p style="font-size: 14px; color: #999;">Coming soon...</p>
                    </div>
                </div>
            </div>
        `;
    }

    loadUserManagement(container) {
        container.innerHTML = `
            <div class="page-container">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">User Management</h1>
                        <p class="page-subtitle">Manage application users</p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2>User List</h2>
                    </div>
                    <div style="padding: 40px; text-align: center; color: #666;">
                        <svg style="width: 80px; height: 80px; margin: 0 auto 20px; opacity: 0.3;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <p style="font-size: 18px; margin-bottom: 8px;">User Management</p>
                        <p style="font-size: 14px; color: #999;">Coming soon...</p>
                    </div>
                </div>
            </div>
        `;
    }

    loadRoleManagement(container) {
        container.innerHTML = `
            <div class="page-container">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Role Management</h1>
                        <p class="page-subtitle">Manage user roles and permissions</p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2>Role List</h2>
                    </div>
                    <div style="padding: 40px; text-align: center; color: #666;">
                        <svg style="width: 80px; height: 80px; margin: 0 auto 20px; opacity: 0.3;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <p style="font-size: 18px; margin-bottom: 8px;">Role Management</p>
                        <p style="font-size: 14px; color: #999;">Coming soon...</p>
                    </div>
                </div>
            </div>
        `;
    }

    setupMobileSidebar() {
        const toggleBtn = document.getElementById('sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');

        if (toggleBtn && sidebar) {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);

            // Toggle sidebar
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                overlay.classList.toggle('show');
            });

            // Close sidebar when clicking overlay
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('show');
            });

            // Close sidebar when clicking menu item (mobile)
            const sidebarItems = sidebar.querySelectorAll('.sidebar__item');
            sidebarItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (window.innerWidth <= 1024) {
                        sidebar.classList.remove('open');
                        overlay.classList.remove('show');
                    }
                });
            });
        }
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new ManagementApp();
});