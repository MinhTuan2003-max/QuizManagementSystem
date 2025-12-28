import { BaseInput } from '../../../../components/base/input/input.js';
import { BaseButton } from '../../../../components/base/button/button.js';

document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.getElementById('register-inputs');
    const btnContainer = document.getElementById('btn-register-container');
    const form = document.getElementById('register-form');
    
    // 1. Khởi tạo các Input Component
    
    // Row 1: First Name & Last Name
    const firstName = new BaseInput({ label: "First Name", id: "firstname", placeholder: "Enter your first name" });
    const lastName = new BaseInput({ label: "Last Name", id: "lastname", placeholder: "Enter your last name" });
    
    // Row 2: Email
    const email = new BaseInput({ label: "Email Address", type: "email", id: "email", placeholder: "Enter your email" });
    
    // Row 3: Username & Phone
    const username = new BaseInput({ label: "Username", id: "username", placeholder: "Enter your username" });
    const phone = new BaseInput({ label: "Phone Number", id: "phone", placeholder: "Enter your phone number" });
    
    // Row 4: Password
    const password = new BaseInput({ label: "Password", type: "password", id: "password", placeholder: "Enter your password" });
    
    // Row 5: Confirm Password
    const confirmPass = new BaseInput({ label: "Confirm Password", type: "password", id: "confirm-password", placeholder: "Confirm your password" });

    // Button Register
    const registerBtn = new BaseButton({
        text: "Register",
        type: "submit",
        variant: "primary",
        id: "btn-register"
    });
    
    inputContainer.innerHTML = `
        <div class="d-flex gap-md">
            <div style="flex: 1">${firstName.render()}</div>
            <div style="flex: 1">${lastName.render()}</div>
        </div>
        
        ${email.render()}
        
        <div class="d-flex gap-md">
            <div style="flex: 1">${username.render()}</div>
            <div style="flex: 1">${phone.render()}</div>
        </div>

        ${password.render()}
        ${confirmPass.render()}
    `;

    btnContainer.innerHTML = registerBtn.render();

    // 3. Xử lý Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu (query lại DOM vì render bằng innerHTML)
        const data = {
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
            confirmPass: document.getElementById('confirm-password').value
        };

        console.log("Register Data:", data);
        
        // Validate đơn giản
        if(data.password !== data.confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        // Giả lập đăng ký thành công
        alert("Registration Successful!");
        window.location.href = '/login.html';
    });
});