<script setup>

</script>

<template>
  <main>
    <Formkit type="form" >
      <FormKit type="radio"
               name="preferedMeasure"
               id="preferedMeasure"
               label="Use Metric or US Customary"
               :options="{
                    metric: 'Metric',
                    customary: 'US Customary',
              }"
      />
    </Formkit>
  </main>
</template>
