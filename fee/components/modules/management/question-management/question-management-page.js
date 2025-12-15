import { BaseButton } from '../../../base/button/button.js';
import { BaseSelect } from '../../../base/select/select.js';
import { BaseCheckbox } from '../../../base/checkbox/checkbox.js';
import { BaseInput } from '../../../base/input/input.js';
import { BaseTextarea } from '../../../base/textarea/textarea.js';
import { BaseTable } from '../../../base/table/table.js';
import { BasePagination } from '../../../base/pagination/pagination.js';

export class QuestionManagementPage {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentAnswerPage = 1;
        this.answersPerPage = 10;
        this.allQuestions = this.generateSampleQuestions(32);
        this.filteredQuestions = [...this.allQuestions];
        this.allAnswers = this.generateSampleAnswers(12);
        this.filteredAnswers = [...this.allAnswers];
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container">
                <!-- Search & Filter Section -->
                <div class="search-filter-section">
                    <div class="filter-section-header">
                        <h2 class="filter-section-title">Question Management</h2>
                    </div>

                    <div class="search-filter-row">
                        <div class="filter-group">
                            <label class="filter-label">Name</label>
                            <div id="search-area"></div>
                        </div>
                        <div class="filter-group">
                            <label class="filter-label">Type</label>
                            <div id="type-select-area"></div>
                        </div>
                        <div class="filter-group filter-group-checkbox" style="align-self: flex-end;">
                            <label class="filter-label">Status</label>
                            <div id="checkbox-area" class="checkbox-wrapper"></div>
                        </div>
                    </div>

                    <div class="search-filter-actions">
                        <div id="btn-create-area"></div>
                        <div class="action-buttons-right">
                            <div id="btn-clear-area"></div>
                            <div id="btn-search-area"></div>
                        </div>
                    </div>
                </div>

                <!-- Question List Card -->
                <div class="content-card">
                    <div class="card-header">
                        <h2>Question List</h2>
                    </div>
                    <div id="table-area"></div>
                    <div id="pagination-area"></div>
                </div>

                <!-- Add Question Form -->
                <div id="add-question-area"></div>

                <!-- Answer List -->
                <div id="answer-list-area"></div>

                <!-- Add Answer Form -->
                <div id="add-answer-area"></div>
            </div>
        `;

        this.renderComponents();
        this.renderAddQuestionForm();
        this.renderAnswerList();
        this.renderAddAnswerForm();
    }

    renderComponents() {
        // Search Bar
        const searchInput = `
            <input 
                type="text" 
                id="question-search" 
                class="form-control" 
                placeholder="Enter quiz name to search"
            >
        `;
        document.getElementById('search-area').innerHTML = searchInput;

        // Type Select
        const typeSelect = new BaseSelect({
            label: '',
            options: [
                { value: '', text: 'Select Item' },
                { value: 'multiple', text: 'Multiple Choice' },
                { value: 'single', text: 'Single Choice' }
            ],
            id: 'type-select'
        });
        document.getElementById('type-select-area').innerHTML = typeSelect.render();
        typeSelect.attachEvents();

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
            const query = document.getElementById('question-search').value;
            this.handleSearch(query);
        });

        // Create Button
        const createBtn = new BaseButton({
            text: "Create",
            variant: "primary",
            icon: `<img src="assets/icons/path.png" alt="create" class="icon--sm">`,
            id: "btn-create-question"
        });
        document.getElementById('btn-create-area').innerHTML = createBtn.render();
        document.getElementById('btn-create-question').addEventListener('click', () => {
            this.scrollToAddQuestionForm();
        });

        // Clear Button
        const clearBtn = new BaseButton({
            text: "Clear",
            variant: "light",
            icon: `<img src="assets/icons/rotate-left-solid.png" alt="clear" class="icon--sm">`,
            id: "btn-clear-filters"
        });
        document.getElementById('btn-clear-area').innerHTML = clearBtn.render();
        document.getElementById('btn-clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Enter key on search
        document.getElementById('question-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = document.getElementById('question-search').value;
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
        const pageData = this.filteredQuestions.slice(startIndex, endIndex);

        const table = new BaseTable({
            id: "question-table",
            columns: [
                { key: "content", label: "Content", width: "35%" },
                { key: "type", label: "Type", width: "20%" },
                { key: "answers", label: "Answers", width: "15%" },
                { 
                    key: "status", 
                    label: "Status", 
                    width: "15%", 
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
                    onClick: (row) => this.editQuestion(row),
                    style: "transform: translateY(10px)"
                },
                {
                    icon: `<img src="assets/icons/trash-can-regular.png" alt="delete" class="icon--sm" style="width: 16px; height: 16px;">`,
                    label: "Delete",
                    className: "btn-delete",
                    onClick: (row) => this.deleteQuestion(row),
                    style: "transform: translateY(10px)"
                }
            ]
        });

        document.getElementById('table-area').innerHTML = table.render();
        table.attachEvents();
    }

    renderPagination() {
        const pagination = new BasePagination({
            id: "question-pagination",
            totalItems: this.filteredQuestions.length,
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

    renderAddQuestionForm() {
        const container = document.getElementById('add-question-area');
        if (!container) return;

        container.innerHTML = `
            <div class="content-card" id="add-question-card" style="margin-top:16px;">
                <div class="card-header">
                    <h2>Add Question</h2>
                </div>
                <div class="card-body" style="padding:16px 24px;">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div id="field-content"></div>
                        <div id="field-question-type"></div>
                    </div>
                    
