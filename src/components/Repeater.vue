<script setup>

// set the props this component will receive
const props = defineProps({
  context: Object
})

function handleInput(e) {
  props.context.node.input(e.target.value)
}

</script>

<template>
  <input @input="handleInput" :value="props.context._value" />
</template>
