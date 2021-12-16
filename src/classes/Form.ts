interface Field {
  fieldType: string;
  label: string;
  placeholder: string;
  name: string;
  validators: Function[];
}

class FormInput {
  email: Field;
  name: Field;

  addField(type: string) {
    const newField: Field = {
      fieldType: "",
      label: "",
      placeholder: "",
      name: "",
      validators: []
    };
    newField.fieldType = type;
    newField.name = type + new Date();

    return {
      label(label: string): Field {
        newField.label = label;
        return this;
      },
      placeholder(placeholder: string): Field {
        newField.placeholder = placeholder;
        return this;
      },
      name(name: string): Field {
        newField.name = name;
        return this;
      },
      validators(validators: Function[]): Field {
        // todo arr
        // todo add 1 validator
        newField.validators = validators;
        return this;
      },
      generate(): Field {
        return newField;
      }
    };
  }

  getProperties() {
    return Object.getOwnPropertyNames(this).map((item) => this[item]);
  }

  getSchema(names: string[] = []): Field[] {
    if (!names.length) {
      return this.getProperties();
    }

    let res = [];
    names.forEach((element) => {
      res.push(this.getProperties().find((item) => item.name === element));
    });
    return res;
  }

  constructor() {
    this.email = this.addField("TextInput")
      .label("Email")
      .placeholder("Email")
      .name("email")
      .generate();

    this.name = this.addField("TextInput")
      .label("Name")
      .placeholder("Name")
      .name("name")
      .generate();

    // this._data = [this.email, this.name];
  }
}

export default FormInput;

export class EmployeeForm extends FormInput {
  job: Field;

  constructor() {
    super();
    this.job = this.addField("CheckBox")
      .label("Job")
      .placeholder("Job")
      .name("job")
      .generate();
  }
}

export class CompanyForm extends FormInput {
  companyName: Field;
  address: Field;
  constructor() {
    super();
    this.companyName = this.addField("TextInput")
      .label("CompanyName")
      .placeholder("CompanyName")
      .name("companyName")
      .generate();

    this.address = this.addField("TextInput")
      .label("Address")
      .placeholder("Address")
      .name("address")
      .validators([checkMinLength, checkMaxLength, checkNumbers])
      .generate();
  }
}

const checkMinLength = (value) => {
  if (value.length > 5) {
    return "";
  } else return "error < 5";
};

const checkMaxLength = (value) => {
  if (value.length < 10) {
    return "";
  } else return "error > 10";
};

const checkNumbers = (value) => {
  const pattern = /^[0-9a-zA-Z\s,-]+$/;
  console.log(pattern.test(value));

  if (pattern.test(value)) {
    return "";
  } else return "invalid format";
};
