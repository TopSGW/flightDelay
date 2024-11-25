<template>
  <header class="site-header">
    <span class="site-logo">
      <span class="navigation-toggle"
            @click.prevent.stop="toggleNavigationMenu">
        <v-icon dark>menu</v-icon>
      </span>

      <router-link to="/" @click="toggleNavigationMenu">
        <img src="/static/images/site_logo.png" alt="Boarding Claims Logo">
      </router-link>
    </span>

    <nav class="main-navigation" v-if="showNavigationMenu === true" ref="navigationMenu">
      <ul class="navigation">
        <li :class="{active: $route.name === 'about-us' }" @click="toggleNavigationMenu">
          <router-link to="/about-us">{{ $t('navigation.about-us') }}</router-link>
        </li>
        <li :class="{active: $route.name === 'mode-of-operation' }" @click="toggleNavigationMenu">
          <router-link to="/mode-of-operation">{{ $t('navigation.mode-of-operation') }}</router-link>
        </li>
        <li :class="{active: $route.name === 'your-rights' }" @click="toggleNavigationMenu">
          <router-link to="/your-rights">{{ $t('navigation.your-rights') }}</router-link>
        </li>
        <li :class="{active: $route.name === 'faq' }" @click="toggleNavigationMenu">
          <router-link to="/faq">{{ $t('navigation.faq') }}</router-link>
        </li>
        <li :class="{active: $route.name === 'contact' }" @click="toggleNavigationMenu">
          <router-link to="/contact">{{ $t('navigation.contact') }}</router-link>
        </li>
      </ul>

      <ul class="languages">
        <li>
          <a v-on:click.prevent.stop="setLocale('en')" href="#">
            <v-icon dark>{{ getLocale() === 'en' ? 'check_box_marked' : 'check_box_outline_blank' }}</v-icon>
            <span>en</span>
          </a>
        </li>
        <li>
          <a v-on:click.prevent.stop=" setLocale('nl')" href="#">
            <v-icon dark>{{ getLocale() === 'nl' ? 'check_box_marked' : 'check_box_outline_blank' }}</v-icon>
            <span>nl</span>
          </a>
        </li>
        <li>
          <a v-on:click.prevent.stop="setLocale('fr')" href="#">
            <v-icon dark>{{ getLocale() === 'fr' ? 'check_box_marked' : 'check_box_outline_blank' }}</v-icon>
            <span>fr</span>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  const BREAKPOINT_SM = 600;

  export default {
    name: 'site-header',
    data() {
      return {
        navigationMenuIsVisible: false,
      };
    },
    computed: {
      showNavigationMenu() {
        return this.navigationMenuIsVisible;
      },
    },
    mounted() {
      window.addEventListener('resize', this.onWindowResize);

      this.onWindowResize();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onWindowResize);
    },
    methods: {
      getLocale() {
        return this.$i18n.locale();
      },
      setLocale(locale) {
        this.$i18n.set(locale);
      },
      onWindowResize() {
        this.navigationMenuIsVisible = (window.innerWidth > BREAKPOINT_SM);
      },
      toggleNavigationMenu() {
        if ((window.innerWidth > BREAKPOINT_SM)) {
          return;
        }

        this.navigationMenuIsVisible = !this.navigationMenuIsVisible;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';

  .site-header {
    display: flex;
    flex-direction: column;
    font-family: $font-family-lato;

    background-color: $color-main-middle;
    color: $color-white;

    padding-right: $page-gutter / 2;
    padding-left: $page-gutter / 2;

    .site-logo {
      display: flex;

      .navigation-toggle {
        align-self: center;
        font-size: $font-size-base * 2.2;
      }

      img {
        height: 5.5rem;
      }
    }

    nav {
      ul {
        padding-left: $page-gutter * 1.5;

        li {
          list-style-type: none;
          font-weight: bold;

          &.active {
            background-color: $color-main-dark;
          }

          &:hover {
            background-color: $color-main-dark;

            a {
              color: $color-accent;
            }
          }

          a {
            color: $color-white;
            text-decoration: none;
          }
        }

        &.languages {
          li {
            text-transform: uppercase;

            a {
              color: darken($color-white, 20%);

              i {
                width: $font-size-base * 1.5;
              }

              span {
                flex: 1 auto;
              }
            }

            &:first-child {
              margin-top: 0.4rem;
              border-top: 1pt solid $color-main-light;
            }
          }
        }
      }
    }

    @media (min-width: #{map-get($grid-breakpoints, 'sm')}) {
      flex-direction: row;
      justify-content: space-between;

      .navigation-toggle {
        display: none;
      }

      nav {
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-end;

        ul {
          display: flex;
          flex-direction: row;

          i {
            display: none;
          }

          &.navigation {
            margin-top: 0;

            li {
              padding: 0 0.4rem;

              &:last-of-type {
                padding-right: 0;
              }
            }
          }

          &.languages {
            font-size: $font-size-base * 0.8;
            text-transform: uppercase;
            margin-bottom: 0;
            margin-top: 8px;
            border-top: none;
            justify-content: flex-end;
            padding: 0.4rem 0 0 0.4rem;

            li {

              &:after {
                content: "|";
              }

              &:first-child {
                margin-top: 0;
                border-top: none;
              }

              &:last-of-type {
                &:after {
                  content: '';
                }

                a {
                  padding-right: 0;
                }
              }
            }

            a {
              padding-left: 0.3rem;
              padding-right: 0.3rem;
            }
          }
        }
      }
    }
  }
</style>
