<template>
  <section>
    <v-alert v-show="contact.status.submitted === true && contact.status.success === true"
             success value="true">
      {{ $t('contactform.submitted-succesfully-header') }}
    </v-alert>

    <v-alert v-show="contact.status.submitted === true && contact.status.success === false"
             error value="true">
      {{ $t(contact.status.message, { component: getTranslatedComponent(), index: contact.status.index }) }}
    </v-alert>

    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field id="name"
                      name="name"
                      ref="name"
                      :label="$t('contact-form.name')"
                      :value="name"
                      :hint="$t('contact-form.enter-name')"
                      required
                      :rules="validation.fields.name.rules"
                      @input="update('name', $event)"
                      @focus="touch('name', $event.target.value, 'focus')">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field id="email"
                      name="email"
                      ref="email"
                      :label="$t('contact-form.email')"
                      :value.trim="email"
                      :hint="$t('contact-form.enter-email')"
                      required
                      :rules="validation.fields.email.rules"
                      @input="update('email', $event)"
                      @focus="touch('email', $event.target.value, 'focus')">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field id="subject"
                      name="subject"
                      ref="subject"
                      :label="$t('contact-form.subject')"
                      :value="subject"
                      :hint="$t('contact-form.enter-subject')"
                      required
                      :rules="validation.fields.subject.rules"
                      @input="update('subject', $event)"
                      @focus="touch('subject', $event.target.value, 'focus')">
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field id="message"
                      name="message"
                      ref="message"
                      :label="$t('contact-form.message')"
                      :value="message"
                      :hint="$t('contact-form.enter-message')"
                      required
                      :rules="validation.fields.message.rules"
                      @input="update('message', $event)"
                      @focus="touch('message', $event.target.value, 'focus')"
                      multi-line>
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <invisible-recaptcha :sitekey="sitekey"
                             :callback="send"
                             type="button"
                             button-h-align="left"
                             primary
                             theme="light"
                             id="contactFormRecaptcha">
          {{ $t('contact-form.send') }}
        </invisible-recaptcha>

      </v-flex>
    </v-layout>

  </section>
</template>

<script>
  import { debounce } from 'underscore';
  import { mapState } from 'vuex';
  import InvisibleRecaptcha from '@/components/InvisibleRecaptcha';
  import { SEND_CONTACT_REQUEST, UPDATE_CONTACT_FIELD } from '../../store/contact-form/index';
  import Validation from '../../validation/validation.mixin';

  export default {
    name: 'contact-form',
    components: {
      InvisibleRecaptcha,
    },
    mixins: [Validation],
    data() {
      return {
        validation: {
          fields: {
            name: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'name',
                  window.Vue.$t('contact-form.name'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            email: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'email',
                  window.Vue.$t('contact-form.enter-email'),
                  value,
                  shouldBeDirty,
                ),
                (value, shouldBeDirty) => this.validEmail(
                  'email',
                  window.Vue.$t('contact-form.enter-email'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            subject: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'subject',
                  window.Vue.$t('contact-form.subject'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
            message: {
              rules: [
                (value, shouldBeDirty) => this.required(
                  'message',
                  window.Vue.$t('contact-form.message'),
                  value,
                  shouldBeDirty,
                ),
              ],
              dirty: false,
              isSelectField: false,
            },
          },
          groups: {},
          selectFields: [],
        },
      };
    },
    computed: {
      ...mapState({
        contact: state => state.contactForm,
        name: state => state.contactForm.name,
        email: state => state.contactForm.email,
        subject: state => state.contactForm.subject,
        message: state => state.contactForm.message,
        sitekey: state => state.recaptcha.sitekey,
      }),
    },
    mounted() {
      document.body.scrollTop = 0;
    },
    methods: {
      getTranslatedComponent() {
        const component = this.$t(this.contact.status.component);

        return this.$t(`error.validation.component.${component}`);
      },
      async send() {
        const vm = this;

        if (vm.isValid() === false) {
          return null;
        }

        // eslint-disable-next-line
        const redirectTo = await this.$store.dispatch(SEND_CONTACT_REQUEST)
          .then(
            result => new Promise((resolve, reject) => {
              if (result.success) {
                resolve('contact-request-submitted');
              } else {
                reject();
              }
            }),
            (error) => {
              // eslint-disable-next-line
              console.log({ error });
            });

        return redirectTo;
      },
      // eslint-disable-next-line
      update: debounce(function(field, value) {
        // eslint-disable-next-line
        console.info({ method: 'update', field, value });

        this.touch(field, value, 'update');

        this.$store.dispatch(UPDATE_CONTACT_FIELD, { field, value });
      }, 300),
    },
  };
</script>
