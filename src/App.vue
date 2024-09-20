<template>
  <div id="app">
    <BidCalculationForm />
  </div>
</template>

<script>
import BidCalculationForm from './components/BidCalculationForm.vue';

export default {
  name: 'App',
  components: {
    BidCalculationForm,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>
