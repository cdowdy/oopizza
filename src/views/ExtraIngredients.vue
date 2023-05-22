<template>
  <FormKit
      type="checkbox"
      label="Additional Ingredients"
      name="optionalIngredients"
      placeholder="Select ingredient"
      :options="additionalIngredients"
  />
  <template v-for="ingredient in optionalIngredients ">
    <FormKit type="group" name="checkedIngredients">
      <FormKit type="number"
               :name="ingredient"
               id="ingredient"
               value="0"
               step=".01"
               min="0"
               validation="required"
               :label="_startCase(ingredient) +  ' Percent' "
      />
    </FormKit>

  </template>
</template>
<script setup>
import _startCase from "lodash/startCase";

defineProps([
    'additionalIngredients',
    'optionalIngredients'
])

// export default {
//   name: 'ExtraIngredients',
//   methods: {_startCase}
// }
</script>