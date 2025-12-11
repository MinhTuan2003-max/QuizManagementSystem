import { Footer } from '../../layout/footer/footer.js';
import { Navbar } from '../../layout/navbar/navbar.js';
import { MemberCard } from './card/member-card.js';
import { Intro } from './intro/intro.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Khởi tạo Navbar
    const navbar = new Navbar('app-navbar');
    navbar.render();

    const intro = new Intro('app-intro');
    intro.render();

    // 2. Mock Data cho Team List (Giống hình ảnh)
    const mockMembers = [
        {
            title: "John Doe",
            description: "Front End Developer",
            image:  "../assets/images/member-3.png"
        },
        {
            title: "Jane Doe",
            description: "Back End Developer",
            image: "../assets/images/member-1.png"
        },
        {
            title: "John Smith",
            description: "Full Stack Developer",
            image: "../assets/images/member-2.png"
        }
    ];

    // 3. Render Member Cards
    const memberList = new MemberCard('member-list-container', mockMembers);
    memberList.render();

    const footer = new Footer('app-footer');
    footer.render();
});