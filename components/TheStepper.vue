<script setup>
import { ref } from 'vue';

const props = defineProps(['components', 'headers', 'isEdit'])
const step = ref(1);
function changeStatus() {
    
}
function MoveToNextStep(index) {
     // Move to the next step
     if (index < props.components.length - 1) {
        step.value = index + 2;
        // Mark the current step as completed
        // this.$set(this.steps, index, { ...this.steps[index], completed: true });
      } else {
        // Optionally handle completion, e.g., navigate to another route
      }
}

</script>
<template>
        <!-- Loading  -->
        <v-progress-linear active="false" v-if="false" color="blue-darken-4"></v-progress-linear>
        <!-- Steppers  -->
        <v-stepper  alt-labels v-model="step" hide-actions class="mt-3">
            <template v-slot:default="{ prev, next }">
                <!-- Headers  -->
                <v-stepper-header >
                    <template v-for="(n, i) in props.headers.length" :key="`${n}-step`">
                        <v-stepper-item   color="primary" :step="props.headers" :value="n" :title="props.headers[i]" :editable="props.isEdit"></v-stepper-item>

                        <v-divider v-if="n !== props.headers.length" :key="n"></v-divider>
                    </template>
                </v-stepper-header>
                <!-- Content  -->
                <v-stepper-window >
                    <v-stepper-window-item   class="ma-1" v-for="(component, i) in props.components" :key="i"
                        :value="i + 1">
                        <component :is="component" :isEdit="props.isEdit" class="pa-0 pa-md-5" @moveNextStep="MoveToNextStep(i)" :isFinalStep="props.components.length === i +1 ? true : false"/>
                    </v-stepper-window-item>
                </v-stepper-window>
            </template>
        </v-stepper>
</template>