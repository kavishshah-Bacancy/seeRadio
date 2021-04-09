const regex = {
  email: new RegExp(
    "^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
  ),
  number: new RegExp("^[0][1-9]\\d{9}$|^[1-9]\\d{9}$"),
  phoneNumber: new RegExp("^(\\([0-9]{3}\\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"),
  website: new RegExp(
    "^((ftp|http|https):\\/\\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\\.[a-zA-Z]+)+((\\/)[\\w#]+)*(\\/\\w+\\?[a-zA-Z0-9_]+=\\w+(&[a-zA-Z0-9_]+=\\w+)*)?$"
  ),
  password: new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
  ),
  usPostal: new RegExp("^(\\d{5}$)|(^\\d{5}-\\d{4}$)"),
  canadaPostal: new RegExp(
    "^[ABCEGHJ-NPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z][ -]?\\d[ABCEGHJ-NPRSTV-Z]\\d$"
  ),
};

export class Validators {
  static email(value, message) {
    if (value) {
      const result = regex.email.test(value);
      if (!result) return { error: true, message };
    }
    // return false;
  }

  static password(value, message) {
    if (value) {
      const result = regex.password.test(value);
      if (!result) return { error: true, message };
    }
    // return false;
  }

  static website(value, message) {
    if (value) {
      const result = regex.website.test(value);
      if (!result) return { error: true, message };
    }
  }
  static phoneNumber(value, message) {
    if (value) {
      const result = regex.phoneNumber.test(value);
      if (!result) return { error: true, message };
    }
  }
  static required(value, message) {
    console.log(value, message);
    if (!value || !value.toString().trim().length) {
      return { error: true, message };
    }
    return false;
  }
  static number(value, message) {
    const length = value ? value.toString().length : 0;

    if (length > 0) {
      const result = regex.number.test(value);
      if (!result) {
        return { error: true, message };
      }
    }
    return false;
  }

  static checkUsPostal(value, message) {
    if (value) {
      const result = regex.usPostal.test(value);
      if (!result) return { error: true, message };
    }
  }
  static checkCanadaPostal(value, message) {
    if (value) {
      const result = regex.canadaPostal.test(value);
      if (!result) return { error: true, message };
    }
  }
}

export const validateInput = (validators, value) => {
  console.log(value);
  if (validators && validators.length) {
    for (let i = 0; i < validators.length; i++) {
      const error = validators[i].check(value, validators[i].message);
      if (error) {
        return error;
      }
    }
  }
  return false;
};
