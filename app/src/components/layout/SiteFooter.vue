<template>
  <footer class="site-footer">
    <div class="navigation-row">
      <span class="site-logo">
        <router-link to="/">
          <img src="/static/images/footer_logo.png" alt="You name it, we claim it">
        </router-link>
      </span>

      <nav class="main-navigation" ref="navigationMenu">
        <ul class="navigation">
          <li :class="{active: $route.name === 'about-us' }">
            <router-link to="/about-us">{{ $t('navigation.about-us') }}</router-link>
          </li>
          <li :class="{active: $route.name === 'mode-of-operation' }">
            <router-link to="/mode-of-operation">{{ $t('navigation.mode-of-operation') }}
            </router-link>
          </li>
          <li :class="{active: $route.name === 'your-rights' }">
            <router-link to="/your-rights">{{ $t('navigation.your-rights') }}</router-link>
          </li>
          <li :class="{active: $route.name === 'faq' }">
            <router-link to="/faq">{{ $t('navigation.faq') }}</router-link>
          </li>
          <li :class="{active: $route.name === 'contact' }">
            <router-link to="/contact">{{ $t('navigation.contact') }}</router-link>
          </li>
        </ul>

        <ul>
          <li class="terms-and-conditions"
              :class="{active: $route.name === 'terms-and-conditions' }">
            <router-link to="/terms-and-conditions">{{ $t('navigation.terms-and-conditions') }}
            </router-link>
          </li>
          <li class="social-media">
            <ul>
              <li>
                <a href="https://www.facebook.com/boardingclaims/" target="_blank" rel="noopener">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/BoardingClaims" target="_blank" rel="noopener">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M443.8 159.7c.3 4.2.3 8.4.3 12.6 0 128.1-97.5 275.7-275.7 275.7-54.9 0-105.9-15.9-148.8-43.5 7.8.9 15.3 1.2 23.4 1.2 45.3 0 87-15.3 120.3-41.4-42.6-.9-78.3-28.8-90.6-67.2 6 .9 12 1.5 18.3 1.5 8.7 0 17.4-1.2 25.5-3.3-44.4-9-77.7-48-77.7-95.1V199c12.9 7.2 27.9 11.7 43.8 12.3-26.1-17.4-43.2-47.1-43.2-80.7 0-18 4.8-34.5 13.2-48.9 47.7 58.8 119.4 97.2 199.8 101.4-1.5-7.2-2.4-14.7-2.4-22.2 0-53.4 43.2-96.9 96.9-96.9 27.9 0 53.1 11.7 70.8 30.6 21.9-4.2 42.9-12.3 61.5-23.4-7.2 22.5-22.5 41.4-42.6 53.4 19.5-2.1 38.4-7.5 55.8-15-13.2 19.2-29.7 36.3-48.6 50.1z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>

    <div class="copy-right-row">
      <small>
        Copyright &copy; {{ currentYear }} Boarding Claims
      </small>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'site-footer',
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';

  .site-footer {
    display: flex;
    flex-direction: column;
    font-family: $font-family-lato;

    .navigation-row {
      background-color: $color-main-middle;
      color: $color-white;

      padding-right: $page-gutter / 2;
      padding-left: $page-gutter / 2;

      display: flex;
      flex-direction: column;

      .site-logo {
        display: flex;

        img {
          height: 5.5rem;
        }
      }

      nav {
        margin-bottom: 1rem;

        ul {
          flex: 1 auto;
          padding-left: $page-gutter * 1.5;
          display: flex;
          flex-direction: row;

          li {
            list-style-type: none;
            font-weight: bold;
            flex: 1 auto;

            padding-top: 0.4rem;
            padding-bottom: 0.4rem;

            align-content: flex-start;

            &.terms-and-conditions {
              font-size: $font-size-base * 0.8;
              text-align: left;
              flex: 1 auto;
            }

            &.social-media {
              flex: 1 auto;

              ul {
                li {
                  padding-left: 0.4rem;

                  svg {
                    path {
                      fill: $color-white;
                    }

                    width: 25px;
                    height: 25px;
                  }
                }
              }
            }

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
            }

            li:first-child {
              margin-top: 0.4rem;
              border-top: 1pt solid $color-main-light;
            }
          }
        }
      }
    }

    .copy-right-row {
      background-color: $color-main-dark;
      color: $color-white;

      flex: 2rem;
      align-items: center;
      justify-content: center;

      display: flex;
      flex-direction: column;
    }

    @media (min-width: #{map-get($grid-breakpoints, 'sm')}) {
      .navigation-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        nav {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;

          margin-top: 1rem;

          ul {
            display: flex;
            flex-direction: row;
            margin-top: 0;
            justify-content: flex-end;

            li {
              flex: 1 auto;
              padding-left: 0.4rem;
              padding-right: 0.4rem;
            }
          }

          li.social-media {
            ul {
              li {
                padding-left: 0;
                padding-right: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
