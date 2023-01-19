export type Option = {
    text: string,
    value: string,
};

type SelectFieldProps = {
    options: Option[],
};

class SelectField {
    public htmlElement: HTMLElement;

    private options: SelectFieldProps['options'];

    public constructor({ options }: SelectFieldProps) {
        this.htmlElement = document.createElement('select');
        this.options = options;
        this.initialize();
    }

    private initialize() {
        const optionStr = this.options.map(({ text, value }) => `<option value="${value}">${text}</option>`);

        this.htmlElement.className = 'form-select mb-3';
        this.htmlElement.innerHTML += optionStr;
    }
}

export default SelectField;
