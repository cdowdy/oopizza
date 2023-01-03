<script>

export default {
  components: {
  }
}

</script>

<template>
  <section>
    <div class="grid">
      <div>
        <FormKit type="form">
          <FormKit type="radio"
                   name="preferedMeasure"
                   id="preferedMeasure"
                   label="Use Metric or US Customary"
                   :options="{
                    metric: 'Metric',
                    customary: 'US Customary',
              }"
          />
        </FormKit>
      </div>
      <div>
        <table role="grid">
          <thead>
          <tr>
            <td>
              Ingredients
            </td>
            <td>
              Grams
            </td>
            <td>
              Ounces
            </td>
          </tr>
          </thead>
          <tr>
            <td>placeholder</td>
          </tr>
        </table>
      </div>

    </div>
  </section>
</template>

<style>
.formkit-options li {
  list-style: none;
}
</style>
