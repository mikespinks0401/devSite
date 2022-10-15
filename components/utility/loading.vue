<script setup lang='ts'>
interface Props {
    size?: number,
    color?: string
    width?: number,
}

const props = withDefaults(defineProps<Props>(),{
    size: 3,
    color: 'gray-800',
    width: 2,

})

const useClass = `h-${props.size} w-${props.size} border-${props.color} border-t-${props.width}`

</script>

<template>
    <div class=" h-3 w-3 animate-spin-loading rounded-lg border-t-2"
    >
    
</div>
</template>
<!-- :class="useClass"     -->