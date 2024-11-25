<template>
  <div>
    <v-btn @click.native="click"
           :disabled="!loaded || disabled"
           :id="id || _uid"
           :type="type"
           :class="computedClass"
           :primary="primary"
           :left="buttonHAlign === 'left'">
      <slot></slot>
    </v-btn>
    <div id="recaptcha-placeholder"></div>
  </div>
</template>

<!-- src: https://github.com/MicroDroid/vue-invisible-recaptcha -->

<script>
  import { mapState } from 'vuex';
  import { ADD_RECAPTCHA_RESPONSE } from '../store/recaptcha/index';

  export default {
    props: {
      sitekey: {
        type: String,
        required: true,
      },
      badge: {
        type: String,
        required: false,
      },
      buttonHAlign: {
        type: String,
        required: false,
      },
      primary: {
        type: String,
        required: false,
      },
      theme: {
        type: String,
        required: false,
      },
      validate: {
        type: Function,
        required: false,
      },
      callback: {
        type: Function,
        required: true,
      },
      disabled: {
        type: Boolean,
        required: false,
      },
      id: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
      },
    },
    data() {
      return {
        widgetId: false,
        loaded: false,
      };
    },
    computed: {
      computedClass() {
        const classArray = this.class ? this.class.split(' ') : [];

        if (this.value) {
          classArray.push('invisible-recaptcha');
        }

        return classArray;
      },
      ...mapState({
        response: state => state.recaptcha.response,
      }),
    },
    methods: {
      render() {
        const vm = this;

        vm.$el.querySelector('#recaptcha-placeholder').innerHTML = '';

        // eslint-disable-next-line
        vm.widgetId = grecaptcha.render('recaptcha-placeholder', {
          sitekey: this.sitekey,
          size: 'invisible',
          badge: this.badge || 'bottomright',
          theme: this.theme || 'light',
          callback: (token) => {
            vm.callback(token).then((redirectTo) => {
              //eslint-disable-next-line
              vm.$store.dispatch(ADD_RECAPTCHA_RESPONSE, { response: grecaptcha.getResponse() });

              // eslint-disable-next-line
              grecaptcha.reset(vm.widgetId);

              if (redirectTo) {
                this.$router.push(redirectTo);
              }
            });
          },
        });

        this.loaded = true;
      },
      renderWait() {
        const self = this;

        // eslint-disable-next-line
        console.log('grecaptcha - waiting for the download of the script');

        setTimeout(() => {
          // eslint-disable-next-line
          if (typeof grecaptcha !== 'undefined') {
            self.render();
          } else {
            self.renderWait();
          }
        }, 200);
      },
      click() {
        if (this.validate) {
          this.validate();
        }

        if (this.response === '') {
          // eslint-disable-next-line
          grecaptcha.execute();

          return;
        }

        const vm = this;

        this.callback(this.response).then((redirectTo) => {
          if (redirectTo) {
            vm.$router.push(redirectTo);
          }
        });
      },
    },
    mounted() {
      // eslint-disable-next-line
      if (typeof grecaptcha === 'undefined') {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
        script.onload = this.renderWait;

        document.head.appendChild(script);

        return;
      }

      this.render();
    },
  };
</script>
