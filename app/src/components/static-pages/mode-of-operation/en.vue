<template>
  <div>
    <p>
      Was your flight delayed, rebooked or cancelled? Would you like Boarding Claims to submit the claim on your behalf?
      Then please follow the steps below.
    </p>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Step 1</div>
      </div>
      <div class="description">
        Check the flight data. Write down the flight number and flight date.
      </div>
    </div>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Step 2</div>
      </div>
      <div class="description">
        Go to the claim form and fill in your details and flight information. Click on ‘{{ $t('header.cta-button') }}’
        to send us the form.
      </div>
    </div>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Step 3</div>
      </div>
      <div class="description">
        Now you only have to wait. Boarding Claims will determine if you are eligible for a compensation and if so the
        amount of the claim, and hold the airline responsible.
      </div>
    </div>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Step 4</div>
      </div>
      <div class="description">
        Boarding Claims will inform you when the claim is finalized. In case of the payment of a financial compensation,
        we will ask you to send us your bank account number in IBAN format and the BIC or SWIFT code of your bank.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mode-of-operation-en',
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../sass/variables';

  p {
    margin-bottom: $font-size-base * 4;
  }

  .row {
    display: flex;
    flex-direction: row;
    padding-bottom: $font-size-base;

    .step {
      flex: 6rem 0;
      min-width: 7rem;
      height: $font-size-base * 2.5;

      background-color: $color-main-light;

      display: flex;
      flex-direction: row;
      align-content: center;

      .decoration {
        flex: 2rem 0;
        background-color: $color-main-middle;
      }

      .counter {
        flex: 1 auto;
        align-self: center;
        color: $color-white;
        font-size: $font-size-base * 1.2;
        margin-left: 0.4rem;

      }
    }

    .description {
      flex: 1 auto;
      padding-left: $page-gutter;
      text-align: justify;
    }
  }

  @media (max-width: #{map-get($grid-breakpoints, 'sm')}) {
    p {
      margin-bottom: $font-size-base * 2;
    }

    .row {
      flex-direction: column;

      .step {
        flex: 1 0;
        min-height: $font-size-base;

      }

      .description {
        flex: 1 0;
      }

      margin-bottom: $page-gutter / 2;
    }
  }
</style>

