import { BaseButton } from '../../../base/button/button.js';
import { BaseSelect } from '../../../base/select/select.js';
import { BaseCheckbox } from '../../../base/checkbox/checkbox.js';
import { BaseInput } from '../../../base/input/input.js';
import { BaseTextarea } from '../../../base/textarea/textarea.js';
import { BaseTable } from '../../../base/table/table.js';
import { BasePagination } from '../../../base/pagination/pagination.js';
import { BaseSearch } from '../../../base/search-bar/search.js';

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
                    <!-- Section Header -->
                    <div class="filter-section-header">
                        <h2 class="filter-section-title">Quiz Management</h2>
                    </div>

                    <!-- Search & Status Row -->
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

                    <!-- Action Buttons Row -->
                    <div class="search-filter-actions">
                        <div id="btn-create-area"></div>
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
                <div id="add-quiz-area"></div>
            </div>
        `;

        this.renderComponents();
    }

    renderComponents() {
        // Search Bar (without integrated button)
        const searchInput = `
            <input 
                type="text" 
                id="quiz-search" 
                class="form-control-search" 
                placeholder="Enter quiz name to search"
            >
        `;
        document.getElementById('search-area').innerHTML = searchInput;

        // Active/Status Checkbox
        const statusCheckbox = new BaseCheckbox({
            label: "Active",
            id: "chk-active",
            checked: false,
            onChange: (checked) => this.handleStatusFilter(checked)
        });
        document.getElementById('checkbox-area').innerHTML = statusCheckbox.render();
        statusCheckbox.attachEvents();

        // Create Button
        const createBtn = new BaseButton({
            text: "Create",
            variant: "primary",
            icon: `<img src="assets/icons/path.png" alt="plus" class="icon--sm">`,
            id: "btn-create"
        });
        document.getElementById('btn-create-area').innerHTML = createBtn.render();
        document.getElementById('btn-create').addEventListener('click', () => {
            this.showAddQuizModal();
        });

        // Search Button Handler
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

        // Clear Button Handler
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

        // Enter key on search input
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
                    key: "thumbnail", 
                    label: "Thumbnail", 
                    width: "100px", 
                    render: (val) => `<img src="${val}" alt="Quiz" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px;">`
                },
                { key: "title", label: "Title", width: "25%" },
                { key: "description", label: "Description", width: "30%" },
                { key: "duration", label: "Duration", width: "100px" },
                { key: "questions", label: "Questions", width: "100px", render: (val) => `<span style="text-align: center; display: block;">${val}</span>` },
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
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
                    label: "Edit",
                    className: "btn-edit",
                    onClick: (row) => this.editQuiz(row)
                },
                {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
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
            pageSizeOptions: [10, 20, 50], // Các tùy chọn số lượng item
            
            // Xử lý khi người dùng chuyển trang
            onPageChange: (page) => {
                this.currentPage = page;
                this.renderTable();
                this.renderPagination();
            },
            
            // Xử lý khi người dùng đổi số lượng item/trang (Logic mới)
            onPageSizeChange: (newSize) => {
                this.itemsPerPage = newSize;
                this.currentPage = 1; // Reset về trang 1
                this.renderTable();
                this.renderPagination();
            }
        });

        document.getElementById('pagination-area').innerHTML = pagination.render();
        pagination.attachEvents();
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
        // Reset all filters
        this.filteredQuizzes = [...this.allQuizzes];
        this.currentPage = 1;
        
        // Reset UI inputs
        const searchInput = document.getElementById('quiz-search');
        const statusCheckbox = document.getElementById('chk-active');
        
        if (searchInput) searchInput.value = '';
        if (statusCheckbox) statusCheckbox.checked = false;
        
        this.renderTable();
        this.renderPagination();
    }

    showAddQuizModal() {
        // If form already visible, toggle it off
        const container = document.getElementById('add-quiz-area');
        if (!container) return;
        if (container.innerHTML && container.innerHTML.trim() !== '') {
            this.removeAddQuizForm();
            return;
        }

        this.renderAddQuizForm();
    }

    renderAddQuizForm() {
        const container = document.getElementById('add-quiz-area');
        if (!container) return;

        // Create form HTML structure
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
                        <div id="btn-show-question-area"></div>
                        <div class="action-buttons-right">
                            <div id="btn-cancel-area"></div>
                            <div id="btn-save-area"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Render base components
        const titleInput = new BaseInput({
            label: 'Title',
            type: 'text',
            placeholder: 'Enter quiz title',
            id: 'add-quiz-title'
        });
        document.getElementById('field-title').innerHTML = titleInput.render();

        const descInput = new BaseTextarea({
            label: 'Description',
            placeholder: 'Enter your mail',
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
            checked: false
        });
        document.getElementById('field-status').innerHTML = statusCheckbox.render();
        statusCheckbox.attachEvents();

        // Buttons
        const showQuestionsBtn = new BaseButton({
            text: 'Show Questions',
            variant: 'primary',
            icon: `<img src="assets/icons/path.png" alt="questions" class="icon--sm">`,
            id: 'btn-show-question-area'
        });
        document.getElementById('btn-show-question-area').innerHTML = showQuestionsBtn.render();
        document.getElementById('btn-show-question-area').addEventListener('click', () => {
            alert('Show Questions clicked! (Functionality to be implemented)');
        });

        const cancelBtn = new BaseButton({
            text: 'Cancel',
            variant: 'outline',
            icon: `<img src="assets/icons/rotate-left-solid.png" alt="xmark" class="icon--sm">`,
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

        // Attach button handlers
        document.getElementById('btn-cancel-add-quiz').addEventListener('click', () => this.removeAddQuizForm());
        document.getElementById('btn-save-add-quiz').addEventListener('click', () => this.handleAddQuizSave());

        // Scroll into view so user sees the form
        setTimeout(() => {
            const el = document.getElementById('add-quiz-card');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }

    removeAddQuizForm() {
        const container = document.getElementById('add-quiz-area');
        if (!container) return;
        container.innerHTML = '';
    }

    handleAddQuizSave() {
        const title = (document.getElementById('add-quiz-title') || {}).value || 'Untitled Quiz';
        const description = (document.getElementById('add-quiz-description') || {}).value || '';
        const duration = (document.getElementById('add-quiz-duration') || {}).value || '';
        const thumbnail = (document.getElementById('add-quiz-thumbnail') || {}).value || `https://picsum.photos/seed/${Date.now()}/200/200`;
        const status = document.getElementById('add-quiz-status') ? (document.getElementById('add-quiz-status').checked ? 'Yes' : 'No') : 'No';

        const newId = this.allQuizzes.reduce((max, q) => Math.max(max, q.id), 0) + 1;
        const newQuiz = {
            id: newId,
            thumbnail,
            title,
            description,
            duration,
            questions: 0,
            status
        };

        // Add to data and refresh list
        this.allQuizzes.unshift(newQuiz);
        this.filteredQuizzes.unshift(newQuiz);
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();

        // Remove the form
        this.removeAddQuizForm();
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
                thumbnail: `https://picsum.photos/seed/${i}/200/200`,
                title: titles[index],
                description: descriptions[index],
                duration: `${10 + (i % 5)}m`,
                questions: 5 + (i % 15),
                // Fix logic status để có cả Yes và No cho dễ test filter
                status: i % 2 === 0 ? 'Yes' : 'No' 
            });
        }
        
        return data;
    }
}