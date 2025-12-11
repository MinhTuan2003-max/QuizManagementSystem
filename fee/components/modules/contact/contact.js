import { Navbar } from '../../../components/layout/navbar/navbar.js';
import { Footer } from '../../../components/layout/footer/footer.js';
import { ContactForm } from './contact-form.js';
import { ContactInfo } from './contact-info.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar
    new Navbar('app-navbar').render();

    // 2. Contact Form
    const form = new ContactForm('contact-form-area');
    form.render();

    // 3. Contact Info
    const info = new ContactInfo('contact-info-area'); 
    info.render();

    // 4. Footer
    // Tạo div footer nếu chưa có
    if (!document.getElementById('app-footer')) {
        const footerDiv = document.createElement('div');
        footerDiv.id = 'app-footer';
        document.body.appendChild(footerDiv);
    }
    new Footer('app-footer').render();
});