import { BaseButton } from '../../../base/button/button.js';
import { BaseSelect } from '../../../base/select/select.js';
import { BaseCheckbox } from '../../../base/checkbox/checkbox.js';
import { BaseInput } from '../../../base/input/input.js';
import { BaseTextarea } from '../../../base/textarea/textarea.js';
import { BaseTable } from '../../../base/table/table.js';
import { BasePagination } from '../../../base/pagination/pagination.js';

export class UserManagementPage {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.allUsers = this.generateSampleData(32);
        this.filteredUsers = [...this.allUsers];
    }

    render() {
        this.container.innerHTML = `
            <div class="page-container">
                <!-- Search & Filter Section -->
                <div class="search-filter-section">
                    <div class="filter-section-header">
                        <h2 class="filter-section-title">User Management</h2>
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

                <!-- User List Card -->
                <div class="content-card">
                    <div class="card-header">
                        <h2>User List</h2>
                    </div>
                    <div id="table-area"></div>
                    <div id="pagination-area"></div>
                </div>

                <!-- Add User Form -->
                <div id="add-user-area"></div>
            </div>
        `;

        this.renderComponents();
        this.renderAddUserForm();
    }

    renderComponents() {
        // Search Bar
        const searchInput = `
            <input 
                type="text" 
                id="user-search" 
                class="form-control-search" 
                placeholder="Enter username to search"
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
            const query = document.getElementById('user-search').value;
            this.handleSearch(query);
        });

        // Create Button
        const createBtn = new BaseButton({
            text: "Create",
            variant: "primary",
            icon: `<img src="assets/icons/path.png" alt="create" class="icon--sm">`,
            id: "btn-create-user"
        });
        document.getElementById('btn-create-area').innerHTML = createBtn.render();
        document.getElementById('btn-create-user').addEventListener('click', () => {
            this.scrollToAddUserForm();
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
        document.getElementById('user-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = document.getElementById('user-search').value;
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
        const pageData = this.filteredUsers.slice(startIndex, endIndex);

        const table = new BaseTable({
            id: "user-table",
            columns: [
                { key: "firstName", label: "First Name", width: "12%" },
                { key: "lastName", label: "Last Name", width: "12%" },
                { key: "email", label: "Email", width: "18%" },
                { key: "userName", label: "User Name", width: "12%" },
                { key: "phoneNumber", label: "Phone Number", width: "13%" },
                { 
                    key: "status", 
                    label: "Status", 
                    width: "10%", 
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
                    onClick: (row) => this.editUser(row)
                },
                {
                    icon: `<img src="assets/icons/trash-can-regular.png" alt="delete" class="icon--sm" style="width: 16px; height: 16px;">`,
                    label: "Delete",
                    className: "btn-delete",
                    onClick: (row) => this.deleteUser(row)
                }
            ]
        });

        document.getElementById('table-area').innerHTML = table.render();
        table.attachEvents();
    }

    renderPagination() {
        const pagination = new BasePagination({
            id: "user-pagination",
            totalItems: this.filteredUsers.length,
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

    renderAddUserForm() {
        const container = document.getElementById('add-user-area');
        if (!container) return;

        container.innerHTML = `
            <div class="content-card" id="add-user-card" style="margin-top:16px;">
                <div class="card-header">
                    <h2>Add User</h2>
                </div>
                <div class="card-body" style="padding:16px 24px;">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div id="field-first-name"></div>
                        <div id="field-last-name"></div>
                        <div id="field-email"></div>
                        <div id="field-user-name"></div>
                        <div id="field-password"></div>
                        <div id="field-confirm-password"></div>
                        <div id="field-date-of-birth"></div>
                        <div id="field-phone-number"></div>
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
        const firstNameInput = new BaseInput({
            label: 'First Name',
            type: 'text',
            placeholder: 'Enter your first name',
            id: 'add-user-first-name'
        });
        document.getElementById('field-first-name').innerHTML = firstNameInput.render();

        const lastNameInput = new BaseInput({
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter your last name',
            id: 'add-user-last-name'
        });
        document.getElementById('field-last-name').innerHTML = lastNameInput.render();

        const emailInput = new BaseInput({
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
            id: 'add-user-email'
        });
        document.getElementById('field-email').innerHTML = emailInput.render();

        const userNameInput = new BaseInput({
            label: 'User Name',
            type: 'text',
            placeholder: 'Enter your user name',
            id: 'add-user-user-name'
        });
        document.getElementById('field-user-name').innerHTML = userNameInput.render();

        const passwordInput = new BaseInput({
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            id: 'add-user-password'
        });
        document.getElementById('field-password').innerHTML = passwordInput.render();

        const confirmPasswordInput = new BaseInput({
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm your password',
            id: 'add-user-confirm-password'
        });
        document.getElementById('field-confirm-password').innerHTML = confirmPasswordInput.render();

        const dateOfBirthInput = new BaseInput({
            label: 'Date of Birth',
            type: 'date',
            placeholder: 'Enter your date of birth',
            id: 'add-user-date-of-birth'
        });
        document.getElementById('field-date-of-birth').innerHTML = dateOfBirthInput.render();

        const phoneNumberInput = new BaseInput({
            label: 'Phone Number',
            type: 'tel',
            placeholder: 'Enter your phone number',
            id: 'add-user-phone-number'
        });
        document.getElementById('field-phone-number').innerHTML = phoneNumberInput.render();

        const statusCheckbox = new BaseCheckbox({
            label: 'Active',
            id: 'add-user-status',
            checked: false
        });
        document.getElementById('field-status').innerHTML = statusCheckbox.render();
        statusCheckbox.attachEvents();

        // Buttons
        const cancelBtn = new BaseButton({
            text: 'Cancel',
            variant: 'outline',
            icon: `<img src="assets/icons/rotate-left-solid.png" alt="cancel" class="icon--sm">`,
            id: 'btn-cancel-add-user'
        });
        document.getElementById('btn-cancel-area').innerHTML = cancelBtn.render();

        const saveBtn = new BaseButton({
            text: 'Save',
            variant: 'primary',
            icon: `<img src="assets/icons/floppy-disk-regular.png" alt="save" class="icon--sm">`,
            id: 'btn-save-add-user'
        });
        document.getElementById('btn-save-area').innerHTML = saveBtn.render();

        // Attach events
        document.getElementById('btn-cancel-add-user').addEventListener('click', () => this.clearAddUserForm());
        document.getElementById('btn-save-add-user').addEventListener('click', () => this.handleAddUserSave());
    }

    scrollToAddUserForm() {
        const form = document.getElementById('add-user-card');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
                const firstInput = document.getElementById('add-user-first-name');
                if (firstInput) firstInput.focus();
            }, 500);
        }
    }

    handleSearch(query) {
        this.filteredUsers = this.allUsers.filter(u => 
            u.firstName.toLowerCase().includes(query.toLowerCase()) ||
            u.lastName.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase()) ||
            u.userName.toLowerCase().includes(query.toLowerCase())
        );
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
    }

    handleStatusFilter(checked) {
        if (checked) {
            this.filteredUsers = this.allUsers.filter(u => u.status === 'Yes');
        } else {
            this.filteredUsers = [...this.allUsers];
        }
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();
    }

    clearFilters() {
        this.filteredUsers = [...this.allUsers];
        this.currentPage = 1;
        
        const searchInput = document.getElementById('user-search');
        const statusCheckbox = document.getElementById('chk-active');
        
        if (searchInput) searchInput.value = '';
        if (statusCheckbox) statusCheckbox.checked = false;
        
        this.renderTable();
        this.renderPagination();
    }

    clearAddUserForm() {
        const inputs = [
            'add-user-first-name', 
            'add-user-last-name', 
            'add-user-email', 
            'add-user-user-name',
            'add-user-password',
            'add-user-confirm-password',
            'add-user-date-of-birth',
            'add-user-phone-number'
        ];
        
        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        
        const statusCheckbox = document.getElementById('add-user-status');
        if (statusCheckbox) statusCheckbox.checked = false;
    }

    handleAddUserSave() {
        const firstName = (document.getElementById('add-user-first-name') || {}).value || '';
        const lastName = (document.getElementById('add-user-last-name') || {}).value || '';
        const email = (document.getElementById('add-user-email') || {}).value || '';
        const userName = (document.getElementById('add-user-user-name') || {}).value || '';
        const password = (document.getElementById('add-user-password') || {}).value || '';
        const confirmPassword = (document.getElementById('add-user-confirm-password') || {}).value || '';
        const dateOfBirth = (document.getElementById('add-user-date-of-birth') || {}).value || '';
        const phoneNumber = (document.getElementById('add-user-phone-number') || {}).value || '';
        const status = document.getElementById('add-user-status') ? (document.getElementById('add-user-status').checked ? 'Yes' : 'No') : 'No';

        // Validation
        if (!firstName || !lastName || !email || !userName || !password) {
            alert('Please fill in all required fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const newId = this.allUsers.reduce((max, u) => Math.max(max, u.id), 0) + 1;
        const newUser = {
            id: newId,
            firstName,
            lastName,
            email,
            userName,
            phoneNumber,
            status
        };

        // Add to data
        this.allUsers.unshift(newUser);
        this.filteredUsers.unshift(newUser);
        this.currentPage = 1;
        this.renderTable();
        this.renderPagination();

        // Clear form
        this.clearAddUserForm();
        
        alert('User added successfully!');
    }

    editUser(user) {
        alert(`Edit User: ${user.firstName} ${user.lastName}`);
    }

    deleteUser(user) {
        if (confirm(`Are you sure you want to delete "${user.firstName} ${user.lastName}"?`)) {
            this.allUsers = this.allUsers.filter(u => u.id !== user.id);
            this.filteredUsers = this.filteredUsers.filter(u => u.id !== user.id);
            this.renderTable();
            this.renderPagination();
        }
    }

    generateSampleData(count) {
        const data = [];
        const firstNames = ['Admin', 'Editor', 'Cong', 'Van'];
        const lastNames = ['User', 'User', 'Dinh', 'Nguyen'];
        const emails = ['admin@domain.com', 'editor@domain.com', 'congdinh@domain.com', 'vannguyen@domain.com'];
        const userNames = ['admin', 'editor', 'congdinh', 'vannguyen'];
        const phoneNumbers = ['+84287654321', '+84287654321', '+84287654321', '+84287654321'];
        
        for (let i = 1; i <= count; i++) {
            const index = i % 4;
            data.push({
                id: i,
                firstName: firstNames[index],
                lastName: lastNames[index],
                email: emails[index],
                userName: userNames[index],
                phoneNumber: phoneNumbers[index],
                status: i % 2 === 0 ? 'Yes' : 'No'
            });
        }
        
        return data;
    }
}