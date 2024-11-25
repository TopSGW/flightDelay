<template>
  <div>
    <p class="lead">
      Europese regelgeving bepaalt dat vliegtuigpassagiers bij een vertraagde, overboekte of geannuleerde vlucht recht
      hebben op een vergoeding tot €600 per passagier. De procedures om een claim in te dienen bij de
      luchtvaartmaatschappij zijn echter vaak omslachtig, tijdrovend en een juridisch kluwen. Veel passagiers zijn zelfs
      niet op de hoogte van de mogelijkheid om een schadevergoeding te bekomen. Boarding Claims biedt hier een
      allroundoplossing voor door de claim voor u in te dienen. Boarding Claims komt op voor uw rechten.
    </p>

    <h2>Europese regelgeving</h2>

    <p>
      Indien uw vlucht werd geannuleerd, een vertraging heeft opgelopen op de aankomsttijd van minimaal 2 uur, of u de
      toegang tot de vlucht werd geweigerd, hebt u volgens Verordening (EG) 261/2004 recht op een compensatie. Het gaat
      enkel om vluchten van, naar en binnen de Europese Unie. Wanneer er sprake is van een buitengewone omstandigheid of
      overmacht, zoals een staking, slecht weer of politieke onrust, is de luchtvaartmaatschappij niet verplicht om een
      compensatie uit te betalen. Ons team van gespecialiseerde juristen zoekt dit voor u uit.
    </p>

    <h2>Vertraagde vlucht</h2>

    <p>
      De schadevergoeding wordt berekend op basis van de duur van de vertraging en de afstand van de vlucht. Voor
      vluchten van buiten de Europese Unie gelden er nog eens extra voorwaarden. Vliegt u van een bestemming buiten de
      Europese Unie naar een EU-lidstaat, dan moet de luchtvaartmaatschappij haar maatschappelijke zetel in de Europese
      Unie hebben om in aanmerking te komen voor een vergoeding.
    </p>

    <h2>Instapweigering en annulering</h2>

    <p>
      Luchtvaartmaatschappijen overboeken regelmatig een vlucht om een maximale bezetting van het vliegtuig te bekomen.
      Wanneer alle passagiers opdagen, kan het dus gebeuren dat er meer passagiers dan plaatsen zijn en een aantal
      passagiers het instappen wordt geweigerd. Omgekeerd zullen luchtvaartmaatschappijen een vlucht met een zeer lage
      bezettingsgraad annuleren en de passagiers omboeken naar een latere vlucht. In beide gevallen is het gevolg dat de
      geweigerde passagiers met vertraging op hun eindbestemming aankomen en dus recht hebben op een financiële
      compensatie.
    </p>

    <h2>Niet-financiële compensaties</h2>

    <p>
      In geval van een vertraging, annulering of overboeking hebt u niet alleen recht op een financiële vergoeding. De
      luchtvaartmaatschappij is verplicht drank, eten en een telefoongesprek te geven aan de getroffen passagiers, en
      indien nodig ook een hotelovernachting. Ook bepaalde kosten gemaakt als direct gevolg van de vertraging kunnen
      worden terugbetaald.
    </p>

    <h2>No cure, no pay</h2>

    <p>
      Boarding Claims hanteert het ‘no cure no pay’-principe. Dit betekent dat u niets hoeft te betalen wanneer blijkt
      dat u geen recht hebt op een vergoeding. Pas bij uitbetaling van een financiële vergoeding vragen wij een
      handling fee of afhandelingskost van 25% (inclusief BTW) van de vergoeding. U hoeft geen dossierkosten te betalen.
    </p>

    <p>
      Hebt u nog vragen? Bekijk dan de <router-link to="/faq">{{ $t('navigation.faq') }}</router-link> of lees onze
      <router-link to="/terms-and-conditions">{{ $t('navigation.terms-and-conditions') }}</router-link>.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'your-rights-nl',
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../sass/variables';

  p.lead {
    color: $color-main-middle;
  }
</style>

