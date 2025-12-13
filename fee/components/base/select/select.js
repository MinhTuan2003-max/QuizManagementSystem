export class BaseSelect {
    constructor({ label, id, options = [], value = "", placeholder = "Select an option", onChange }) {
        this.label = label;
        this.id = id;
        this.options = options; // Array of {value, text}
        this.value = value;
        this.placeholder = placeholder;
        this.onChange = onChange;
    }

    render() {
        const optionsHTML = this.options.map(opt => 
            `<option value="${opt.value}" ${opt.value === this.value ? 'selected' : ''}>
                ${opt.text}
            </option>`
        ).join('');

        return `
            <div class="form-group">
                ${this.label ? `<label class="form-label" for="${this.id}">${this.label}</label>` : ''}
                <select id="${this.id}" class="form-select">
                    ${this.placeholder ? `<option value="" disabled ${!this.value ? 'selected' : ''}>${this.placeholder}</option>` : ''}
                    ${optionsHTML}
                </select>
            </div>
        `;
    }

    attachEvents() {
        if (this.onChange) {
            const select = document.getElementById(this.id);
            if (select) {
                select.addEventListener('change', (e) => this.onChange(e.target.value));
            }
        }
    }
}