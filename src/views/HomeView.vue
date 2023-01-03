<script>

export default {
  components: {
  }
}

</script>

<template>

  <FormKit type="radio"
           name="preferedMeasure"
           id="preferedMeasure"
           label="Use Metric or US Customary"
           :options="{
                    metric: 'Metric',
                    customary: 'US Customary',
              }"
  />
</template>
