<template>
  <div>
    <p>
      Had uw vlucht vertraging of werd uw vlucht omgeboekt of geannuleerd? Wenst u dat Boarding Claims de claim voor u
      indient? Volg dan onderstaande stappen.
    </p>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Stap 1</div>
      </div>
      <div class="description">
        Controleer de vluchtgegevens. Noteer het vluchtnummer en de vluchtdatum.
      </div>
    </div>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Stap 2</div>
      </div>
      <div class="description">
        Ga naar het claimformulier en vul uw gegevens en de vluchtgegevens in. Klik op ‘{{ $t('header.cta-button') }}’
        om de gegevens naar ons te verzenden.
      </div>
    </div>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Stap 3</div>
      </div>
      <div class="description">
        U hoeft nu enkel af te wachten. Boarding Claims gaat na of u in aanmerking komt voor een compensatie en op welk
        bedrag u dan recht hebt, en stelt de luchtvaartmaatschappij aansprakelijk.
      </div>
    </div>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Stap 4</div>
      </div>
      <div class="description">
        Zodra het dossier afgehandeld is, brengt Boarding Claims u op de hoogte. Bij uitbetaling van een
        financiële compensatie vragen wij u om ons uw IBAN-rekeningnummer en de BIC-code van uw bank te bezorgen.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mode-of-operation-nl',
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

