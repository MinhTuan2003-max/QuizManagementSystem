import { BaseButton } from '../../../base/button/button.js';
import { BaseSelect } from '../../../base/select/select.js';
import { BaseCheckbox } from '../../../base/checkbox/checkbox.js';
import { BaseInput } from '../../../base/input/input.js';
import { BaseTextarea } from '../../../base/textarea/textarea.js';
import { BaseTable } from '../../../base/table/table.js';
import { BasePagination } from '../../../base/pagination/pagination.js';

export class RoleManagementPage {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.allRoles = this.generateSampleData(32);
        this.filteredRoles = [...this.allRoles];
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container">
                <!-- Search & Filter Section -->
                <div class="search-filter-section">
                    <div class="filter-section-header">
                        <h2 class="filter-section-title">Role Management</h2>
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
                        <div id="btn-create-area"></div>
                        <div class="action-buttons-right">
                            <div id="btn-clear-area"></div>
                            <div id="btn-search-area"></div>
                        </div>
                    </div>
                </div>

                <!-- Role List Card -->
                <div class="content-card">
                    <div class="card-header">
                        <h2>Role List</h2>
                    </div>
                    <div id="table-area"></div>
                    <div id="pagination-area"></div>
                </div>

                <!-- Add Role Form (Always Visible) -->
                <div id="add-role-area"></div>
            </div>
        `;

        this.renderComponents();
        this.renderAddRoleForm();
    }

    renderComponents() {
        // Search Bar
        const searchInput = `
            <input 
                type="text" 
                id="role-search" 
                class="form-control-search" 
                placeholder="Enter role name to search"
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
            const query = document.getElementById('role-search').value;
            this.handleSearch(query);
        });

        // Create Button
        const createBtn = new BaseButton({
            text: "Create",
            variant: "primary",
            icon: `<img src="assets/icons/path.png" alt="create" class="icon--sm">`,
            id: "btn-create-role"
        });
        document.getElementById('btn-create-area').innerHTML = createBtn.render();
        document.getElementById('btn-create-role').addEventListener('click', () => {
            this.scrollToAddRoleForm();
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
        document.getElementById('role-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = document.getElementById('role-search').value;
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
        const pageData = this.filteredRoles.slice(startIndex, endIndex);

        const table = new BaseTable({
            id: "role-table",
            columns: [
                { key: "name", label: "Name", width: "25%" },
                { key: "description", label: "Description", width: "45%" },
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
                    onClick: (row) => this.editRole(row),
                    style: "transform: translateY(10px);"
                },
                {
                    icon: `<img src="assets/icons/trash-can-regular.png" alt="delete" class="icon--sm" style="width: 16px; height: 16px;">`,
                    label: "Delete",
                    className: "btn-delete",
                    onClick: (row) => this.deleteRole(row),
                    style: "transform: translateY(10px);"
                }
            ]
        });

        document.getElementById('table-area').innerHTML = table.render();
        table.attachEvents();
    }

    renderPagination() {
        const pagination = new BasePagination({
            id: "role-pagination",
            totalItems: this.filteredRoles.length,
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

    renderAddRoleForm() {
        const container = document.getElementById('add-role-area');
        if (!container) return;

        container.innerHTML = `
            <div class="content-card" id="add-role-card" style="margin-top:16px;">
                <div class="card-header">
                    <h2>Add Role</h2>
                </div>
                <div class="card-body" style="padding:16px 24px;">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div id="field-name"></div>
                        <div id="field-description"></div>
                    </div>
                    
                    <div style="margin-top:16px;">
                        <label class="filter-label">Status</label>
                        <div id="field-status" style="margin-top:8px;"></div>
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
        const nameInput = new BaseInput({
            label: 'Name',
            type: 'text',
            placeholder: 'Enter role name',
            id: 'add-role-name'
        });
        document.getElementById('field-name').innerHTML = nameInput.render();

        const descInput = new BaseTextarea({
            label: 'Description',
            placeholder: 'Enter role description',
            id: 'add-role-description',
            rows: 3
        });
        document.getElementById('field-description').innerHTML = descInput.render();

        const statusCheckbox = new BaseCheckbox({
            label: 'Active',
            id: 'add-role-status',
            checked: false
        });
        document.getElementById('field-status').innerHTML = statusCheckbox.render();
        statusCheckbox.attachEvents();

        // Buttons
        const cancelBtn = new BaseButton({
            text: 'Cancel',
            variant: 'outline',
            icon: `<img src="assets/icons/rotate-left-solid.png" alt="cancel" class="icon--sm">`,
            id: 'btn-cancel-add-role'
        });
        document.getElementById('btn-cancel-area').innerHTML = cancelBtn.render();

        const saveBtn = new BaseButton({
            text: 'Save',
            variant: 'primary',
            icon: `<img src="assets/icons/floppy-disk-regular.png" alt="save" class="icon--sm">`,
            id: 'btn-save-add-role'
        });
        document.getElementById('btn-save-area').innerHTML = saveBtn.render();

        // Attach events
        document.getElementById('btn-cancel-add-role').addEventListener('click', () => this.clearAddRoleForm());
        document.getElementById('btn-save-add-role').addEventListener('click', () => this.handleAddRoleSave());
    }

    scrollToAddRoleForm() {
        const form = document.getElementById('add-role-card');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Focus on first input
            setTimeout(() => {
                const firstInput = document.getElementById('add-role-name');
                if (firstInput) firstInput.focus();
            }, 500);
        }
    }

    handleSearch(query) {
        this.filteredRoles = this.allRoles.filter(r => 
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.description.toLowerCase().includes(query.toLowerCase())
        );
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
    }

    handleStatusFilter(checked) {
        if (checked) {
            this.filteredRoles = this.allRoles.filter(r => r.status === 'Yes');
        } else {
            this.filteredRoles = [...this.allRoles];
        }
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
    }

    clearFilters() {
        this.filteredRoles = [...this.allRoles];
        this.currentPage = 1;
        
        const searchInput = document.getElementById('role-search');
        const statusCheckbox = document.getElementById('chk-active');
        
        if (searchInput) searchInput.value = '';
        if (statusCheckbox) statusCheckbox.checked = false;
        
        this.renderTable();
        this.renderPagination();
    }

    clearAddRoleForm() {
        // Clear all form inputs
        const inputs = ['add-role-name', 'add-role-description'];
        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        
        const statusCheckbox = document.getElementById('add-role-status');
        if (statusCheckbox) statusCheckbox.checked = false;
    }

    handleAddRoleSave() {
        const name = (document.getElementById('add-role-name') || {}).value || '';
        const description = (document.getElementById('add-role-description') || {}).value || '';
        const status = document.getElementById('add-role-status') ? (document.getElementById('add-role-status').checked ? 'Yes' : 'No') : 'No';

        if (!name) {
            alert('Please enter role name');
            return;
        }

        const newId = this.allRoles.reduce((max, r) => Math.max(max, r.id), 0) + 1;
        const newRole = {
            id: newId,
            name,
            description,
            status
        };

        // Add to data
        this.allRoles.unshift(newRole);
        this.filteredRoles.unshift(newRole);
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();

        // Clear form
        this.clearAddRoleForm();
        
        alert('Role added successfully!');
    }

    editRole(role) {
        alert(`Edit Role: ${role.name}`);
    }

    deleteRole(role) {
        if (confirm(`Are you sure you want to delete "${role.name}"?`)) {
            this.allRoles = this.allRoles.filter(r => r.id !== role.id);
            this.filteredRoles = this.filteredRoles.filter(r => r.id !== role.id);
            this.renderTable();
            this.renderPagination();
        }
    }

    generateSampleData(count) {
        const data = [];
        const names = ['Admin', 'Editor', 'User'];
        const descriptions = ['Full Access', 'Editable', 'Customer'];
        
        for (let i = 1; i <= count; i++) {
            const index = i % 3;
            data.push({
                id: i,
                name: names[index],
                description: descriptions[index],
                status: i % 2 === 0 ? 'Yes' : 'No'
            });
        }
        
        return data;
    }
}