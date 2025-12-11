export class BaseButton {
    constructor({ text, type = "button", variant = "primary", fullWidth = false, id = "", onClick }) {
        this.text = text;
        this.type = type;
        this.variant = variant; // 'primary', 'outline', 'text'
        this.fullWidth = fullWidth;
        this.id = id;
        this.onClick = onClick; // Callback function
    }

    render() {
        const widthClass = this.fullWidth ? 'w-100' : '';
        // Map variant với class CSS tương ứng
        const variantClass = this.variant === 'text' ? 'btn--text' : `btn--${this.variant}`;
        
        return `
            <button 
                type="${this.type}" 
                id="${this.id}" 
                class="btn ${variantClass} ${widthClass}"
            >
                ${this.text}
            </button>
        `;
    }
}