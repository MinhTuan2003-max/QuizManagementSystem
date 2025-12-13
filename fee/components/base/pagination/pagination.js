export class BasePagination {
    constructor({ 
        id, 
        totalItems, 
        itemsPerPage = 10, 
        currentPage = 1, 
        pageSizeOptions = [10, 20, 50],
        onPageChange,
        onPageSizeChange 
    }) {
        this.id = id;
        this.totalItems = totalItems;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = currentPage;
        this.pageSizeOptions = pageSizeOptions;
        this.onPageChange = onPageChange;
        this.onPageSizeChange = onPageSizeChange;
        this.totalPages = Math.ceil(totalItems / itemsPerPage);
    }

    render() {
        const pages = this.getPageNumbers();
        const startItem = this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);

        return `
            <div class="pagination-wrapper" id="${this.id}">
                <div class="pagination-size-selector">
                    <span class="pagination-label">Items per page:</span>
                    <div class="select-wrapper">
                        <select class="pagination-select" aria-label="Items per page">
                            ${this.pageSizeOptions.map(opt => 
                                `<option value="${opt}" ${opt === this.itemsPerPage ? 'selected' : ''}>${opt}</option>`
                            ).join('')}
                        </select>
                        <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>

                <div class="pagination-right-section">
                    <div class="pagination-controls">
                        <button type="button" class="pagination-btn pagination-icon-btn" 
                            ${this.currentPage === 1 ? 'disabled' : ''} data-page="1">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="11 17 6 12 11 7"></polyline>
                                <polyline points="18 17 13 12 18 7"></polyline>
                            </svg>
                        </button>

                        <button type="button" class="pagination-btn pagination-icon-btn" 
                            ${this.currentPage === 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>

                        ${pages.map(page => {
                            if (page === '...') {
                                return `<span class="pagination-ellipsis">...</span>`;
                            }
                            return `
                                <button type="button" 
                                    class="pagination-btn pagination-number-btn ${page === this.currentPage ? 'active' : ''}" 
                                    data-page="${page}">
                                    ${page}
                                </button>
                            `;
                        }).join('')}

                        <button type="button" class="pagination-btn pagination-icon-btn" 
                            ${this.currentPage === this.totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                        <button type="button" class="pagination-btn pagination-icon-btn" 
                            ${this.currentPage === this.totalPages ? 'disabled' : ''} data-page="${this.totalPages}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="13 17 18 12 13 7"></polyline>
                                <polyline points="6 17 11 12 6 7"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="pagination-info">
                        ${startItem}-${endItem} of ${this.totalItems}
                </div>
            </div>
        `;
    }

    getPageNumbers() {
        const pages = [];
        const maxVisible = 5;

        if (this.totalPages <= maxVisible + 2) {
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (this.currentPage <= 3) {
                for (let i = 1; i <= maxVisible; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(this.totalPages);
            } else if (this.currentPage >= this.totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = this.totalPages - maxVisible + 1; i <= this.totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(this.totalPages);
            }
        }
        return pages;
    }

    attachEvents() {
        const container = document.getElementById(this.id);
        if (!container) return;

        // Xử lý click chuyển trang
        container.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget; // Sử dụng currentTarget để lấy đúng button (kể cả click vào svg)
                if (target.disabled) return;
                
                const page = parseInt(target.dataset.page);
                if (page && page !== this.currentPage && this.onPageChange) {
                    this.currentPage = page;
                    this.onPageChange(page);
                }
            });
        });

        // Xử lý thay đổi items per page
        const select = container.querySelector('.pagination-select');
        if (select) {
            select.addEventListener('change', (e) => {
                const newSize = parseInt(e.target.value);
                if (this.onPageSizeChange) {
                    this.onPageSizeChange(newSize);
                }
            });
        }
    }

    update(totalItems, currentPage) {
        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
        
        const container = document.getElementById(this.id);
        if (container) {
            container.outerHTML = this.render();
            this.attachEvents();
        }
    }
}