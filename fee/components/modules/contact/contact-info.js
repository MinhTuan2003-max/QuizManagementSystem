export class ContactInfo {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render() {
        this.container.innerHTML = `
            <div class="contact-info-section">
                <h2 class="section-title">Our Information</h2>
                <p class="section-description">We are always here to help you. You can contact us through the following ways.</p>

                <div class="info-item">
                    <img src="assets/icons/envelope-regular.png" alt="Email" class="info-icon">
                    <span class="info-text">congdanh2021@gmail.com</span>
                </div>

                <div class="info-item">
                    <img src="assets/icons/phone-flip-solid.png" alt="Phone" class="info-icon">
                    <span class="info-text">+84 944 551 356</span>
                </div>

                <div class="info-item">
                    <img src="assets/icons/location-dot-solid.png" alt="Location" class="info-icon">
                    <span class="info-text">123 Xuan Dinh, Bac Tu Liem, Ha Noi, Viet Nam</span>
                </div>

                <div class="social-links">
                    <a href="#" class="social-link">
                        <img src="assets/icons/tiktok.png" alt="TikTok">
                    </a>
                    <a href="#" class="social-link">
                        <img src="assets/icons/facebook.png" alt="Facebook">
                    </a>
                    <a href="#" class="social-link">
                        <img src="assets/icons/youtube.png" alt="YouTube">
                    </a>
                    <a href="#" class="social-link">
                        <img src="assets/icons/linkedin.png" alt="LinkedIn">
                    </a>
                </div>
            </div>
        `;
    }
}