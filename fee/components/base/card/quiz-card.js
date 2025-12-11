export class QuizCard {
    constructor(containerId, quizzes) {
        this.container = document.getElementById(containerId);
        this.quizzes = quizzes;
    }

    render() {
        const cardsHTML = this.quizzes.map(quiz => `
            <div class="card">
                <img src="${quiz.image}" alt="${quiz.title}" class="card__image">
                <div class="card__body">
                    <div class="card__header">
                        <h3 class="card__title">${quiz.title}</h3>
                        <span class="card__time">${quiz.time}</span>
                    </div>
                    <p class="card__desc">${quiz.description}</p>
                    <button class="btn btn--primary btn--full">Start</button>
                </div>
            </div>
        `).join('');

        this.container.innerHTML = `<div class="quiz-grid">${cardsHTML}</div>`;
    }
}