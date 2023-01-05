<script>
import { ref, computed, reactive, defineComponent } from "vue";
export default defineComponent( {
  name: 'HomeView',

  setup() {
    const calcModel = ref([]);

    // Get the Label for entering the dough weight or thickness factor
    // base it off of what is chosen with the defaults being:
    // * weight measure: Metric
    // * weight or thickness factor: thickness factor
    // * 'calculateBy' is either thickness factor or weight - its under calcModel.value.doughBase
    const thicknessWeightMeasure = computed( () => {
      let measure = calcModel.value.measureType;
      let caculateBy = calcModel.value.doughBase.calcBy;
      let EnterDough = 'Enter Dough ' ;
      let final = 'Thickness or Loading Factor';

      if ( caculateBy === 'weight' ) {
        let measureInitials = (measure.toLowerCase() === 'metric') ? '(grams)' : '(ounces)';
        final = 'Weight in ' + measureInitials
      }
      return EnterDough + final
    })

    return {
      calcModel,
      thicknessWeightMeasure
    }
  }
})

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
        <FormKit type="form"
                 v-model="calcModel"
        >
          <!-- Choose Metric or Customary Input -->
          <FormKit type="radio"
                   name="measureType"
                   id="measureType"
                   label="Use Metric or US Customary"
                   value="metric"
                   :options="{
                    metric: 'Metric',
                    customary: 'US Customary',
              }"
          />
          <FormKit type="group"
                   name="doughBase"
          >
            <!-- Thickness Factor Or Weight Selection -->
            <FormKit type="radio"
                     name="calcBy"
                     id="calcBy"
                     label="Calculate Your Dough By"
                     value="tf"
                     :options="{
                    tf: 'Thickness or Loading Factor',
                    weight: 'Weight',
              }"
            />

            <!-- Thickness Factor Or Weight Input -->
            <FormKit type="number"
                     name="factor"
                     id="factor"
                     step="0.001"
                     min="0"
                     :label="thicknessWeightMeasure"
            />

            <!-- Number Of Dough Balls Needed -->
            <FormKit type="number"
                     name="factor"
                     id="dbNumber"
                     step="1"
                     min="0"
                     label="Number Of Dough Balls Needed"
            />

          </FormKit>

        </FormKit>
      </div>
      <div>
        <table class="table-auto w-full">
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
