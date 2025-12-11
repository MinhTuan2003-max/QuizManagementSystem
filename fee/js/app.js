import { Navbar } from '../components/layout/navbar/navbar.js';
import { QuizCard } from '../components/base/card/quiz-card.js';
import { Footer } from '../components/layout/footer/footer.js';
import { Intro } from '../components/modules/home/intro.js'; 
// import { Sidebar } from '../components/layout/sidebar/sidebar.js'; // Dùng cho trang quản lý

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Khởi tạo Navbar
    const navbar = new Navbar('app-navbar');
    navbar.render();

    const intro = new Intro('app-intro');
    intro.render();

    // 2. Mock Data cho Quiz List (Giống hình ảnh)
    const mockQuizzes = [
        {
            title: "Capitals of Country",
            time: "15m",
            description: "Test your knowledge of country capitals",
            image:  "../assets/images/capitals.png"
        },
        {
            title: "Capitals of Country",
            time: "15m",
            description: "Test your knowledge of country capitals",
            image: "../assets/images/capitals_1.png"
        },
        {
            title: "Capitals of Country",
            time: "15m",
            description: "ETest your knowledge of country capitals",
            image: "../assets/images/capitals_2.png"
        }
    ];

    // 3. Render Quiz Cards
    const quizList = new QuizCard('quiz-list-container', mockQuizzes);
    quizList.render();

    const footer = new Footer('app-footer');
    footer.render();
});