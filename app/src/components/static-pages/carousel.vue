<template>
  <div class="carousel">
    <ul class="slides">
      <li v-for="image in images">
        <div class="text">
          <h2>{{$t(image.title)}}</h2>
          <h3>{{$t(image.subtitle)}}</h3>
        </div>
        <img :src="image.url" :srcset="image.srcset" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'carousel',
    props: ['images'],
    methods: {
      setLocale(locale) {
        this.$i18n.set(locale);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';

  .carousel {
    overflow: hidden;
    width: 100%;
    height: auto;
    box-shadow: none;

    .slides {
      list-style: none;
      position: relative;
      width: 300%; /* Number of panes * 100% */
      animation: carousel 30s infinite;
      padding: 0;
      margin: 0;

      & > li {
        position: relative;
        float: left;
        width: 33.33%; /* 100 / number of panes */
      }
    }

    & .text {
      h2 {
        color: $color-white;
        margin: 0;
      }

      h3 {
        color: $color-white;
        margin: 0;
      }
    }
  }

  @media (max-width: #{map-get($grid-breakpoints, 'sm')}) {
    .slides {
      & > li {
        display: flex;
        flex-direction: column-reverse;
      }

      & img {
        width: 100%;
        max-width: 100%;
      }

      & .text {
        margin-bottom: 0;
        padding: 0.7em 1.5em;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: $color-main-dark;

        h2 {
          font-size: $font-size-base * 0.9;
          line-height: $font-size-base * 1.1;
        }

        h3 {
          font-size: $font-size-base * 0.7;
          line-height: $font-size-base * 0.9;
        }
      }
    }
  }

  @media (min-width: #{map-get($grid-breakpoints, 'sm')}) {
    .slides {
      & li {
        & img {
          display: block;
          width: 100%;
          max-width: 100%;
        }

        & .text {
          position: absolute;
          margin-bottom: 0;
          padding: 0.75em 1em;
          right: 60%;
          bottom: 15%;
          left: 5%;
          color: #fff;
          background-color: rgba($color-main-dark, 0.60);

          h3 {
            line-height: $font-size-base * 1.6;
          }
        }

        h2 {
          font-size: $font-size-base * 1.2;
        }

        h3 {
          font-size: $font-size-base;
        }
      }
    }
  }

  @keyframes carousel {
    0% {
      left: 0;
    }
    5% {
      left: 0;
    }
    25% {
      left: -100%;
    }
    30% {
      left: -100%;
    }
    45% {
      left: -200%;
    }
    50% {
      left: -200%;
    }
    70% {
      left: -100%;
    }
    75% {
      left: -100%;
    }
    95% {
      left: 0;
    }
    100% {
      left: 0;
    }
  }
</style>
