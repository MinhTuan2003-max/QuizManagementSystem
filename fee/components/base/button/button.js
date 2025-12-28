// components/base/button/button.js

export class BaseButton {
    constructor({ 
        text, 
        type = "button", 
        variant = "primary", 
        fullWidth = false, 
        id = "", 
        icon = null,
        iconPosition = "left",
        size = "md",
        disabled = false,
        onClick,
        style
    }) {
        this.text = text;
        this.type = type;
        this.variant = variant;
        this.fullWidth = fullWidth;
        this.id = id;
        this.icon = icon; 
        this.iconPosition = iconPosition; 
        this.size = size;
        this.disabled = disabled;
        this.onClick = onClick;
        this.style = style;
    }

    render() {
        const widthClass = this.fullWidth ? 'w-100' : '';
        const variantClass = this.variant === 'text' ? 'btn--text' : `btn-${this.variant}`;
        const sizeClass = this.size !== 'md' ? `btn-${this.size}` : '';
        const disabledAttr = this.disabled ? 'disabled' : '';
        const styleAttr = this.style ? `style="${this.style}"` : '';
        
        // Render icon nếu có
        const iconHTML = this.icon ? `<span class="btn btn-icon">${this.icon}</span>` : '';
        
        // Render text
        const textHTML = this.text ? `<span class="btn btn-text" style="color: inherit; font-weight: 400">${this.text}</span>` : '';
        
        // Tạo nội dung button theo vị trí icon
        let buttonContent = '';
        if (this.iconPosition === 'right') {
            buttonContent = `${textHTML}${iconHTML}`;
        } else {
            buttonContent = `${iconHTML}${textHTML}`;
        }
        
        return `
            <button 
                type="${this.type}" 
                id="${this.id}" 
                class="btn ${variantClass} ${sizeClass} ${widthClass}"
                ${disabledAttr}
                ${styleAttr}
            >
                ${buttonContent}
            </button>
        `;
    }

    attachEvents() {
        if (this.onClick && this.id) {
            const button = document.getElementById(this.id);
            if (button) {
                button.addEventListener('click', this.onClick);
            }
        }
    }
}

// Helper function để tạo SVG icons
export const Icons = {
    plus: `<img src="assets/icons/plus-solid.png" alt="plus" class="icon">`,
    
    edit: `<img src="assets/icons/pen-to-square-solid.png" alt="edit" class="icon">`,
    
    delete: `<img src="assets/icons/trash-can-regular.png" alt="delete" class="icon">`,
    
    search: `<img src="assets/icons/magnifying-glass-solid.png" alt="search" class="icon">`,
};