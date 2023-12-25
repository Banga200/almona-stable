<script setup>
const props = defineProps(['open'])
const emit =defineEmits(['PasswordDialog'])
function closeDialog() {
    emit('PasswordDialog', false)
}
</script>
<template>
    <v-dialog v-model="props.open" @click.outside="closeDialog">
        <v-card>
            Passwrod
        </v-card>
    </v-dialog>
</template>