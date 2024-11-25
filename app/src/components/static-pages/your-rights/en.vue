<template>
  <div>
    <p class="lead">
      According to EU law air passengers are entitled to a compensation of up to €600 per passenger in case of a
      delayed, rebooked or cancelled flight. The procedures to submit a claim are often cumbersome, time consuming and
      legally complicated. Many passengers are even not aware of their right to claim a compensation. Boarding Claims
      offers an allround solution by acting on your behalf to file a claim against the airline. Boarding Claims stands
      up for your rights.
    </p>

    <h2>EU law</h2>

    <p>
      If your flight was cancelled or had a delayed arrival time of at least 2 hours, or if you were denied boarding as
      a result of a rebooking, you are entitled to a compensation according to EU Regulation 261/2004. This only applies
      to flights from, to and within the European Union. In case of an exceptional circumstance or force majeure, such
      as a strike, bad weather or political upheaval, the airline is not required to pay a compensation. Our team of
      specialized lawyers will check this out for you.
    </p>

    <h2>Delayed flight</h2>

    <p>
      The compensation is calculated on the basis of the length of the delay and the distance of the flight. For flights
      from outside the European Union, additional conditions apply. If you are flying from a country outside the
      European Union to a destination in the European Union, then the airline must have its registered office in the
      European Union in order to be eligible for a fee.
    </p>

    <h2>Denied boarding and cancellation</h2>

    <p>
      Airlines regularly overbook a flight to obtain a maximum occupancy of the plane. When all passengers show up, it
      may thus happen that there are more passengers than seats, and in that case a number of passengers will be denied
      boarding. Conversely, airlines will cancel flights with a very low occupancy and rebook the passengers to a later
      flight. In both cases the rebooked passengers will arrive at their final destination with a delay, and are thus
      entitled to a financial compensation.
    </p>

    <h2>Non-financial compensation</h2>

    <p>
      In the event of a delay, cancellation or overbooking you are not only entitled to a monetary compensation. The
      airline is obliged to offer the affected passengers a meal, drinks and if necessary a stay in a hotel. Certain
      expenses incurred as a direct result of the delay can also be refunded.
    </p>

    <h2>No cure, no pay</h2>

    <p>
      Boarding Claims works on the basis of the no cure, no pay principle. This means that you are not required to pay
      anything when it turns out that you are not entitled to a compensation. Only in the event of a payment of a
      financial compensation we will charge a handling fee of 25% (VAT included) of the amount of the compensation. We
      do not charge any other costs.
    </p>

    <p>
      Further questions? Take a look at our <router-link to="/faq">{{ $t('navigation.faq') }}</router-link> or read our
      <router-link to="/terms-and-conditions">{{ $t('navigation.terms-and-conditions') }}</router-link>.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'your-rights-en',
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
