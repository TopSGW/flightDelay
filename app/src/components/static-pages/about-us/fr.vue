<template>
  <div>
    <p>
      Boarding Claims est une marque commerciale d'Eclipse Consulting, une entreprise fondée en 2017 et fournit des
      services juridiques aux passagers qui sont confrontés à des retards, des annulations ou des vols surbooké, à
      partir ou au sein de l'Union européenne. Notre équipe équilibrée se compose d'avocats, informaticiens et
      concepteurs de sites Web et peut compter sur un vaste réseau d'avocats dans des différents pays.
    </p>
    <p>
      Boarding Claims n'a qu'une seule mission: aider les voyageurs dupés qui doivent se battre contre la bureaucratie,
      la paperasserie, de longs retards et des complications juridiques. Dans certains cas, les voyageurs se même face à
      l'opposition. Nos services juridiques et d'expertise est accessible à tous, quelle que soit la résidence ou la
      nationalité.
    </p>
    <p>
      Avez-vous eu un vol retardé, annulé ou surbooké? Sur base de quelques informations de votre vol et personne,
      Boarding Claims prend en charge l'ensemble du processus de réclamation, le cas échéant, à la cour. Ainsi vous avez
      déjà un souci de moins.
    </p>
    <p>
      Vous vous demandez comment nous procédons? Voir notre
      <router-link to="/mode-of-operation">{{ $t('navigation.mode-of-operation') }}</router-link>. Vérifiez si votre vol
      est admissible à une indemnisation? Lisez notre <router-link to="/faq">{{ $t('navigation.faq') }}</router-link>
      pour les conditions.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'about-us-fr',
    data() {
      return {};
    },
  };
</script>
