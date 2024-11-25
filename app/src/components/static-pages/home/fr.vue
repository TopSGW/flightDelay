<template>
  <div class="home-page">
    <section>
      <div class="image-wrapper">
        <img src="/static/images/know-your-rights/know-your-rights.jpg" alt="Connaissez vos droits">
      </div>

      <article>
        <h2>Connaissez vos droits</h2>
        <p class="lead">
          Vos droits de passager sont protégés par  le droit européen. Les vols retardés, annulés ou sur-réservés sont
          dans la plupart des cas éligibles à une indemnisation.Notre équipe juridique analyse chaque demande
          individuellement et cherche à obtenir une indemnisation maximale.
        </p>
      </article>
    </section>

    <section>
      <div class="image-wrapper">
        <img src="/static/images/how-we-work/how-we-work.jpg" alt="<h2>Comment ça marche">
      </div>

      <article>
        <h2>Comment ça marche</h2>
        <p class="lead">
          Cliquez sur ‘{{ $t('header.cta-button') }}’ et saisissez vos coordonnées. Nous examinerons votre
          demande dans les 24 heures et puis nous vous laissons savoir si votre demande est admissible ou non à une
          indemnisation. Vous n'avez pas besoin de faire plus, nous prenons pour nous l'ensemble du processus et nous
          vous tenons au courant de chaque nouveau développement de votre dossier.
        </p>
      </article>
    </section>

    <section>
      <div class="image-wrapper">
        <img src="/static/images/no-cure-no-pay/no-cure-no-pay.jpg" alt="Pas de succès = pas de frais">
      </div>

      <article>
        <h2>Pas de succès = pas de frais</h2>

        <p class="lead">
          Aucun paiement à l'avance. Tous les risques et les frais juridiques sont couverts par Boarding Claims. En cas
          de récupération réussite de votre indemnisation, la compagnie aérienne pourrait vous verser une indemnité
          pouvant aller jusqu'à €600. Alors seulement, les frais de 25% (y compris la TVA) de l'indemnité sera versée à
          Boarding Claims. Vous ne devez pas payer des frais de dossier.
        </p>
      </article>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'home-fr',
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
