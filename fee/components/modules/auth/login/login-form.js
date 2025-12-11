import { BaseInput } from '../../../base/input/input.js';
import { BaseButton } from '../../../base/button/button.js';

document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-inputs');
    const btnContainer = document.getElementById('btn-submit-container');
    const form = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-message');

    // 1. Khởi tạo Base Components
    const usernameInput = new BaseInput({
        label: "Username",
        id: "username",
        placeholder: "Enter your username"
    });

    const passwordInput = new BaseInput({
        label: "Password",
        type: "password",
        id: "password",
        placeholder: "Enter your password"
    });

    const loginBtn = new BaseButton({
        text: "Login",
        type: "submit",
        variant: "primary",
        id: "btn-login"
        // onClick: () => ... (Xử lý trong sự kiện submit form)
    });

    // 2. Render vào DOM
    formContainer.innerHTML = usernameInput.render() + passwordInput.render();
    btnContainer.innerHTML = loginBtn.render();

    // 3. Xử lý Logic Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Lấy value (Do render bằng innerHTML nên phải query lại DOM để lấy value mới nhất)
        const usernameVal = document.getElementById('username').value;
        const passwordVal = document.getElementById('password').value;

        // Mock Logic Check Login
        if (usernameVal === 'admin' && passwordVal === '123456') {
            localStorage.setItem('token', 'fake-jwt');
            localStorage.setItem('user', JSON.stringify({ name: 'Admin User', avatar: 'assets/images/avatar-5.png' }));
            window.location.href = '/index.html'; // Chuyển về trang chủ sau khi login
        } else {
            errorMsg.textContent = "Username or password incorrect!";
            errorMsg.classList.add('shake'); // Thêm hiệu ứng rung lắc (cần css)
        }
    });
});