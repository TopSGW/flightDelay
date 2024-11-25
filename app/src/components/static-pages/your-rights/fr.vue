<template>
  <div>
    <p class="lead">
      La législation Européenne prévoit que les passagers aériens ont droit à une indemnité pouvant aller jusqu'à €600
      par passager, en cas de retard, de surréservation ou de vols annulés. Cependant, les procédures pour la réclamer
      auprès de la compagnie aérienne sont souvent lourdes, longues et un imbroglio juridique. De nombreux passagers ne
      sont même pas conscients de la possibilité d'obtenir une indemnisation. Boarding Claims offre une solution
      complète en introduisant la réclamation pour vous. Boarding Claims défend vos droits.
    </p>

    <h2>La réglementation Européenne</h2>

    <p>
      Si votre vol a été annulé, s’il a un retard à l’arrivée d’au moins 2 heures, ou si on vous a refusé
      l’embarquement, vous avez, conformément au règlement (CE) n ° 261/2004, droit à une indemnisation. Ceci est
      valable uniquement pour les vols au sein de l’union Européenne ou en provenance d’un pays de l’Union Européenne.
      Quand il y a des circonstances extraordinaires ou qu’il y a une force majeure, comme une grève, le mauvais temps
      ou des troubles politiques, la compagnie aérienne n'est pas tenue de verser une indemnité. Notre équipe de
      juristes spécialisés recherchent cela pour vous.
    </p>

    <h2>Vol retardé</h2>

    <p>
      La compensation est calculée sur base de la durée du retard et de la distance du vol. Pour les vols à l’extérieur
      de l’Union Européenne, il y a plus de conditions. Si vous voyagez d’un pays en dehors de l’UE vers un état membre
      de l’Union Européenne, la compagnie aérienne doit avoir son siège social dans l'Union européenne afin de pouvoir
      bénéficier d’une indemnisation. Le tableau suivant donne un aperçu des indemnisations auxquels les passagers ont
      droit.
    </p>

    <h2>Refus d'embarquement et d'annulation</h2>

    <p>
      Les compagnies aériennes sur-réservent souvent des vols pour assurer une occupation maximale de l'avion. Lorsque
      tous les passagers se présentent, il peut donc arriver qu'il y ait plus de passagers que de sièges et on refuse
      l’embarquement à un certain nombre de passagers. A l'inverse, les compagnies aériennes annulent des vols avec
      occupation très faible et vont réacheminer les passagers vers un vol plus tard. Dans les deux cas, le résultat est
      que les passagers retardés à qui l’embarquement a été refusé arrivent en retard à leur destination et ont donc
      droit à une compensation financière.
    </p>

    <h2>La rémunération non financière</h2>

    <p>
      En cas de retard, d'annulation ou surréservation vous n’avez pas seulement droit à une compensation financière. La
      compagnie aérienne est obligée de donner à boire, à manger et de donner un appel téléphonique aux passagers
      concernés, et si nécessaire aussi un séjour à l'hôtel. Certaines dépenses en conséquence direct du retard peuvent
      être remboursées aussi.
    </p>

    <h2>No cure, no pay</h2>

    <p>
      Boarding Claims utilise le principe « no cure no pay ». Cela signifie que vous ne devez pas payer quoi que ce soit
      s'il semble que vous n'avez pas droit à une indemnisation.  Uniquement lorsque le paiement d'une indemnisation
      vous est accordé, nous demandons des frais de manutention de 25% (y compris la TVA) de l’indemnisation.
    </p>

    <p>
      Des questions? Consultez la <router-link to="/faq">{{ $t('navigation.faq') }}</router-link> ou lisez nos
      <router-link to="/terms-and-conditions">{{ $t('navigation.terms-and-conditions') }}</router-link>.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'your-rights-fr',
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

