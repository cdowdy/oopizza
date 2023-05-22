<template>
  <template v-for="(ingredient, value, index ) in ingredients" :key="ingredient.name">
    <tr :class="{'bg-gray-100': index % 2 === 0}">

      <td class="px-5 py-5 border-b border-gray-200  text-md">
        {{ ingredient.name }}
      </td>
      <td class="px-5 py-5 border-b border-gray-200  text-md">
        {{ ingredient.percent }}%
      </td>
      <td class="px-5 py-5 border-b border-gray-200  text-md text-right">
        {{ ingredient.grams }}
      </td>
      <td class="px-5 py-5 border-b border-gray-200  text-md text-right">
        {{ ingredient.ounces }}
      </td>
    </tr>
  </template>
</template>
<script setup>
defineProps(['ingredients'])
</script>