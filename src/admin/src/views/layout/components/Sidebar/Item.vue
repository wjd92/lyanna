<template>
</template>
<script lang="jsx" setup>
  import { defineComponent, defineProps } from 'vue'

  const props = defineProps({
    icon: {
       type: String,
       default: ''
     },
     title: {
       type: String,
       default: ''
     }
  })

defineComponent({
  name: 'MenuItem',
  functional: true,
  render(h, context) {
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
})
</script>
