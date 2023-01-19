import getPropCount from '../helpers/get-prop-count';

type TableRowData = {
    id: string,
    [key: string]: string,
};

type TableProps<Type extends TableRowData> = {
    title: string,
    columns: Type,
    rowsData: Type[],
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

    public constructor(props: TableProps<T>) {
        if (!Table.checkColumnsCompatibility(props.columns, props.rowsData)) {
            throw new Error('Column number doesn\'t match row data');
        }

        this.props = props;
        this.htmlElement = document.createElement('table');
        this.tbody = document.createElement('tbody');
        this.thead = document.createElement('thead');

        console.log(this.tbody);
        this.initialize();
    }

    public initializeHead = () => {
        const columnsNames = Object.values(this.props.columns);
        const columnsNamesStr = columnsNames
            .map((name) => `<th>${name}</th>`)
            .join('');
        this.thead.className = 'bg-dark text-white';
        this.thead.innerHTML = `
            <tr class="text-center h4">
                <th colspan="${columnsNames.length}">${this.props.title}</th>
            </tr>
        <tr>${columnsNamesStr}</tr> `;
    };

    public initializeBody = () => {
        const keys = Object.keys(this.props.columns);
        this.props.rowsData.forEach((rowdata) => {
            // const columnsNames = Object.values(rowdata);

            const columnsHtmlStr = keys
                .map((key) => `<td>${rowdata[key]}</td>`)
                .join('');
           // this.thead.innerHTML = `<tr>${columnsNamesStr}</tr> `;
            // const rowHtmlStr = `<tr>${columnsHtmlStr}</tr>`;
            this.tbody.innerHTML += `<tr>${columnsHtmlStr}</tr>`;
        });
    };

    public initialize = () => {
        this.initializeHead();
        this.initializeBody();

        this.htmlElement.className = 'table table-striped';
        this.htmlElement.append(this.thead, this.tbody);
    };
}

export default Table;
