export class BaseTable {
    constructor({ id, columns = [], data = [], actions = [] }) {
        this.id = id;
        this.columns = columns; // [{key, label, width}]
        this.data = data; // Array of objects
        this.actions = actions; // [{icon, label, onClick, className}]
    }

    render() {
        const headerHTML = this.columns.map(col => 
            `<th style="${col.width ? `width: ${col.width}` : ''}">${col.label}</th>`
        ).join('');

        const rowsHTML = this.data.map((row, index) => `
            <tr data-row-index="${index}">
                ${this.columns.map(col => `
                    <td>${this.formatCell(row[col.key], col)}</td>
                `).join('')}
                ${this.actions.length > 0 ? `
                    <td class="table-actions">
                        ${this.actions.map(action => `
                            <button 
                                type="button" 
                                class="btn-icon ${action.className || ''}" 
                                data-action="${action.label}"
                                data-row-index="${index}"
                                title="${action.label}"
                            >
                                ${action.icon}
                            </button>
                        `).join('')}
                    </td>
                ` : ''}
            </tr>
        `).join('');

        return `
            <div class="table-wrapper">
                <table class="table" id="${this.id}">
                    <thead>
                        <tr>
                            ${headerHTML}
                            ${this.actions.length > 0 ? '<th style="width: 100px">Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHTML || '<tr><td colspan="100%" class="text-center">No data available</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    }

    formatCell(value, column) {
        if (column.render) {
            return column.render(value);
        }
        return value || '-';
    }

    attachEvents() {
        const table = document.getElementById(this.id);
        if (!table) return;

        // Attach action button events
        table.querySelectorAll('.btn-icon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rowIndex = parseInt(e.currentTarget.dataset.rowIndex);
                const actionLabel = e.currentTarget.dataset.action;
                const action = this.actions.find(a => a.label === actionLabel);
                
                if (action && action.onClick) {
                    action.onClick(this.data[rowIndex], rowIndex);
                }
            });
        });
    }

    updateData(newData) {
        this.data = newData;
        const tbody = document.querySelector(`#${this.id} tbody`);
        if (tbody) {
            const rowsHTML = this.data.map((row, index) => `
                <tr data-row-index="${index}">
                    ${this.columns.map(col => `
                        <td>${this.formatCell(row[col.key], col)}</td>
                    `).join('')}
                    ${this.actions.length > 0 ? `
                        <td class="table-actions">
                            ${this.actions.map(action => `
                                <button 
                                    type="button" 
                                    class="btn-icon ${action.className || ''}" 
                                    data-action="${action.label}"
                                    data-row-index="${index}"
                                    title="${action.label}"
                                >
                                    ${action.icon}
                                </button>
                            `).join('')}
                        </td>
                    ` : ''}
                </tr>
            `).join('');

            tbody.innerHTML = rowsHTML || '<tr><td colspan="100%" class="text-center">No data available</td></tr>';
            this.attachEvents();
        }
    }
}