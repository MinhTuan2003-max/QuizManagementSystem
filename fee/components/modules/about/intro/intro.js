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
                            <div class="intro__brand">
                                <img src="assets/icons/logo.png" alt="Logo" class="intro__logo-img" /> <span>Quizzes</span>
                            </div>
                            <p class="intro__desc">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada, nunc non lacinia fermentum, nunc sapien ultricies sapien, nec tincidunt nunc nunc nec libero.
                            </p>
                            <h1 class="intro__subtitle">Contact</h1>
                            <div class="contact-info mt-4">
                                <div class="contact-item">
                                    <img src="assets/icons/envelope-regular.png" alt="mail" class="contact-icon">
                                    <span>congdinh2021@gmail.com</span>
                                </div>
                                <div class="contact-item">
                                    <img src="assets/icons/phone-solid.png" alt="phone" class="contact-icon">
                                    <span>+84 944 551 356</span>
                                </div>
                                <div class="contact-item">
                                    <img src="assets/icons/location-dot-solid.png" alt="address" class="contact-icon">
                                    <span>123 Xuan Dinh, Bac Tu Liem, Ha Noi, Viet Nam</span>
                                </div>
                            </div>
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