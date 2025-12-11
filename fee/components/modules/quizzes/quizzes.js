import { Navbar } from '../../../components/layout/navbar/navbar.js';
import { QuizCard } from '../../../components/modules/home/card/quiz-card.js';
import { Footer } from '../../../components/layout/footer/footer.js';
import { SearchForm } from './search/search.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOCK DATA ---
    const allQuizzes = [
        {
            title: "Capitals of Country",
            time: "15m",
            description: "Test your knowledge of country capitals",
            image: "../assets/images/capitals.png"
        },
        {
            title: "Technology Trends",
            time: "10m",
            description: "Test your knowledge of tech",
            image: "../assets/images/capitals_1.png"
        },
        {
            title: "World History",
            time: "20m",
            description: "Explore the history of the world",
            image: "../assets/images/capitals_2.png"
        }
    ];

    // --- 2. Navbar ---
    new Navbar('app-navbar').render();

    // --- 3. Setup Layout ---
    const navEl = document.getElementById('app-navbar');
    // Xóa content cũ nếu có
    const oldContent = document.getElementById('quiz-page-content');
    if (oldContent) oldContent.remove();

    const contentDiv = document.createElement('div');
    contentDiv.id = 'quiz-page-content';
    contentDiv.className = 'container'; 
    contentDiv.style.paddingTop = '40px'; 

    contentDiv.innerHTML = `
        <div id="quiz-search-area"></div>
        
        <div class="quizzes-section" style="margin-top: 40px;">
             <h1 class="text-center mb-4 section-title">Quizzes</h1>
             <div id="quiz-list-container"></div>
        </div>
    `;

    // Chèn vào trang
    if (navEl && navEl.parentNode) {
        navEl.parentNode.insertBefore(contentDiv, navEl.nextSibling);
    } else {
        document.body.appendChild(contentDiv);
    }

    // --- 4. Render Search Form (Kết nối với List) ---
    const searchForm = new SearchForm('quiz-search-area', {
        onSearch: (data) => {
            const keyword = data.keyword.toLowerCase();
            console.log("Searching for:", keyword);

            // LOGIC LỌC: Tạo mảng mới dựa trên từ khóa
            const filteredQuizzes = allQuizzes.filter(quiz => 
                quiz.title.toLowerCase().includes(keyword) || 
                quiz.description.toLowerCase().includes(keyword)
            );

            // GỌI HÀM RENDER LẠI DANH SÁCH
            renderQuizList(filteredQuizzes);
        }
    });
    searchForm.render();

    // --- 5. Hàm Render List (Tách ra để dùng lại) ---
    function renderQuizList(data) {
        // Xóa nội dung cũ (nếu QuizCard chưa tự xử lý)
        const container = document.getElementById('quiz-list-container');
        if(container) container.innerHTML = ''; 

        if (data.length === 0) {
            return;
        }

        const quizList = new QuizCard('quiz-list-container', data);
        quizList.render();
    }

    // Gọi lần đầu để hiển thị toàn bộ danh sách
    renderQuizList(allQuizzes);

    // --- 6. Footer ---
    if (!document.getElementById('app-footer')) {
        const footerDiv = document.createElement('div');
        footerDiv.id = 'app-footer';
        document.body.appendChild(footerDiv);
    }
    new Footer('app-footer').render();
});