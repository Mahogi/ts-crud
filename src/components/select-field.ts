export type Option = {
    text: string,
    value: string,
};

export type SelectFieldProps = {
    options: Option[],
    onChange?: (event: Event, value: string, option: Option) => void
    // onChange?: ((event: Event, value: string, option: Option) => void) | undefined
};

class SelectField {
    public htmlElement: HTMLSelectElement;
    private options: SelectFieldProps['options'];
    private onChange: SelectFieldProps['onChange'];

    public constructor({ options, onChange }: SelectFieldProps) {
        this.htmlElement = document.createElement('select');
        this.options = options;
        this.onChange = onChange;
        this.initialize();
    }

    handleOptionChange = (event: Event) => {
        if (this.onChange !== undefined) {
            const { value } = this.htmlElement;
            const [option] = this.options.filter((opt) => opt.value === value);
            this.onChange(event, value, option);
        }
    };

    private initialize() {
        const optionStr = this.options
            .map(({ text, value }) => `<option value="${value}">${text}</option>`)
            .join('');

        this.htmlElement.addEventListener('change', this.handleOptionChange);
        this.htmlElement.className = 'form-select mb-3';
        this.htmlElement.innerHTML = optionStr;
    }
}

export default SelectField;
