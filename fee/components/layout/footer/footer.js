export class Footer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render() {
        const currentYear = new Date().getFullYear();

        this.container.innerHTML = `
            <footer class="footer">
                <div class="footer__container">
                    <div class="footer__grid">
                        
                        <section class="footer__brand">
                            <a href="/" class="footer__logo">
                                <img src="assets/icons/logo.png" style="height:30px" alt="Quizzes Logo">
                                Quizzes
                            </a>
                            <p class="footer__desc">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </section>

                        <nav class="footer__nav" aria-label="Footer Menu">
                            <h3 class="footer__title">Menu</h3>
                            <ul class="footer__links" style="list-style: none; padding: 0;">
                                <li><a href="/" class="footer__link">Home</a></li>
                                <li><a href="/quizzes.html" class="footer__link">Quizzes</a></li>
                                <li><a href="/about.html" class="footer__link">About</a></li>
                                <li><a href="/contact.html" class="footer__link">Contact</a></li>
                            </ul>
                        </nav>

                        <section>
                            <h3 class="footer__title">Contact</h3>
                            <address class="footer__contact" style="font-style: normal;">
                                <div class="contact-item">
                                    <img src="assets/icons/envelope-regular.png" alt="" class="contact-icon">
                                    <span>congdinh2021@gmail.com</span>
                                </div>
                                <div class="contact-item">
                                    <img src="assets/icons/phone-solid.png" alt="" class="contact-icon">
                                    <span>+84 944 551 356</span>
                                </div>
                                <div class="contact-item">
                                    <img src="assets/icons/location-dot-solid.png" alt="" class="contact-icon">
                                    <span>123 Xuan Dinh, Bac Tu Liem, Ha Noi, Viet Nam</span>
                                </div>
                            </address>
                        </section>

                    </div>
                </div>
                
                <div class="footer__bottom">
                    <small>&copy; May ${currentYear} - ReactJS 19</small>
                </div>
            </footer>
        `;
    }
}