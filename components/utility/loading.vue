<script setup lang='ts'>
interface Props {
    size?: number,
    color?: string
    width?: number,
}

const props = withDefaults(defineProps<Props>(), {
    size: 4,
    color: 'gray-800',
    width: 2,

})

const useClass = `h-${props.size} w-${props.size} animate-spin-loading rounded-lg border-t-${props.width}`

</script>

<template>
    <div :class="useClass">

    </div>
</template>