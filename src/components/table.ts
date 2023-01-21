import getPropCount from '../helpers/get-prop-count';
// import { StringifyObject } from '../helpers/stringify-props';

export type TableRowData = {
    id: string,
    [key: string]: string,
};

export type TableProps<Type extends TableRowData> = {
    title: string,
    columns: Type,
    rowsData: Type[],
    onDelete: (id: string) => void,
};

class Table<T extends TableRowData> {
    public static checkColumnsCompatibility<T extends TableRowData>(
        columns: T,
        rowsData: T[],
    ): boolean {
        return rowsData.every((rowdata) => getPropCount(rowdata) === getPropCount(columns));
    }

    public htmlElement: HTMLTableElement;

    private props: TableProps<T>;

    private tbody: HTMLTableSectionElement;

    private thead: HTMLTableSectionElement;

    // public constructor(props: { onDelete: any; columns: { year: string; price: string; model: string; id: string; //brand: string }; title: string; rowsData: StringifyObject<Type>[] }) {
    public constructor(props: TableProps<T>) {
        if (!Table.checkColumnsCompatibility(props.columns, props.rowsData)) {
            throw new Error('Column number doesn\'t match row data');
        }

        this.props = props;
        this.htmlElement = document.createElement('table');
        this.tbody = document.createElement('tbody');
        this.thead = document.createElement('thead');

        // console.log(this.tbody);
        this.initialize();
        this.renderView();
    }

    public initialize = () => {
        this.thead.className = 'bg-dark text-white';
        this.htmlElement.className = 'table table-striped';
        this.htmlElement.append(this.thead, this.tbody);
    };

    private renderHeadView = () => {
        const columnsNames = Object.values(this.props.columns);
        const columnsNamesStr = `${columnsNames
            .map((name) => `<th>${name}</th>`)
            .join('')}<th></th>`;
        this.thead.innerHTML = `
            <tr class="text-center h4">
                <th colspan="${columnsNames.length + 1}">${this.props.title}</th>
            </tr>
        <tr>${columnsNamesStr}</tr> `;
    };

    private renderBodyView = () => {
       this.tbody.innerHTML = '';
        const keys = Object.keys(this.props.columns);

        this.props.rowsData.forEach((rowdata) => {
            const tr = document.createElement('tr');
            const lastTd = document.createElement('td');
            const delBtn = document.createElement('button');
            delBtn.className = 'btn btn-danger btn-sm';
            delBtn.innerHTML = 'X';

            delBtn.addEventListener('click', () => {
                this.props.onDelete(rowdata.id);
            });

            tr.innerHTML = keys
            .map((key) => `<td>${rowdata[key]}</td>`)
            .join('');

            lastTd.append(delBtn);
            tr.append(lastTd);
            // const deleteBtn = tr.querySelector('.btn-danger');
            this.tbody.append(tr);
        });
    };

    private renderView = () => {
        this.renderHeadView();
        this.renderBodyView();
    };

    public updateProps = (newProps: Partial<TableProps<T>>) => {
        this.props = {
            ...this.props,
            ...newProps,
        };
        this.renderView();
    };
}

export default Table;
