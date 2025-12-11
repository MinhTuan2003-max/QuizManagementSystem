export class SearchForm {
    constructor(containerId, { onSearch }) {
        this.container = document.getElementById(containerId);
        this.onSearch = onSearch;
    }

    render() {
        this.container.innerHTML = `
            <div class="search-form-container">
                <h1>Take a Quiz</h1>
                
                <form id="app-search-form">
                    <div class="search-input-group">
                        <input type="text" id="search-keyword" placeholder="Enter quiz code to take a quiz" autocomplete="off">
                        <button type="submit">Take Quiz</button>
                    </div>
                </form>
            </div>
        `;

        this._attachEvents();
    }

    _attachEvents() {
        const form = this.container.querySelector('#app-search-form');
        const inputKeyword = this.container.querySelector('#search-keyword');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = { keyword: inputKeyword.value.trim() };
            if (this.onSearch) this.onSearch(data);
        });
    }
}