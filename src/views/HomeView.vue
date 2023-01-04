<script>

export default {
  components: {
  }
}

</script>

<template>
  <div class=" pb-3 pt-4 text-center">
    <div class="mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
        OOPizza Pizza Dough Calculator
      </h1>
    </div>
  </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">

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
        <table >
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
</template>

<style>

</style>
