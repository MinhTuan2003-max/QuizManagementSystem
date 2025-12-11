import { BaseButton } from "../../base/button/button.js";
import { BaseInput } from "../../base/input/input.js";

export class ContactForm {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render() {
        // Tạo các input components
        const nameInput = new BaseInput({
            label: "Name",
            id: "c-name",
            placeholder: "Enter you name",
            type: "text"
        });

        const emailInput = new BaseInput({
            label: "Email",
            id: "c-email",
            placeholder: "Enter your email",
            type: "email"
        });

        // Tạo button component
        const submitButton = new BaseButton({
            text: "Send",
            type: "submit",
            variant: "primary",
            id: "btn-send"
        });

        this.container.innerHTML = `
            <div class="contact-feedback-section">
                <h2 class="section-title">Feedback</h2>
                <p class="section-description">Please fill out the form below to send us your feedback. We will get back to you as soon as possible.</p>
                
                <form id="contact-form-submit">
                    ${nameInput.render()}
                    
                    ${emailInput.render()}

                    <div class="form-group">
                        <label class="form-label" for="c-message">Message</label>
                        <textarea 
                            class="form-control" 
                            id="c-message" 
                            placeholder="Enter you message" 
                            rows="5" 
                            required
                        ></textarea>
                    </div>

                    ${submitButton.render()}
                </form>
            </div>
        `;

        this._attachEvents();
    }

    _attachEvents() {
        const form = this.container.querySelector('#contact-form-submit');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Lấy giá trị từ form
            const name = document.getElementById('c-name').value;
            const email = document.getElementById('c-email').value;
            const message = document.getElementById('c-message').value;
            
            console.log('Form submitted:', { name, email, message });
            alert("Message Sent!");
            
            // Reset form
            form.reset();
        });
    }
}