                    <div style="margin-top:16px;">
                        <div id="field-question-status"></div>
                    </div>

                    <div class="search-filter-actions" style="margin-top:20px;">
                        <div id="btn-show-answers-area"></div>
                        <div class="action-buttons-right">
                            <div id="btn-cancel-question-area"></div>
                            <div id="btn-save-question-area"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Render form fields
        const contentInput = new BaseTextarea({
            label: 'Content',
            placeholder: 'Enter question content',
            id: 'add-question-content',
            rows: 3
        });
        document.getElementById('field-content').innerHTML = contentInput.render();

        const typeSelect = new BaseSelect({
            label: 'Question Type',
            options: [
                { value: '', text: 'Select Question Type' },
                { value: 'multiple', text: 'Multiple Choice' },
                { value: 'single', text: 'Single Choice' }
            ],
            id: 'add-question-type'
        });
        document.getElementById('field-question-type').innerHTML = typeSelect.render();
        typeSelect.attachEvents();

        const statusCheckbox = new BaseCheckbox({
            label: 'Active',
            id: 'add-question-status',
            checked: false
        });
        document.getElementById('field-question-status').innerHTML = statusCheckbox.render();
        statusCheckbox.attachEvents();

        // Buttons
        const showAnswersBtn = new BaseButton({
            text: 'Show Answers',
            variant: 'primary',
            icon: `<img src="assets/icons/path.png" alt="answers" class="icon--sm">`,
            id: 'btn-show-answers'
        });
        document.getElementById('btn-show-answers-area').innerHTML = showAnswersBtn.render();
        document.getElementById('btn-show-answers').addEventListener('click', () => {
            this.scrollToAnswerList();
        });

        const cancelBtn = new BaseButton({
            text: 'Cancel',
            variant: 'light',
            icon: `<img src="assets/icons/rotate-left-solid.png" alt="cancel" class="icon--sm">`,
            id: 'btn-cancel-add-question'
        });
        document.getElementById('btn-cancel-question-area').innerHTML = cancelBtn.render();

        const saveBtn = new BaseButton({
            text: 'Save',
            variant: 'primary',
            icon: `<img src="assets/icons/floppy-disk-regular.png" alt="save" class="icon--sm">`,
            id: 'btn-save-add-question'
        });
        document.getElementById('btn-save-question-area').innerHTML = saveBtn.render();

