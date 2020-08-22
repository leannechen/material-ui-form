const validator = ({ value, validateRule }) => {
  const { minLength, maxLength, regex } = validateRule;
console.log(value)
  if(typeof value !== 'string') {
    return '';
  }

  if(value.length < minLength) {
    return 'Required';
  } else if (value.length > maxLength) {
    return 'Exceeded maximum length';
  } else if (regex && !regex.test(value)) {
    return 'Incorrect format';
  } else {
    return '';
  }
};

export default validator;
