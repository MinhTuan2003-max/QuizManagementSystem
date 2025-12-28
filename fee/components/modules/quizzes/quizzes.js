import { Navbar } from '../../../components/layout/navbar/navbar.js';
import { QuizCard } from '../../../components/modules/home/card/quiz-card.js';
import { Footer } from '../../../components/layout/footer/footer.js';
import { SearchForm } from './search/search.js';

document.addEventListener('DOMContentLoaded', () => {
    
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

    new Navbar('app-navbar').render();

    const navEl = document.getElementById('app-navbar');
    const oldContent = document.getElementById('quiz-page-content');
    if (oldContent) oldContent.remove();

    const contentDiv = document.createElement('main'); 
    contentDiv.id = 'quiz-page-content';
    contentDiv.style.paddingTop = '40px'; 

    contentDiv.innerHTML = `
        <div class="container" style="max-width: 1200px;">
            <section id="quiz-search-area" aria-label="Search Quizzes"></section>
            
            <section class="quizzes-section" style="margin-top: 40px;">
                 <header>
                    <h1 class="text-center mb-4 section-title">Quizzes</h1>
                 </header>
                 <div id="quiz-list-container" class="row g-4 justify-content-center"></div>
            </section>
        </div>
    `;

    if (navEl && navEl.parentNode) {
        navEl.parentNode.insertBefore(contentDiv, navEl.nextSibling);
    } else {
        document.body.appendChild(contentDiv);
    }

    const searchForm = new SearchForm('quiz-search-area', {
        onSearch: (data) => {
            const keyword = data.keyword.toLowerCase();
            console.log("Searching for:", keyword);
            const filteredQuizzes = allQuizzes.filter(quiz => 
                quiz.title.toLowerCase().includes(keyword) || 
                quiz.description.toLowerCase().includes(keyword)
            );
            renderQuizList(filteredQuizzes);
        }
    });
    searchForm.render();

    function renderQuizList(data) {
        const container = document.getElementById('quiz-list-container');
        if(container) container.innerHTML = ''; 

        if (data.length === 0) {
            container.innerHTML = '<p class="text-center col-12">No quizzes found.</p>';
            return;
        }
        const quizList = new QuizCard('quiz-list-container', data);
        quizList.render();
    }

    renderQuizList(allQuizzes);

    if (!document.getElementById('app-footer')) {
        const footerDiv = document.createElement('footer');
        footerDiv.id = 'app-footer';
        document.body.appendChild(footerDiv);
    }
    new Footer('app-footer').render();
});