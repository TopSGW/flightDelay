<template>
  <div class="home-page">
    <section>
      <div class="image-wrapper">
        <img src="/static/images/know-your-rights/know-your-rights.jpg" alt="Ken uw rechten">
      </div>

      <article>
        <h2>Uw rechten</h2>
        <p class="lead">
          Uw rechten als passagier zijn beschermd op grond van Europese wetgeving. Vertragingen, annulatie of
          overboeking leiden in de meeste gevallen tot het uitbetalen van een schadevergoeding. Ons juridisch team
          analyseert elk dossier individueel en streeft ernaar om een maximale schadevergoeding te verkrijgen.
        </p>
      </article>
    </section>

    <section>
      <div class="image-wrapper">
        <img src="/static/images/how-we-work/how-we-work.jpg" alt="Werkwijze">
      </div>

      <article>
        <h2>Werkwijze</h2>
        <p class="lead">
          Klik op NU SCHADEVERGOEDING AANVRAGEN en voer uw gegevens in. Wij bekijken uw dossier binnen 24 uur en laten
          nadien weten of uw claim al dan niet in aanmerking komt voor een schadevergoeding. U hoeft niets meer te doen,
          wij nemen het hele proces op ons en houden u bij elke nieuwe ontwikkeling op de hoogte.
        </p>
      </article>
    </section>

    <section>
      <div class="image-wrapper">
        <img src="/static/images/no-cure-no-pay/no-cure-no-pay.jpg" alt="Geen succes = geen kosten">
      </div>

      <article>
        <h2>Geen succes = geen kosten</h2>
        <p class="lead">
          Geen betalingen vooraf. Alle risico's en juridische kosten worden door Boarding Claims gedekt. Bij een
          succesvolle afhandeling van de claim kan de luchtvaartmaatschappij u tot €600 uitbetalen. Pas dan wordt er
          een vergoeding van 25% (inclusief BTW) van de schadevergoeding aan Boarding Claims uitgekeerd.
        </p>
      </article>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'home-nl',
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
