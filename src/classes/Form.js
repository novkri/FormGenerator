class FormInput {
  _data = [];

  addField(type) {
    const newField = {};
    newField.fieldType = type;
    newField.name = type + new Date();

    return {
      label(label) {
        newField.label = label;
        return this;
      },
      placeholder(placeholder) {
        newField.placeholder = placeholder;
        return this;
      },
      name(name) {
        newField.name = name;
        return this;
      },
      validators(validators) {
        // todo arr
        // todo add 1 validator
        newField.validators = validators;
        return this;
      },
      generate() {
        return newField;
      }
    };
  }

  getSchema(names = []) {
    console.log(this);
    if (!names.length) {
      return this._data;
    }

    let res = [];
    names.forEach((element) => {
      res.push(this._data.find((item) => item.name === element));
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
    // this.email = {
    //   fieldType: "TextInput",
    //   placeholder: "Email",
    //   label: "Email",
    //   name: "email"
    // };
    // this.name = {
    //   fieldType: "TextInput",
    //   placeholder: "Name",
    //   label: "Name",
    //   name: "name"
    // };

    this._data = [this.email, this.name];
  }
}

export default FormInput;

export class EmployeeForm extends FormInput {
  constructor() {
    super();
    this.job = {
      fieldType: "CheckBox",
      placeholder: "Job",
      label: "Job",
      name: "job"
    };

    this._data.push(this.job);
  }
}

export class CompanyForm extends FormInput {
  constructor() {
    super();
    this.companyName = {
      fieldType: "TextInput",
      placeholder: "CompanyName",
      label: "CompanyName",
      name: "companyName"
    };

    this.address = {
      fieldType: "TextInput",
      placeholder: "Address",
      label: "Address",
      name: "address",
      validators: [checkMinLength, checkMaxLength, checkNumbers]
    };

    this._data.push(this.address, this.companyName);
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
