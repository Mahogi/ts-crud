import getPropCount from '../helpers/get-prop-count';

export type TableRowData = {
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
        const columnsNamesStr = columnsNames
            .map((name) => `<th>${name}</th>`)
            .join('');
        this.thead.innerHTML = `
            <tr class="text-center h4">
                <th colspan="${columnsNames.length}">${this.props.title}</th>
            </tr>
        <tr>${columnsNamesStr}</tr> `;
    };

    private renderBodyView = () => {
       this.tbody.innerHTML = '';
        const keys = Object.keys(this.props.columns);
        this.props.rowsData.forEach((rowdata) => {
            const columnsHtmlStr = keys
                .map((key) => `<td>${rowdata[key]}</td>`)
                .join('');

            this.tbody.innerHTML += `<tr>${columnsHtmlStr}</tr>`;
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
