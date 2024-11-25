<template>
  <div>
    <p>
      Boarding Claims is een merk van Eclipse Consulting, een onderneming opgericht in 2017, en verstrekt juridische
      dienstverleningen aan luchtvaartpassagiers die te maken krijgen met vertraagde, geannuleerde en omgeboekte vluchten
      van, naar of binnen de Europese Unie. Ons uitgebalanceerd team bestaat uit juristen, webdesigners en informatici en
      kan rekenen op een uitgebreid netwerk van advocaten in binnen- en buitenland.
    </p>
    <p>
      Boarding Claims heeft maar één missie: het bijstaan van gedupeerde reizigers die moeten opboksen tegen
      bureaucratische procedures, administratieve rompslomp, lange wachttijden en juridische complicaties. In sommige
      gevallen krijgen reizigers zelfs te maken met tegenwerking. Onze juridische dienstverlening en expertise staat ter
      beschikking van iedereen, ongeacht woonplaats en nationaliteit.
    </p>
    <p>
      Hebt u zelf te maken gehad met een vertraagde, geannuleerde of omgeboekte vlucht? Op basis van slechts enkele
      persoons- en vluchtgegevens kan Boarding Claims de hele claimprocedure op zich nemen, desnoods tot in de rechtbank.
      Dat is voor u alvast één zorg minder.
    </p>
    <p>
      Benieuwd hoe wij te werk gaan? Bekijk dan onze
      <router-link to="/mode-of-operation">{{ $t('navigation.mode-of-operation') }}</router-link>. Nagaan of uw vlucht
      in aanmerking komt voor een schadevergoeding? Bekijk de voorwaarden in de
      <router-link to="/faq">{{ $t('navigation.faq') }}</router-link>.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'about-us-nl',
    data() {
      return {};
    },
  };
</script>
