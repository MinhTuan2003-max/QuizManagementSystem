/* components/layout/footer/footer.js */
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
                        
                        <div class="footer__brand">
                            <a href="#" class="footer__logo">
                                <img src="assets/icons/logo.png" style="height:30px" alt="">
                                Quizzes
                            </a>
                            <p class="footer__desc">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        <div>
                            <h3 class="footer__title">Menu</h3>
                            <div class="footer__links">
                                <a href="/" class="footer__link">Home</a>
                                <a href="/quizzes.html" class="footer__link">Quizzes</a>
                                <a href="/about.html" class="footer__link">About</a>
                                <a href="/contact.html" class="footer__link">Contact</a>
                            </div>
                        </div>

                        <div>
                            <h3 class="footer__title">Contact</h3>
                            <div class="footer__contact">
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

                    </div>
                </div>
                
                <div class="footer__bottom">
                    &copy; May ${currentYear} - ReactJS 19
                </div>
            </footer>
        `;
    }
}