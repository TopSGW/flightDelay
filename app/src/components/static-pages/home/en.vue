<template>
  <div class="home-page">
    <section>
      <div class="image-wrapper">
        <img src="/static/images/know-your-rights/know-your-rights.jpg" alt="Know your rights">
      </div>

      <article>
        <h2>Your rights</h2>
        <p class="lead">
          Your rights as a passenger are protected under European law. Delayed, cancelled or rebooked flights are in
          most cases eligible for compensation. Our legal team analyses each file separately and strives to obtain the
          maximum amount of compensation.
        </p>
      </article>
    </section>

    <section>
      <div class="image-wrapper">
        <img src="/static/images/how-we-work/how-we-work.jpg" alt="How we work">
      </div>

      <article>
        <h2>How we work</h2>
        <p class="lead">
          Click on CLAIM NOW YOUR COMPENSATION and enter your data. We'll review your file within 24 hours and inform
          you later on whether or not your claim is eligible for compensation. You don't have to do anything anymore,
          we'll take the entire process on us and keep you up to date of every new development.
        </p>
      </article>
    </section>

    <section>
      <div class="image-wrapper">
        <img src="/static/images/no-cure-no-pay/no-cure-no-pay.jpg" alt="No cure = no pay">
      </div>

      <article>
        <h2>No cure = no pay</h2>
        <p class="lead">
          No charge in advance. All risks and legal expenses are covered by Boarding Claims. In case of a successful
          handling of your claim the airline might pay you a compensation of up to €600. Only then Boarding Claims
          will be entitled to a handling fee of 25% (VAT included) of the compensation.
        </p>
      </article>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'home-en',
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../sass/variables';

  .home-page {
    & > section {
      margin-bottom: $page-gutter;

      @media (max-width: #{map-get($grid-breakpoints, 'sm')}) {
        .image-wrapper {
          margin-left: -$page-gutter;
          margin-right: -$page-gutter;

          & > img {
            width: 100%;
            height: auto;
          }
        }

        article {
          margin: $page-gutter / 2;
        }

        &:first-of-type {
          .image-wrapper {
            margin-top: -$page-gutter;
          }
        }
      }

      @media (min-width: #{map-get($grid-breakpoints, 'sm')}) {
        display: flex;
        flex-direction: row-reverse;
        padding-top: $page-gutter;

        .image-wrapper {
          max-width: 40%;
          /*flex: 1 0;*/

          img {
            width: 100%;
            height: auto;
          }
        }

        article {
          flex: 3 1;
          margin-right: $page-gutter;
        }

        &:first-of-type,
        &:last-of-type {
          flex-direction: row;

          article {
            margin-left: $page-gutter;
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
