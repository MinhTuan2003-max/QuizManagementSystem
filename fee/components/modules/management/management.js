import { Navbar } from '../../../components/layout/navbar/navbar.js';
import { Sidebar } from '../../../components/layout/sidebar/sidebar.js';
import { Footer } from '../../../components/layout/footer/footer.js';
import { QuizManagementPage } from './quiz-management/quiz-management-page.js';
import { RoleManagementPage } from './role-management/role-management-page.js';
import { QuestionManagementPage } from './question-management/question-management-page.js';
import { UserManagementPage } from './user-management/user-management-page.js';

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
        container.innerHTML = '<div id="question-management-content"></div>';
        const questionPage = new QuestionManagementPage('question-management-content');
        questionPage.render();
    }

    loadUserManagement(container) {
        container.innerHTML = '<div id="user-management-content"></div>';
        const userPage = new UserManagementPage('user-management-content');
        userPage.render();
    }

    loadRoleManagement(container) {
        container.innerHTML = '<div id="role-management-content"></div>';
        const rolePage = new RoleManagementPage('role-management-content');
        rolePage.render();
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