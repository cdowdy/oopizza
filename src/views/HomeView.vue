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

    // Get a Computed Property for Pizza Size Label. Default will be round @ 14 inches
    // If Square/Rectangle is chosen then we make the regular round label into the "Length"
    // and then conditionally add the width input.
    const pizzaSizeLabel = computed( () => {
      let label = "Enter Pizza Size";

      if ( calcModel.value.doughBase.pizzaShape === 'square' ) {
        label = 'Enter Pizza Width';
      }
      return label;
    })

    // Take the additional ingredients, un camel case them and create a computed value
    // that we can loop over



    // list of additional ingredients
    const additionalIngredients = [
      {value: 'olive oil', label: 'oliveOil', percent: 0, id: 'olive-oil'},
      {label: 'Corn Oil', value: 'cornOil', percent: 0},
      {label: 'Canola Oil', value: 'canolaOil', percent: 0},
      {label: 'Vegetable (Soybean) Oil', value: 'vegetableOil', percent: 0},
      {label: 'Butter / Margarine', value: 'butterMargarine', percent: 0},
      {label: 'Lard', value: 'lard', percent: 0},
      {label: 'Shortening', value: 'shortening', percent: 0},
      {label: 'Clarified Butter', value: 'clarifiedButter', percent: 0},

      {label: 'Corn Syrup', value: 'cornSyrup', percent: 0},
      {label: 'Maple Syrup (pure)', value: 'mapleSyrup', percent: 0},
      {label: 'Molasses', value: 'molasses', percent: 0},
      {label: 'Sugar', value: 'sugar', percent: 0},
      {label: 'Honey', value: 'honey', percent: 0},

      {label: 'Rye Flour', value: 'ryeFlour', percent: 0},
      {label: 'Soy Flour', value: 'soyFlour', percent: 0},
      {label: 'Corn Flour', value: 'cornFlour', percent: 0},
      {label: 'Cornmeal', value: 'cornmeal', percent: 0},
      {label: 'Semolina', value: 'semolina', percent: 0},
      {label: 'Potato Flour', value: 'potatoFlour', percent: 0},

      {label: 'Non-Diastatic Barley Malt Syrup', value: 'nonDiastaticBarleyMaltSyrup', percent: 0},
      {label: 'Malted Milk Powder (Carnation\'s)', value: 'maltedMilk', percent: 0},
      {label: 'Diastatic Malt Powder', value: 'diastaticMaltPowder', help: 'Recommended use is 0.33 - 0.66%'},

      // { label: 'Custom Ingredient', value: 'custom', id: 'fakeId' },
      {label: 'Cream of Tartar', value: 'creamTartar', help: 'Tartar should not exceed 1.0%'},
      {label: 'Yellow Food Coloring', value: 'yellowFoodColoring', help: 'Coloring should not exceed 0.62%'},
      {label: 'Vital Wheat Gluten', value: 'vitalWheatGluten', percent: 0},
      {label: 'Sweet Dried Dairy Whey', value: 'sweetDriedDairyWhey', percent: 0},
      {label: 'Dry Non-Fat Milk (Carnation\'s)', value: 'driedMilk', percent: 0},
      {label: 'Baker\'s Non-Fat Milk', value: 'bakersDriedMilk', percent: 0},
      {label: 'Milk (fresh)', value: 'milk', percent: 0},
      {label: 'Buttermilk (dry)', value: 'buttermilk', help: 'Recommended use is 4.0 - 6.0%'},
      {label: 'Eggs (large, fresh, raw)', value: 'largeEggs', percent: 0},
      {label: 'Egg Whites', value: 'eggWhites', percent: 0},
      {label: 'Baking Soda', value: 'bakingSoda', percent: 0},
      {label: 'Baking Powder', value: 'bakingPowder', percent: 0},
      {label: 'Vinegar', value: 'vinegar', percent: 0},
      {label: 'WRISE', value: 'wrise', help: 'Recommended use is 0.35 - 1.5%'},
      {label: 'PZ-24', value: 'pz24', help: 'Recommended use is 1.0 - 2.0%'}
    ]

    return {
      calcModel,
      thicknessWeightMeasure,
      pizzaSizeLabel,
      additionalIngredients,
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
          <!-- Dough Base Caculations -->
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
                     value="0.0973"
                     validation="required"
                     min="0"
                     :label="thicknessWeightMeasure"
            />

            <!-- Number Of Dough Balls Needed -->
            <FormKit type="number"
                     name="dbNumber"
                     id="dbNumber"
                     value="1"
                     step="1"
                     min="0"
                     validation="required"
                     label="Number Of Dough Balls Needed"
            />

            <!-- Pizza Shape -->
            <FormKit type="radio"
                     name="pizzaShape"
                     id="pizzaShape"
                     label="Pizza Shape"
                     value="round"
                     validation="required"
                     :options="{
                    round: 'Round',
                    square: 'Square / Rectangle',
              }"
            />

            <!-- Pizza Size -->
            <FormKit type="number"
                     name="pizzaWidth"
                     id="pizzaWidth"
                     step=".001"
                     min="0"
                     value="14"
                     validation="required"
                     :label="pizzaSizeLabel"
            />

            <!-- Pizza size if its square / rectangle  -->
            <FormKit type="number"
                     v-if="calcModel.doughBase.pizzaShape === 'square'"
                     name="pizzaLength"
                     id="pizzaLength"
                     value="16"
                     step=".01"
                     min="0"
                     validation="required"
                     label="Pizza Length"
            />
          </FormKit><!-- End OF Dough Base Caculations -->

          <!-- Dough Ingredient Percentages -->
          <FormKit type="group"
                   name="doughIngredients"
          >
            <!-- Hydration Percentage -->
            <FormKit type="number"
                     name="hydrationPercent"
                     id="hydrationPercent"
                     value="63"
                     step="1"
                     min="0"
                     validation="required"
                     label="Dough Hydration Percent"
                     help="How much water or liquid used in the dough recipe divided by the total amount of flour used in the recipe"
            />
            <!-- Yeast Type -->
            <FormKit type="radio"
                     name="yeastType"
                     id="yeastType"
                     label="Yeast Type"
                     value="idy"
                     validation="required"
                     :options="{
                      idy: 'Instant Dry Yeast',
                      ady: 'Active Dry Yeast',
                      cake: 'Fresh / Cake / Bakers Yeast'
              }"
            />
            <!-- Yeast Percentage -->
            <FormKit type="number"
                     name="yeastPercent"
                     id="yeastPercent"
                     value=".5"
                     step=".01"
                     min="0"
                     validation="required"
                     label="Yeast Percent"
                     help="How much yeast used in the dough recipe divided by the total amount of flour used in the recipe"
            />
            <!-- Preferment -->
            <FormKit type="radio"
                     name="prefermentType"
                     value="none"
                     :options="{
              none: 'None',
              totalFlour: '% of Total Flour',
              totalWater: '% of Total Water',
              totalDoughWeight: '% of Final Total Dough Weight',
              totalEach: '% Of Each of the Water and Flour',
              sdDiscard: 'Sourdough Discard'
              }"
            />
            <!-- Preferment Amounts -->
            <template v-if="calcModel.doughIngredients.prefermentType !== 'none' &&
            calcModel.doughIngredients.prefermentType !== 'sdDiscard' ">
              <FormKit type="number"
                       v-if="calcModel.doughIngredients.prefermentType === 'totalEach'"
                       name="flourPercent"
                       id="flourPercent"
                       step=".01"
                       min="0"
                       validation="required"
                       label="Flour Percent"
              />
              <FormKit type="number"
                       v-if="calcModel.doughIngredients.prefermentType !== 'totalEach'"
                       validation="number"
                       name="prefermentPercent"
                       id="prefermentPercent"
                       label="Preferment Percent"
              />
              <!--- Yeast -->
              <FormKit type="number"
                       validation="number"
                       name="prefermentYeastPercent"
                       id="prefermentYeastPercent"
                       label="Yeast Percent"
              />
              <!-- Hydration Percent -->
              <FormKit type="number"
                       validation="number"
                       name="prefermentWaterPercent"
                       id="prefermentWaterPercent"
                       label="Water Percent"
              />
            </template>
            <!-- SD Discard Percentages -->
            <template v-if="calcModel.doughIngredients.prefermentType === 'sdDiscard'">
              <FormKit type="number"
                       validation="number"
                       name="sdDiscardWaterPercent"
                       id="sdDiscardWaterPercent"
                       label="Discard Water Percent Percent"
              />
              <FormKit type="number"
                       validation="number"
                       name="sdDiscardFlourPercent"
                       id="sdDiscardFlourPercent"
                       label="Discard Flour Percent Percent"
              />
              <FormKit type="number"
                       validation="number"
                       name="prefermentTotalSdDiscardPercent"
                       id="prefermentTotalSdDiscardPercent"
                       label="Total Amount of Discard"
                       help="the amount left over after feeding your starter that you're using as a preferment"
              />
            </template>

            <!-- Salt Type -->
            <FormKit type="radio"
                     name="saltType"
                     id="saltType"
                     label="Salt Type"
                     value="ss"
                     validation="required"
                     :options="{
                      dc: 'Diamond Crystal Kosher',
                      mk: 'Morton Kosher',
                      ss: 'Fine Sea Salt'
              }"
            />
            <!-- Salt Percent -->
            <FormKit type="number"
                     name="saltPercent"
                     id="saltPercent"
                     value="1.5"
                     step=".01"
                     min="0"
                     validation="required"
                     label="Salt Percent"
            />

            <!-- Additional Ingredients -->
            <FormKit
                type="checkbox"
                label="Additional Ingredients"
                name="additionalIngredients"
                placeholder="Select ingredient"
                :options="additionalIngredients"
            />
            <template v-for="ingredient in calcModel.doughIngredients.additionalIngredients"
                      :key="ingredient">
              {{ ingredient }}
<!--              <FormKit type="number"-->
<!--                       name="hydrationPercent"-->
<!--                       id="hydrationPercent"-->
<!--                       value="63"-->
<!--                       step="1"-->
<!--                       min="0"-->
<!--                       validation="required"-->
<!--                       label="Dough Hydration Percent"-->
<!--                       help="How much water or liquid used in the dough recipe divided by the total amount of flour used in the recipe"-->
<!--              />-->

            </template>

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