        // Attach events
        document.getElementById('btn-cancel-add-question').addEventListener('click', () => this.clearAddQuestionForm());
        document.getElementById('btn-save-add-question').addEventListener('click', () => this.handleAddQuestionSave());
    }

    renderAnswerList() {
        const container = document.getElementById('answer-list-area');
        if (!container) return;

        container.innerHTML = `
            <div class="content-card" id="answer-list-card" style="margin-top:16px;">
                <div class="card-header">
                    <h2>Answer List</h2>
                </div>
                <div id="answer-table-area"></div>
                <div id="answer-pagination-area"></div>
            </div>
        `;

        this.renderAnswerTable();
        this.renderAnswerPagination();
    }

    renderAnswerTable() {
        const startIndex = (this.currentAnswerPage - 1) * this.answersPerPage;
        const endIndex = startIndex + this.answersPerPage;
        const pageData = this.filteredAnswers.slice(startIndex, endIndex);

        const table = new BaseTable({
            id: 'answer-table',
            columns: [
                { key: 'content', label: 'Content', width: '40%' },
                { key: 'isCorrect', label: 'Is Correct', width: '20%' },
                { 
                    key: 'status', 
                    label: 'Status', 
                    width: '20%',
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
                    label: 'Edit',
                    className: "btn-edit",
                    onClick: (row) => this.editAnswer(row),
                    style: "transform: translateY(9px)"
                },
                {
                    icon: `<img src="assets/icons/trash-can-regular.png" alt="delete" class="icon--sm" style="width: 16px; height: 16px;">`,
                    label: 'Delete',
                    className: "btn-delete",
                    onClick: (row) => this.deleteAnswer(row),
                    style: "transform: translateY(9px)"
                }
            ]
        });

        document.getElementById('answer-table-area').innerHTML = table.render();
        table.attachEvents();
    }

    renderAnswerPagination() {
        const pagination = new BasePagination({
            id: "answer-pagination",
            totalItems: this.filteredAnswers.length,
            itemsPerPage: this.answersPerPage,
            currentPage: this.currentAnswerPage,
            pageSizeOptions: [10, 20, 50],
            
            onPageChange: (page) => {
                this.currentAnswerPage = page;
                this.renderAnswerTable();
                this.renderAnswerPagination();
            },
            
            onPageSizeChange: (newSize) => {
                this.answersPerPage = newSize;
                this.currentAnswerPage = 1;
                this.renderAnswerTable();
                this.renderAnswerPagination();
            }
        });

        document.getElementById('answer-pagination-area').innerHTML = pagination.render();
        pagination.attachEvents();
    }

    renderAddAnswerForm() {
        const container = document.getElementById('add-answer-area');
        if (!container) return;

        container.innerHTML = `
            <div class="content-card" id="add-answer-card" style="margin-top:16px;">
                <div class="card-header">
                    <h2>Add Answer</h2>
                </div>
                <div class="card-body" style="padding:16px 24px;">
                    <div style="display:grid;grid-template-columns:1fr;gap:16px;">
                        <div id="field-answer-content"></div>
                    </div>
                    
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;">
                        <div>
                            <label class="filter-label">Is correct?</label>
                            <div id="field-is-correct" style="margin-top:8px;"></div>
                        </div>
                        <div>
                            <label class="filter-label">Status</label>
                            <div id="field-answer-status" style="margin-top:8px;"></div>
                        </div>
                        
                    </div>

                    <div class="search-filter-actions" style="margin-top:20px;">
                        <div></div>
                        <div class="action-buttons-right">
                            <div id="btn-cancel-answer-area"></div>
                            <div id="btn-save-answer-area"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Render form fields
        const contentInput = new BaseTextarea({
            label: 'Description',
            placeholder: 'Enter your email',
            id: 'add-answer-content',
            rows: 3
        });
        document.getElementById('field-answer-content').innerHTML = contentInput.render();

        const isCorrectCheckbox = new BaseCheckbox({
            label: 'Active',
            id: 'add-answer-is-correct',
            checked: false
        });
        document.getElementById('field-is-correct').innerHTML = isCorrectCheckbox.render();
        isCorrectCheckbox.attachEvents();

        const statusCheckbox = new BaseCheckbox({
            label: 'Active',
            id: 'add-answer-status',
            checked: false
        });
        document.getElementById('field-answer-status').innerHTML = statusCheckbox.render();
        statusCheckbox.attachEvents();

        // Buttons
        const cancelBtn = new BaseButton({
            text: 'Cancel',
            variant: 'light',
            icon: `<img src="assets/icons/rotate-left-solid.png" alt="cancel" class="icon--sm">`,
            id: 'btn-cancel-add-answer'
        });
        document.getElementById('btn-cancel-answer-area').innerHTML = cancelBtn.render();

        const saveBtn = new BaseButton({
            text: 'Save',
            variant: 'primary',
            icon: `<img src="assets/icons/floppy-disk-regular.png" alt="save" class="icon--sm">`,
            id: 'btn-save-add-answer'
        });
        document.getElementById('btn-save-answer-area').innerHTML = saveBtn.render();

        // Attach events
        document.getElementById('btn-cancel-add-answer').addEventListener('click', () => this.clearAddAnswerForm());
        document.getElementById('btn-save-add-answer').addEventListener('click', () => this.handleAddAnswerSave());
    }

    scrollToAddQuestionForm() {
        const form = document.getElementById('add-question-card');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
                const firstInput = document.getElementById('add-question-content');
                if (firstInput) firstInput.focus();
            }, 500);
        }
    }

    scrollToAnswerList() {
        const form = document.getElementById('answer-list-card');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    handleSearch(query) {
        this.filteredQuestions = this.allQuestions.filter(q => 
            q.content.toLowerCase().includes(query.toLowerCase())
        );
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
    }

    handleStatusFilter(checked) {
        if (checked) {
            this.filteredQuestions = this.allQuestions.filter(q => q.status === 'Yes');
        } else {
            this.filteredQuestions = [...this.allQuestions];
        }
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
    }

    clearFilters() {
        this.filteredQuestions = [...this.allQuestions];
        this.currentPage = 1;
        
        const searchInput = document.getElementById('question-search');
        const typeSelect = document.getElementById('type-select');
        const statusCheckbox = document.getElementById('chk-active');
        
        if (searchInput) searchInput.value = '';
        if (typeSelect) typeSelect.value = '';
        if (statusCheckbox) statusCheckbox.checked = false;
        
        this.renderTable();
        this.renderPagination();
    }

    clearAddQuestionForm() {
        const content = document.getElementById('add-question-content');
        const type = document.getElementById('add-question-type');
        const status = document.getElementById('add-question-status');
        
        if (content) content.value = '';
        if (type) type.value = '';
        if (status) status.checked = false;
    }

    clearAddAnswerForm() {
        const content = document.getElementById('add-answer-content');
        const isCorrect = document.getElementById('add-answer-is-correct');
        const status = document.getElementById('add-answer-status');
        
        if (content) content.value = '';
        if (isCorrect) isCorrect.checked = false;
        if (status) status.checked = false;
    }

    handleAddQuestionSave() {
        const content = (document.getElementById('add-question-content') || {}).value || '';
        const type = (document.getElementById('add-question-type') || {}).value || '';
        const status = document.getElementById('add-question-status') ? (document.getElementById('add-question-status').checked ? 'Yes' : 'No') : 'No';

        if (!content || !type) {
            alert('Please fill in all required fields');
            return;
        }

        const newId = this.allQuestions.reduce((max, q) => Math.max(max, q.id), 0) + 1;
        const newQuestion = {
            id: newId,
            content,
            type: type === 'multiple' ? 'Multiple Choice' : 'Single Choice',
            answers: 0,
            status
        };

        this.allQuestions.unshift(newQuestion);
        this.filteredQuestions.unshift(newQuestion);
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();

        this.clearAddQuestionForm();
        alert('Question added successfully!');
    }

    handleAddAnswerSave() {
        const content = (document.getElementById('add-answer-content') || {}).value || '';
        const isCorrect = document.getElementById('add-answer-is-correct') ? (document.getElementById('add-answer-is-correct').checked ? 'True' : 'False') : 'False';
        const status = document.getElementById('add-answer-status') ? (document.getElementById('add-answer-status').checked ? 'Yes' : 'No') : 'No';

        if (!content) {
            alert('Please enter answer content');
            return;
        }

        const newId = this.allAnswers.reduce((max, a) => Math.max(max, a.id), 0) + 1;
        const newAnswer = {
            id: newId,
            content,
            isCorrect,
            status
        };

        this.allAnswers.unshift(newAnswer);
        this.filteredAnswers.unshift(newAnswer);
        this.currentAnswerPage = 1;
        this.renderAnswerTable();
        this.renderAnswerPagination();

        this.clearAddAnswerForm();
        alert('Answer added successfully!');
    }

    editQuestion(question) {
        alert(`Edit Question: ${question.content}`);
    }

    deleteQuestion(question) {
        if (confirm(`Are you sure you want to delete this question?`)) {
            this.allQuestions = this.allQuestions.filter(q => q.id !== question.id);
            this.filteredQuestions = this.filteredQuestions.filter(q => q.id !== question.id);
            this.renderTable();
            this.renderPagination();
        }
    }

    editAnswer(answer) {
        alert(`Edit Answer: ${answer.content}`);
    }

    deleteAnswer(answer) {
        if (confirm(`Are you sure you want to delete this answer?`)) {
            this.allAnswers = this.allAnswers.filter(a => a.id !== answer.id);
            this.filteredAnswers = this.filteredAnswers.filter(a => a.id !== answer.id);
            this.renderAnswerTable();
            this.renderAnswerPagination();
        }
    }

    generateSampleQuestions(count) {
        const data = [];
        const contents = [
            'What is the capital of France?',
            'Who is the inventor of the World Wide Web?',
            'What is the capital of France?',
            'What are 3 countries?',
            'Where is the location of the streaming channel?',
            'When is the capital of VTV?',
            'What is the capital of France?',
            'What is the capital of India?',
            'What is the melting of the reading chlora?',
            'How is the capital of France?'
        ];
        
        const types = ['Multiple Choice', 'Single Choice'];
        
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                content: contents[i % contents.length],
                type: types[i % 2],
                answers: Math.floor(Math.random() * 5) + 2,
                status: i % 2 === 0 ? 'Yes' : 'edit'
            });
        }
        
        return data;
    }

    generateSampleAnswers(count) {
        const data = [];
        const contents = [
            'Mount Himalaya',
            'Alexander Graham Bell',
            'Belgian Element',
            'Charles Babbage'
        ];
        
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                content: contents[i % contents.length],
                isCorrect: i % 3 === 0 ? 'True' : 'False',
                status: i % 2 === 0 ? 'Yes' : 'No'
            });
        }
        
        return data;
    }
}