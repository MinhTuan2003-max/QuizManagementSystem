export class BaseSearch {
    constructor({ id, placeholder = "Enter your search", onSearch, buttonText = "Search" }) {
        this.id = id;
        this.placeholder = placeholder;
        this.onSearch = onSearch;
        this.buttonText = buttonText;
    }

    render() {
        return `
            <div class="search-container">
                <div class="search-input-wrapper">
                    <input 
                        type="text" 
                        id="${this.id}" 
                        class="form-control-search" 
                        placeholder="${this.placeholder}"
                    >
                </div>
                <button type="button" id="${this.id}-btn" class="btn btn--primary btn-search">
                    <img src="/assets/icons/magnifying-glass-solid-light.png">
                    ${this.buttonText}
                </button>
            </div>
        `;
    }

    attachEvents() {
        const input = document.getElementById(this.id);
        const button = document.getElementById(`${this.id}-btn`);

        if (this.onSearch) {
            // Search on button click
            if (button) {
                button.addEventListener('click', () => {
                    if (input) this.onSearch(input.value);
                });
            }

            // Search on Enter key
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.onSearch(input.value);
                    }
                });
            }
        }
    }
}