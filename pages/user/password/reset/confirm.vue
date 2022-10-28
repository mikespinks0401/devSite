<script setup lang='ts'>

const showError = ref(false)

const query = useRoute().query
const router = useRouter()


onBeforeMount(()=>{
    queryHasProperParams()
})

const queryHasProperParams = () => {
    if(!query.uid || !query.token || !query.uts){
        showError.value = true;
    }
}

</script>

<template>
    <div>
        <div class="flex justify-center min-h-screen">
            <div v-if="showError" class="mt-72 text-center">
                <h1 class="text-6xl">Error 404</h1>
                <p class="mt-6 text-xl"><NuxtLink to="/" class="text-primaryAccent2">Please Click Here to return home</NuxtLink></p>
            </div>
            <div v-else class="flex justify-center items-center">
                <form class="">


                </form>
                <h1>Query Params: {{query.uts}}</h1>
            </div>
        </div>
    </div>
</template>