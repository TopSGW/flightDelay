<template>
  <v-app>
    <site-header></site-header>

    <v-card>
      <carousel :images="images"></carousel>

      <v-card-text v-show="$route.name !== 'claim'">
        <p class="display-1" v-html="getQuote($t('header.header-quote.header'))"></p>
        <p class="subheading" v-html="getQuote($t('header.header-quote.text'))"></p>
        <v-btn @click.native="launchClaimForm()" primary class="orange darken-1">
          {{ $t('header.cta-button') }}
        </v-btn>
      </v-card-text>
    </v-card>

    <main>
      <router-view class="content"></router-view>
    </main>

    <site-footer></site-footer>
  </v-app>
</template>

<script>
  import SiteHeader from '@/components/layout/SiteHeader';
  import SiteFooter from '@/components/layout/SiteFooter';
  import Carousel from './components/static-pages/carousel';
  import { LOAD_CLAIM_TYPES, SET_CURRENT_STEP } from './store/claim-form/index';

  export default {
    name: 'app',
    data() {
      return {
        images: [
          {
            title: 'carousel.carousel-title-1',
            subtitle: 'carousel.carousel-subtitle-1',
            url: '/static/images/carousel/carousel-1-xl.jpg',
            srcset: '/static/images/carousel/carousel-1-xl.jpg 1200w, /static/images/carousel/carousel-1-lg.jpg 992w, ' +
            '/static/images/carousel/carousel-1-md.jpg 768w, /static/images/carousel/carousel-1-sm.jpg 601w',
          },
          {
            title: 'carousel.carousel-title-2',
            subtitle: 'carousel.carousel-subtitle-2',
            url: '/static/images/carousel/carousel-2-xl.jpg',
            srcset: '/static/images/carousel/carousel-2-xl.jpg 1200w, /static/images/carousel/carousel-2-lg.jpg 992w, ' +
            '/static/images/carousel/carousel-2-md.jpg 768w, /static/images/carousel/carousel-2-sm.jpg 601w',
          },
          {
            title: 'carousel.carousel-title-3',
            subtitle: 'carousel.carousel-subtitle-3',
            url: '/static/images/carousel/carousel-3-xl.jpg',
            srcset: '/static/images/carousel/carousel-3-xl.jpg 1200w, /static/images/carousel/carousel-3-lg.jpg 992w, ' +
            '/static/images/carousel/carousel-3-md.jpg 768w, /static/images/carousel/carousel-3-sm.jpg 601w',
          },
        ],
      };
    },
    components: {
      Carousel,
      SiteHeader,
      SiteFooter,
    },
    created() {
      this.$store.dispatch(LOAD_CLAIM_TYPES);
    },
    methods: {
      getQuote(quote) {
        return quote.replace('\n', '<br>');
      },
      launchClaimForm() {
        this.$store.dispatch(SET_CURRENT_STEP, { currentStep: 1 });

        this.$router.push('claim');
      },
    },
  };
</script>

<style lang="stylus">
  @import './stylus/main';
</style>

<style lang="scss">
  @import 'sass/styles';
  @import 'sass/variables';

  body {
    font-family: $font-family-roboto;
    font-size: $body-font-size;
    color: $body-text-color;
    line-height: 1.6rem;
    min-width: 300px;
  }

  div.required.input-group {
    label {
      text-transform: capitalize;

      &:after {
        content: '*';
      }
    }

    &.input-group--focused {
      label:after {
        color: red;
      }
    }
  }

  .card {
    .card__text {
      display: flex;
      flex-direction: column;
      align-items: center;

      & > p {
        flex: 1 auto;

        text-align: center;
        color: $color-main-middle;
      }

      & > a {
        flex: 1 auto;
      }
    }
  }

  .content {
    h1, h2, h3, h4, h5, h6 {
      color: $color-main-middle;
    }

    p {
      text-align: justify;
    }

    @media (max-width: #{map-get($grid-breakpoints, 'md')}) {
      padding: $page-gutter;
    }

    @media (min-width: #{map-get($grid-breakpoints, 'md')}) {
      padding: $page-gutter 0;
      margin-left: 10%;
      margin-right: 10%;
    }

    @media (min-width: #{map-get($grid-breakpoints, 'xl')}) {
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
