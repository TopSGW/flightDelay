<template>
  <div>
    <p>
      Votre vol a été retardé ou votre vol a été reloué ou annulé? Voulez-vous que Boarding Claims soumette la demande
      pour vous? Suivez les étapes ci-dessous.
    </p>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Étape 1</div>
      </div>
      <div class="description">
        Vérifier les informations du vol. Notez le numéro de vol et la date de vol.
      </div>
    </div>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Étape 2</div>
      </div>
      <div class="description">
        Accédez au formulaire de demande et remplissez vos coordonnées et celles du vol. Cliquez sur
        ‘{{ $t('header.cta-button') }}’ pour nous envoyer les informations.
      </div>
    </div>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Étape 3</div>
      </div>
      <div class="description">
        Maintenant, la seule chose que vous devez faire est d'attendre. Boarding Claims vérifie si vous êtes passible à
        une indemnité, le montant auquel vous avez droit, et informe la compagnie aérienne responsable.
      </div>
    </div>

    <div class="row">
      <div class="step">
        <div class="decoration"></div>
        <div class="counter">Étape 4</div>
      </div>
      <div class="description">
        Une fois que le dossier est réglé, Boarding Claims vous informe. S’il y a un paiement d’une compensation
        financière, nous vous demandons de nous faire parvenir votre numéro de compte IBAN et le code BIC de votre
        banque.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mode-of-operation-fr',
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

