<script setup lang="ts">
interface Props {
    title: string,
    buttonText: string,
    buttonColor?: string
}

const emailSent = ref(false)

const emailAddress = ref('')

const props = withDefaults(defineProps<Props>(), {
    buttonColor: 'bg-slate-600 hover:bg-slate-500'
})
const emits = defineEmits(['closeModal'])
const sendForgotPassword = () => {
    $fetch('api/v1/users/forgotPassword', {
    method: 'POST',
    body: {
        email: emailAddress.value
    }
    })


}
</script>

<template>
    <div class="">
        <div
            @click="emits('closeModal')"
            class="absolute bg-black bg-opacity-90 inset-0 z-40"
        ></div>
        <div
            class="absolute z-50 inset-0 flex flex-col items-center justify-center"
            aria-modal="true"
        >
            <!-- start card -->
            <div
                data-cy="modal"
                role="alert"
                class="w-full flex flex-col items-center md:min-w-max md:max-w-md z-20 rounded-sm bg-white cursor-default"
            >
                <div class="flex justify-center w-full ">
                    <p class="font-bold text-2xl text-gray-800 pt-3">{{props.title}}</p>
                </div>

                <!--Center of Modal-->
                <div class="py-4 w-full">
                    <form class="flex flex-col w-3/4 mx-auto">
                        <input  class="w-full ring-0 border-1 focus:ring-0 focus:border-black" type="text" placeholder="Enter Your Email Address" v-model="emailAddress">
                    </form>
                </div>

                <!--Bottom Of Modal-->
                <div class=" w-full">

                    <div class="flex justify-end py-2 z-20 gap-2 px-3">
                        <button

                            @click="sendForgotPassword"
                            class= "font-semibold bg-primaryAccent2  px-4 py-1 text-medium text-white "
                            
                        >
                            {{props.buttonText}}
                        </button>
                        <button
                            data-cy="close-modal"
                            @click="emits('closeModal')"
                            class="font-medium text-white bg-danger border-danger hover:text-white  px-4 py-1 text-semibold"
                    
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
