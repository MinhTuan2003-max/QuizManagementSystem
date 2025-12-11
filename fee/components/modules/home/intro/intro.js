export class Intro {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render() {
    
        this.container.innerHTML = `
            <section class="intro">
                <div class="intro__container">
                    <div class="intro__grid">
                        
                        <div class="intro__content">
                            <h1 class="intro__title">Welcome to Quiz App</h1>
                            <p class="intro__desc">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada, nunc non lacinia fermentum, nunc sapien ultricies sapien, nec tincidunt nunc nunc nec libero.
                            </p>
                            <button class="btn btn--primary btn--lg" id="btn-start-quiz">Take a Quiz</button>
                        </div>

                        <div class="intro__image-wrapper">
                            <img src="assets/images/quiz-bg-01.png" alt="Quiz Illustration" class="intro__img">
                        </div>

                    </div>
                </div>
            </section>
        `;

        this._attachEvents();
    }

    _attachEvents() {
        // Sự kiện: Click nút "Take a Quiz" thì trượt xuống phần danh sách Quiz
        const btn = document.getElementById('btn-start-quiz');
        if (btn) {
            btn.addEventListener('click', () => {
                const quizSection = document.getElementById('quiz-list-title');
                if (quizSection) {
                    quizSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
}