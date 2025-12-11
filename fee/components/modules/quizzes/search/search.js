import { BaseInput } from '../../../base/input/input.js';
import { BaseButton } from '../../../base/button/button.js';

export class SearchForm {
    constructor(containerId, { onSearch }) {
        this.container = document.getElementById(containerId);
        this.onSearch = onSearch;
    }

    render() {
        // 1. Khởi tạo Base Input
        const inputComponent = new BaseInput({
            id: 'search-keyword',
            placeholder: 'Enter quiz code to take a quiz',
            value: ''
        });

        // 2. Khởi tạo Base Button
        const btnComponent = new BaseButton({
            text: 'Take Quiz',
            type: 'submit',
            variant: 'primary',
            id: 'btn-take-quiz'
        });

        // 3. Render
        this.container.innerHTML = `
            <div class="search-form-container">
                <h1>Take a Quiz</h1>
                
                <form id="app-search-form">
                    <div class="search-input-group">
                        ${inputComponent.render()}
                        ${btnComponent.render()}
                    </div>
                </form>
            </div>
        `;

        this._attachEvents();
    }

    _attachEvents() {
        const form = this.container.querySelector('#app-search-form');
        
        // Vì BaseInput render ra ID, ta query lại ID đó để lấy value
        const inputElement = this.container.querySelector('#search-keyword');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = { keyword: inputElement.value.trim() };
            if (this.onSearch) this.onSearch(data);
        });
    }
}