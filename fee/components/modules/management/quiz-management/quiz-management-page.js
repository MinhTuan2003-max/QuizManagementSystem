import { BaseButton } from '../../../base/button/button.js';
import { BaseSelect } from '../../../base/select/select.js';
import { BaseCheckbox } from '../../../base/checkbox/checkbox.js';
import { BaseInput } from '../../../base/input/input.js';
import { BaseTextarea } from '../../../base/textarea/textarea.js';
import { BaseTable } from '../../../base/table/table.js';
import { BasePagination } from '../../../base/pagination/pagination.js';

export class QuizManagementPage {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.allQuizzes = this.generateSampleData(32);
        this.filteredQuizzes = [...this.allQuizzes];
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container">
                <!-- Search & Filter Section -->
                <div class="search-filter-section">
                    <div class="filter-section-header">
                        <h2 class="filter-section-title">Quiz Management</h2>
                    </div>

                    <div class="search-filter-row">
                        <div class="filter-group">
                            <label class="filter-label">Name</label>
                            <div id="search-area"></div>
                        </div>
                        <div class="filter-group filter-group-checkbox">
                            <label class="filter-label">Status</label>
                            <div id="checkbox-area" class="checkbox-wrapper"></div>
                        </div>
                    </div>

                    <div class="search-filter-actions">
                        <div></div>
                        <div class="action-buttons-right">
                            <div id="btn-clear-area"></div>
                            <div id="btn-search-area"></div>
                        </div>
                    </div>
                </div>

                <!-- Quiz List Card -->
                <div class="content-card">
                    <div class="card-header">
                        <h2>Quiz List</h2>
                    </div>
                    <div id="table-area"></div>
                    <div id="pagination-area"></div>
                </div>

                <!-- Add Quiz Form (Always Visible) -->
                <div id="add-quiz-area"></div>

