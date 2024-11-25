const Validation = {
  data() {
    return {
      hasErrors: false,
      fields: {},
      groups: {},
      selectFields: [],
    };
  },
  methods: {
    required(field, label, value, shouldBeDirty = true) {
      const isValid = (typeof value !== 'undefined' && value !== null && value !== '' && value !== 0);

      if (typeof this.validation.fields[field] === 'undefined') {
        return true;
      }

      if (shouldBeDirty && this.validation.fields[field].dirty === false) {
        return true;
      }

      // eslint-disable-next-line
      console.log({
        method: 'validation-required',
        isDirty: typeof this.validation.fields[field] === 'undefined'
          ? 'undefined'
          : this.validation.fields[field].dirty,
        shouldBeDirty,
        field,
        value,
        isValid,
      });

      return isValid || this.$t('validation.required-field');
    },
    before(field, label, value, beforeDate, shouldBeDirty = true) {
      const inclusion = true;
      const dateValue = window.moment(value, 'L');
      const otherValue = window.moment(field ? field.value : beforeDate);

      let isValid = dateValue.isBefore(otherValue) || (inclusion && dateValue.isSame(otherValue));

      if (typeof this.validation.fields[field] === 'undefined') {
        return true;
      }

      if (shouldBeDirty && this.validation.fields[field].dirty === false) {
        return true;
      }

      // eslint-disable-next-line
      console.log({
        method: 'validation-date-before',
        isDirty: this.validation.fields[field].dirty,
        shouldBeDirty,
        field,
        value,
        beforeDate,
        isValid,
      });

      // if either is not valid.
      if (!dateValue.isValid() || !otherValue.isValid()) {
        isValid = false;
      }

      return isValid || this.$t('validation.date-before', { date: beforeDate.toLocaleString() });
    },
    validEmail(field, label, value, shouldBeDirty = true) {
      // eslint-disable-next-line
      const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

      const isValid = (emailRegex.test(value));

      if (typeof this.validation.fields[field] === 'undefined') {
        return true;
      }

      if (shouldBeDirty && this.validation.fields[field].dirty === false) {
        return true;
      }

      // eslint-disable-next-line
      console.log(
        {
          method: 'validation-validEmail',
          isDirty: this.validation.fields[field].dirty,
          shouldBeDirty,
          field,
          value,
          isValid,
        });

      return isValid || this.$t('validation.email');
    },
    alphaNum(field, label, value, shouldBeDirty = true) {
      const regex = /^[A-Za-z0-9]*$/;

      const isValid = (regex.test(value));

      if (typeof this.validation.fields[field] === 'undefined') {
        return true;
      }

      if (shouldBeDirty && this.validation.fields[field].dirty === false) {
        return true;
      }

      // eslint-disable-next-line
      console.log(
        {
          method: 'validation-alphaNum',
          isDirty: this.validation.fields[field].dirty,
          shouldBeDirty,
          field,
          value,
          isValid,
        });

      return isValid || this.$t('validation.alphaNum', { name: label });
    },
    alphaDash(field, label, value, shouldBeDirty = true) {
      const regex = /^[a-zA-Z0-9_+-]*$/;

      const isValid = (regex.test(value));

      if (typeof this.validation.fields[field] === 'undefined') {
        return true;
      }

      if (shouldBeDirty && this.validation.fields[field].dirty === false) {
        return true;
      }

      // eslint-disable-next-line
      console.log(
        {
          method: 'validation-alphaNum',
          isDirty: this.validation.fields[field].dirty,
          shouldBeDirty,
          field,
          value,
          isValid,
        });

      return isValid || this.$t('validation.alphaDash', { name: label });
    },
    validPhoneNumber(field, label, value, shouldBeDirty = true) {
      const regex = /^[a-zA-Z0-9+ \-.]*$/;

      const isValid = (regex.test(value));

      if (typeof this.validation.fields[field] === 'undefined') {
        return true;
      }

      if (shouldBeDirty && this.validation.fields[field].dirty === false) {
        return true;
      }

      // eslint-disable-next-line
      console.log(
        {
          method: 'validation-validPhoneNumber',
          isDirty: this.validation.fields[field].dirty,
          shouldBeDirty,
          field,
          value,
          isValid,
        });

      return isValid || this.$t('validation.phoneNumber', { name: label });
    },
    validString(field, label, value, shouldBeDirty = true) {
      const isValid = typeof value === 'string';

      if (typeof this.validation.fields[field] === 'undefined') {
        return true;
      }

      if (shouldBeDirty && this.validation.fields[field].dirty === false) {
        return true;
      }

      // eslint-disable-next-line
      console.log(
        {
          method: 'validation-validString',
          isDirty: this.validation.fields[field].dirty,
          shouldBeDirty,
          field,
          value,
          isValid,
        });

      return isValid || this.$t('validation.validString', { name: label });
    },
    resetDirty(field) {
      if (typeof this.validation.groups[field] !== 'undefined') {
        // eslint-disable-next-line
        console.log({ method: 'resetDirty', field, isGroup: true });

        this.validation.groups[field].map((fieldInGroup) => {
          this.resetDirty(fieldInGroup);

          return true;
        });

        return;
      }

      // eslint-disable-next-line
      console.log({ method: 'resetDirty', field, isGroup: false });

      if (typeof this.validation.fields[field] === 'undefined') {
        return;
      }

      this.validation.fields[field].dirty = false;
    },
    touch(field, value, event) {
      if (typeof this.$parent.validation !== 'undefined'
        && typeof this.$parent.validation.fields[field] !== 'undefined'
      ) {
        this.touchParent(field, value, event);

        return;
      }

      if (typeof this.validation === 'undefined'
        || typeof this.validation.fields === 'undefined'
        || typeof this.validation.fields[field] === 'undefined'
      ) {
        // eslint-disable-next-line
        console.log({ method: 'touch', message: `this.validation.fields[${field}] !== undefined` });

        return;
      }

      // eslint-disable-next-line
      console.log({ method: 'touch', field, value, event });

      if (typeof this.validation.fields[field].dirty !== 'undefined') {
        this.validation.fields[field].dirty = true;
      }

      const isSelectField = this.validation.selectFields.find(fieldName => fieldName === field);

      if (isSelectField) {
        // eslint-disable-next-line
        console.log({ method: 'touch', isSelectField });

        this.$refs[field].validate();
      }
    },
    touchParent(field, value, event) {
      if (typeof this.$parent.validation === 'undefined'
        && typeof this.$parent.validation.fields === 'undefined'
        && typeof this.$parent.validation.fields[field] === 'undefined'
      ) {
        // eslint-disable-next-line
        console.log({ method: 'touch', message: `this.$parent.validation.fields[${field}] !== undefined` });

        return;
      }

      // eslint-disable-next-line
      console.log({ method: 'touch', field, value, event });

      if (typeof this.$parent.validation.fields[field].dirty !== 'undefined') {
        this.$parent.validation.fields[field].dirty = true;
      }

      const isSelectField = this.$parent.validation.selectFields.find(fieldName => fieldName === field);

      if (isSelectField) {
        // eslint-disable-next-line
        console.log({ method: 'touch', isSelectField });

        this.$refs[field].validate();
      }
    },
    isValid() {
      this.validation.hasErrors = false;

      // eslint-disable-next-line
      for (const fieldName in this.validation.fields) {
        const field = this.validation.fields[fieldName];

        if (typeof field.rules !== 'undefined') {
          // eslint-disable-next-line
          for (const ruleIndex in field.rules) {
            const rule = field.rules[ruleIndex];

            if (typeof this.$refs[fieldName] === 'undefined') {
              // eslint-disable-next-line
              console.log(`this.$refs[${fieldName}]`, this.$refs[fieldName]);

              // eslint-disable-next-line
              console.log(fieldName);
            }

            if (typeof this.$refs[fieldName] !== 'undefined') {
              const ruleIsValid = rule(this.$refs[fieldName].value, false);

              if (ruleIsValid !== true) {
                field.dirty = true;

                this.$refs[fieldName].validate();

                this.validation.hasErrors = true;
              }

              // eslint-disable-next-line
              console.log({ method: 'isValid', field: fieldName, rule, isValid: ruleIsValid });
            }
          }
        }
      }

      // eslint-disable-next-line
      console.log({ method: 'isValid', formIsValid: this.validation.hasErrors });

      return !this.validation.hasErrors;
    },
  },
};

export default Validation;
