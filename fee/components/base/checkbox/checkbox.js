export class BaseCheckbox {
    constructor({ label, id, checked = false, onChange }) {
        this.label = label;
        this.id = id;
        this.checked = checked;
        this.onChange = onChange;
    }

    render() {
        return `
            <div class="custom-checkbox">
                <input 
                    type="checkbox" 
                    id="${this.id}" 
                    ${this.checked ? 'checked' : ''}
                >
                <label for="${this.id}">${this.label}</label>
            </div>
        `;
    }

    attachEvents() {
        if (this.onChange) {
            const checkbox = document.getElementById(this.id);
            if (checkbox) {
                checkbox.addEventListener('change', (e) => this.onChange(e.target.checked));
            }
        }
    }
}