                <!-- Question List (Always Visible) -->
                <div id="add-question-area"></div>
            </div>
        `;

        this.renderComponents();
        this.renderAddQuizForm();
        this.renderAddQuestionList();
    }

    renderComponents() {
        // Search Bar
        const searchInput = `
            <input 
                type="text" 
                id="quiz-search" 
                class="form-control-search" 
                placeholder="Enter quiz name to search"
            >
        `;
        document.getElementById('search-area').innerHTML = searchInput;

        // Status Checkbox
        const statusCheckbox = new BaseCheckbox({
            label: "Active",
            id: "chk-active",
            checked: false,
            onChange: (checked) => this.handleStatusFilter(checked)
        });
        document.getElementById('checkbox-area').innerHTML = statusCheckbox.render();
        statusCheckbox.attachEvents();

        // Search Button
        const searchBtn = new BaseButton({
            text: "Search",
            variant: "primary",
            icon: `<img src="assets/icons/magnifying-glass-solid-light.png" alt="search" class="icon--sm">`,
            id: "btn-search-submit"
        });
        document.getElementById('btn-search-area').innerHTML = searchBtn.render();
        document.getElementById('btn-search-submit').addEventListener('click', () => {
            const query = document.getElementById('quiz-search').value;
            this.handleSearch(query);
        });

        // Clear Button
        const clearBtn = new BaseButton({
            text: "Clear",
            variant: "outline",
            icon: `<img src="assets/icons/rotate-left-solid.png" alt="clear" class="icon--sm">`,
            id: "btn-clear-filters"
        });
        document.getElementById('btn-clear-area').innerHTML = clearBtn.render();
        document.getElementById('btn-clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Enter key on search
        document.getElementById('quiz-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = document.getElementById('quiz-search').value;
                this.handleSearch(query);
            }
        });

        // Table
        this.renderTable();

        // Pagination
        this.renderPagination();
    }

    renderTable() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredQuizzes.slice(startIndex, endIndex);

        const table = new BaseTable({
            id: "quiz-table",
            columns: [
                { 
                    key: "header", 
                    label: "Header", 
                    width: "100px", 
                    render: (val) => `<img src="${val}" alt="Quiz" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px;">`
                },
                { key: "title", label: "Description", width: "25%" },
                { key: "description", label: "Description", width: "30%" },
                { key: "duration", label: "Description", width: "100px" },
                { key: "questions", label: "Description", width: "100px", render: (val) => `<span style="text-align: center; display: block;">${val}</span>` },
                { 
                    key: "status", 
                    label: "Status", 
                    width: "100px", 
                    render: (val) => {
                        const badgeClass = val === 'Yes' ? 'badge-success' : 'badge-danger';
                        return `<span class="badge ${badgeClass}">${val}</span>`;
                    }
                }
            ],
            data: pageData,
            actions: [
                {
                    icon: `<img src="assets/icons/pen-to-square-solid.png" alt="edit" class="icon--sm" style="width: 16px; height: 16px;">`,
                    label: "Edit",
                    className: "btn-edit",
                    onClick: (row) => this.editQuiz(row)
                },
                {
                    icon: `<img src="assets/icons/trash-can-regular.png" alt="delete" class="icon--sm" style="width: 16px; height: 16px;">`,
                    label: "Delete",
                    className: "btn-delete",
                    onClick: (row) => this.deleteQuiz(row)
                }
            ]
        });

        document.getElementById('table-area').innerHTML = table.render();
        table.attachEvents();
    }

    renderPagination() {
        const pagination = new BasePagination({
            id: "quiz-pagination",
            totalItems: this.filteredQuizzes.length,
            itemsPerPage: this.itemsPerPage,
            currentPage: this.currentPage,
            pageSizeOptions: [10, 20, 50],
            
            onPageChange: (page) => {
                this.currentPage = page;
                this.renderTable();
                this.renderPagination();
            },
            
            onPageSizeChange: (newSize) => {
                this.itemsPerPage = newSize;
                this.currentPage = 1;
                this.renderTable();
                this.renderPagination();
            }
        });

        document.getElementById('pagination-area').innerHTML = pagination.render();
        pagination.attachEvents();
    }

    renderAddQuizForm() {
        const container = document.getElementById('add-quiz-area');
        if (!container) return;

        container.innerHTML = `
            <div class="content-card" id="add-quiz-card" style="margin-top:16px;">
                <div class="card-header">
                    <h2>Add Quiz</h2>
                </div>
                <div class="card-body" style="padding:16px 24px;">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div id="field-title"></div>
                        <div id="field-description"></div>
                        <div id="field-duration"></div>
                        <div id="field-thumbnail"></div>
                        <div id="field-status"></div>
                    </div>

                    <div class="search-filter-actions" style="margin-top:20px;">
                        <div></div>
                        <div class="action-buttons-right">
                            <div id="btn-cancel-area"></div>
                            <div id="btn-save-area"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Render form fields
        const titleInput = new BaseInput({
            label: 'Title',
            type: 'text',
            placeholder: 'Enter quiz title',
            id: 'add-quiz-title'
        });
        document.getElementById('field-title').innerHTML = titleInput.render();

        const descInput = new BaseTextarea({
            label: 'Description',
            placeholder: 'Enter quiz description',
            id: 'add-quiz-description',
            rows: 3
        });
        document.getElementById('field-description').innerHTML = descInput.render();

        const durationInput = new BaseInput({
            label: 'Duration',
            type: 'text',
            placeholder: 'e.g., 15m',
            id: 'add-quiz-duration'
        });
        document.getElementById('field-duration').innerHTML = durationInput.render();

        const thumbnailInput = new BaseInput({
            label: 'Thumbnail URL',
            type: 'text',
            placeholder: 'Enter thumbnail URL',
            id: 'add-quiz-thumbnail'
        });
        document.getElementById('field-thumbnail').innerHTML = thumbnailInput.render();

        const statusCheckbox = new BaseCheckbox({
            label: 'Active',
            id: 'add-quiz-status',
            checked: true
        });
        document.getElementById('field-status').innerHTML = statusCheckbox.render();
        statusCheckbox.attachEvents();

        // Buttons
        const cancelBtn = new BaseButton({
            text: 'Cancel',
            variant: 'outline',
            icon: `<img src="assets/icons/rotate-left-solid.png" alt="cancel" class="icon--sm">`,
            id: 'btn-cancel-add-quiz'
        });
        document.getElementById('btn-cancel-area').innerHTML = cancelBtn.render();

        const saveBtn = new BaseButton({
            text: 'Save',
            variant: 'primary',
            icon: `<img src="assets/icons/floppy-disk-regular.png" alt="save" class="icon--sm">`,
            id: 'btn-save-add-quiz'
        });
        document.getElementById('btn-save-area').innerHTML = saveBtn.render();

        // Attach events
        document.getElementById('btn-cancel-add-quiz').addEventListener('click', () => this.clearAddQuizForm());
        document.getElementById('btn-save-add-quiz').addEventListener('click', () => this.handleAddQuizSave());
    }

    renderAddQuestionList() {
        const container = document.getElementById('add-question-area');
        if (!container) return;

        container.innerHTML = `
            <div class="content-card" id="add-question-card" style="margin-top:16px;">
                <div class="card-header">
                    <h2>Question List</h2>
                </div>
                <div class="card-body">
                    <div id="question-table-area"></div>
                    <div style="display:flex;justify-content:flex-end;gap:12px;margin-bottom:20px; margin-right: 20px;">
                        <div id="btn-add-question-area"></div>
                    </div>
                    <div id="add-question-form-area"></div>
                </div>
            </div>
        `;

        // Render question table
        this.renderQuestionTable();

        // Add Question Button
        const addQuestionBtn = new BaseButton({
            text: 'Add',
            variant: 'primary',
            icon: `<img src="assets/icons/path.png" alt="add" class="icon--sm">`,
            id: 'btn-add-question'
        });
        document.getElementById('btn-add-question-area').innerHTML = addQuestionBtn.render();
        document.getElementById('btn-add-question').addEventListener('click', () => {
            this.showAddQuestionModal();
        });

        // Render add question form immediately
        this.renderAddQuestionForm();
    }

    renderQuestionTable() {
        const questionData = [
            { content: 'What is the capital of France?', type: 'Multiple Choice', answer: '4', order: '1', status: 'edit' },
            { content: 'Who is the course of USA?', type: 'Multiple Choice', answer: '4', order: '2', status: 'edit' },
            { content: 'What is the capital of Japan?', type: 'Single Choice', answer: '4', order: '3', status: 'edit' },
            { content: 'What are 3 countries?', type: 'Multiple Choice', answer: '4', order: '4', status: 'edit' },
            { content: 'Where is Australia located?', type: 'Single Choice', answer: '4', order: '5', status: 'edit' },
            { content: 'When is Christmas?', type: 'Multiple Choice', answer: '4', order: '6', status: 'edit' },
            { content: 'What is the capital of India?', type: 'Single Choice', answer: '4', order: '7', status: 'edit' },
            { content: 'Why is the sky blue?', type: 'Multiple Choice', answer: '4', order: '8', status: 'edit' },
            { content: 'Who invented the telephone?', type: 'Single Choice', answer: '4', order: '9', status: 'edit' },
            { content: 'What is the capital of Germany?', type: 'Multiple Choice', answer: '4', order: '10', status: 'edit' }
        ];

        const table = new BaseTable({
            id: 'question-table',
            columns: [
                { key: 'content', label: 'Content', width: '30%' },
                { key: 'type', label: 'Type', width: '15%' },
                { key: 'answer', label: 'Answers', width: '10%' },
                { key: 'order', label: 'Order', width: '10%' },
                { key: 'status', label: 'Status', width: '10%' }
            ],
            data: questionData,
            actions: [
                {
                    icon: `<img src="assets/icons/trash-can-regular.png" alt="delete" class="icon--sm" style="width: 16px; height: 16px;">`,
                    label: 'Delete',
                    className: "btn-delete",
                    onClick: (row) => this.deleteQuestion(row),
                    style: "transform: translateY(0px);"
                }
            ]
        });

        document.getElementById('question-table-area').innerHTML = table.render();
        table.attachEvents();
    }

    handleSearch(query) {
        this.filteredQuizzes = this.allQuizzes.filter(q => 
            q.title.toLowerCase().includes(query.toLowerCase()) ||
            q.description.toLowerCase().includes(query.toLowerCase())
        );
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
    }

    handleStatusFilter(checked) {
        if (checked) {
            this.filteredQuizzes = this.allQuizzes.filter(q => q.status === 'Yes');
        } else {
            this.filteredQuizzes = [...this.allQuizzes];
        }
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
    }

    clearFilters() {
        this.filteredQuizzes = [...this.allQuizzes];
        this.currentPage = 1;
        
        const searchInput = document.getElementById('quiz-search');
        const statusCheckbox = document.getElementById('chk-active');
        
        if (searchInput) searchInput.value = '';
        if (statusCheckbox) statusCheckbox.checked = false;
        
        this.renderTable();
        this.renderPagination();
    }

    clearAddQuizForm() {
        // Clear all form inputs
        const inputs = ['add-quiz-title', 'add-quiz-description', 'add-quiz-duration', 'add-quiz-thumbnail'];
        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        
        const statusCheckbox = document.getElementById('add-quiz-status');
        if (statusCheckbox) statusCheckbox.checked = true;
    }

    handleAddQuizSave() {
        const title = (document.getElementById('add-quiz-title') || {}).value || 'Untitled Quiz';
        const description = (document.getElementById('add-quiz-description') || {}).value || '';
        const duration = (document.getElementById('add-quiz-duration') || {}).value || '';
        const thumbnail = (document.getElementById('add-quiz-thumbnail') || {}).value || `https://picsum.photos/seed/${Date.now()}/200/200`;
        const status = document.getElementById('add-quiz-status') ? (document.getElementById('add-quiz-status').checked ? 'Yes' : 'No') : 'Yes';

        const newId = this.allQuizzes.reduce((max, q) => Math.max(max, q.id), 0) + 1;
        const newQuiz = {
            id: newId,
            header: thumbnail,
            title,
            description,
            duration,
            questions: 0,
            status
        };

        // Add to data
        this.allQuizzes.unshift(newQuiz);
        this.filteredQuizzes.unshift(newQuiz);
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();

        // Clear form
        this.clearAddQuizForm();
        
        alert('Quiz added successfully!');
    }

    editQuiz(quiz) {
        alert(`Edit Quiz: ${quiz.title}`);
    }

    deleteQuiz(quiz) {
        if (confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
            this.allQuizzes = this.allQuizzes.filter(q => q.id !== quiz.id);
            this.filteredQuizzes = this.filteredQuizzes.filter(q => q.id !== quiz.id);
            this.renderTable();
            this.renderPagination();
        }
    }

    deleteQuestion(question) {
        if (confirm(`Are you sure you want to delete this question?`)) {
            alert(`Deleted Question: ${question.content}`);
        }
    }

    showAddQuestionModal() {
        const container = document.getElementById('add-question-form-area');
        if (!container) return;

        // Check if add question form already exists
        const existingForm = document.getElementById('add-question-form');
        if (existingForm) {
            this.removeAddQuestionForm();
            return;
        }

        this.renderAddQuestionForm();
    }

    renderAddQuestionForm() {
        const container = document.getElementById('add-question-form-area');
        if (!container) return;

        // Create form HTML structure
        container.innerHTML = `
            <div class="content-card" id="add-question-form" style="margin-top:16px;">
                <div class="card-header">
                    <h2>Add Question</h2>
                </div>
                <div class="card-body" style="padding:16px 24px;">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div id="field-question"></div>
                        <div id="field-order"></div>
                    </div>

                    <div class="search-filter-actions" style="margin-top:20px;">
                        <div style="flex:1;"></div>
                        <div class="action-buttons-right">
                            <div id="btn-cancel-question-area"></div>
                            <div id="btn-save-question-area"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Sample questions list for select dropdown
        const questionsOptions = [
            { value: '1', text: 'What is the capital of France?' },
            { value: '2', text: 'Solve: 1/2 + 1/3' },
            { value: '3', text: 'Name three countries in Europe.' },
            { value: '4', text: 'What is the largest planet?' },
            { value: '5', text: 'Define photosynthesis.' }
        ];

        // Question Select
        const questionSelect = new BaseSelect({
            label: 'Question',
            options: questionsOptions,
            placeholder: 'Select Question Type',
            id: 'add-question-select'
        });
        document.getElementById('field-question').innerHTML = questionSelect.render();
        questionSelect.attachEvents();

        // Order Input (number)
        const orderInput = new BaseInput({
            label: 'Order',
            type: 'number',
            placeholder: 'Enter order of question in quiz',
            id: 'add-question-order'
        });
        document.getElementById('field-order').innerHTML = orderInput.render();

        // Cancel Button
        const cancelBtn = new BaseButton({
            text: 'Cancel',
            variant: 'outline',
            icon: `<img src="assets/icons/rotate-left-solid.png" alt="cancel" class="icon--sm">`,
            id: 'btn-cancel-question'
        });
        document.getElementById('btn-cancel-question-area').innerHTML = cancelBtn.render();
        document.getElementById('btn-cancel-question').addEventListener('click', () => this.removeAddQuestionForm());

        // Save Button
        const saveBtn = new BaseButton({
            text: 'Save',
            variant: 'primary',
            icon: `<img src="assets/icons/floppy-disk-regular.png" alt="save" class="icon--sm">`,
            id: 'btn-save-question'
        });
        document.getElementById('btn-save-question-area').innerHTML = saveBtn.render();
        document.getElementById('btn-save-question').addEventListener('click', () => this.handleAddQuestionSave());
    }

    removeAddQuestionForm() {
        const form = document.getElementById('add-question-form');
        if (form) {
            form.remove();
        }
    }

    handleAddQuestionSave() {
        const question = document.getElementById('add-question-select').value;
        const order = document.getElementById('add-question-order').value;

        if (!question || !order) {
            alert('Please fill in all fields');
            return;
        }

        alert(`Question saved successfully!\nQuestion: ${question}\nOrder: ${order}`);
        this.removeAddQuestionForm();
    }

    generateSampleData(count) {
        const data = [];
        const titles = [
            'Capital of Country',
            'Fractions and numbers',
            'Countries in the World'
        ];
        const descriptions = [
            'Test your knowledge of country capitals',
            'Test your knowledge of fractions and their operations',
            'Test your knowledge of countries'
        ];
        
        for (let i = 1; i <= count; i++) {
            const index = i % 3;
            data.push({
                id: i,
                header: `https://picsum.photos/seed/${i}/200/200`,
                title: titles[index],
                description: descriptions[index],
                duration: `${10 + (i % 5)}m`,
                questions: 5 + (i % 15),
                status: i % 2 === 0 ? 'Yes' : 'No'
            });
        }
        
        return data;
    }
}