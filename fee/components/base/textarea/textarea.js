export class BaseTextarea {
    constructor({ label, placeholder = "", id, value = "", rows = 3 }) {
        this.label = label;
        this.placeholder = placeholder;
        this.id = id;
        this.value = value;
        this.rows = rows;
    }

    render() {
        return `
            <div class="form-group">
                <label class="form-label" for="${this.id}">${this.label}</label>
                <textarea 
                    id="${this.id}" 
                    class="form-control" 
                    placeholder="${this.placeholder}"
                    rows="${this.rows}"
                    style="font-family: Arial, sans-serif;"
                >${this.value}</textarea>
            </div>
        `;
    }
}
