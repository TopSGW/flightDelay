<template>
  <div>
    <p>
      Boarding Claims is a brand of Eclipse Consulting, an enterprise founded in 2017, and provides legal services to
      aviation passengers who are dealing with delays, cancellations or rebookings of their flights from, to and within
      the European Union. Our well-balanced team consists of lawyers, web designers and IT specialists, and has an
      extensive network of domestic and foreign solicitors and law firms.
    </p>
    <p>
      Boarding Claims has only one mission: to support affected aviation passengers who have to fight against
      bureaucratic procedures, administrative hassle, long waiting times and legal complications. In some cases
      passengers even have to deal with counteractivity from the airlines. Our legal service and expertise is available
      to everyone, regardless of residence or nationality.
    </p>
    <p>
      Did you have a delayed, cancelled or rebooked flight? With just a little personal and flight information Boarding
      Claims can take on the entire claim procedure. That is already one concern less for you.
    </p>
    <p>
      Curious? Read how we <router-link to="/mode-of-operation">work</router-link>.
      Checking whether or not your flight is eligible for compensation? Read the conditions in our
      <router-link to="/faq">{{ $t('navigation.faq') }}</router-link>.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'about-us-en',
    data() {
      return {};
    },
  };
</script>
