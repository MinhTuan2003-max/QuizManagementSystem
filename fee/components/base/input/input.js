export class BaseInput {
    constructor({ label, type = "text", placeholder = "", id, value = "" }) {
        this.label = label;
        this.type = type;
        this.placeholder = placeholder;
        this.id = id;
        this.value = value;
    }

    render() {
        return `
            <div class="form-group">
                <label class="form-label" for="${this.id}">${this.label}</label>
                <input 
                    type="${this.type}" 
                    id="${this.id}" 
                    class="form-control" 
                    placeholder="${this.placeholder}"
                    value="${this.value}"
                >
            </div>
        `;
    }
}