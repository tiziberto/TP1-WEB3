<template>
  <v-card class="pa-4" elevation="4">
    <v-card-title>Registro Rápido de Cliente</v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="clientName"
          label="Nombre del Cliente"
          required
          :rules="nameRules"
          variant="outlined"
          class="mb-3"
        ></v-text-field>

        <v-btn
          :disabled="!isFormValid"
          type="submit"
          color="success"
          block
        >
          Registrar Cliente
        </v-btn>
      </v-form>

      <v-alert
        v-if="message"
        :type="isSuccess ? 'success' : 'error'"
        class="mt-4"
        closable
      >
        {{ message }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

const clientName = ref('');
const message = ref('');
const isSuccess = ref(false);

// Reglas de validación [cite: 33]
const nameRules = [
  v => !!v || 'El nombre es obligatorio.',
  v => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres.', // Mejora: >= 3 caracteres
];

// Comprueba si el formulario es válido (se asume que la validación nativa de Vuetify es suficiente)
const isFormValid = computed(() => {
  return clientName.value.length >= 3;
});

const handleSubmit = () => {
  // Validación básica: nombre no vacío [cite: 33]
  if (clientName.value.length >= 3) {
    // Simular guardado (console.log) [cite: 30]
    console.log(`Cliente registrado: ${clientName.value}`);

    // Mostrar confirmación en pantalla solo si hay nombre [cite: 30]
    message.value = `¡Bienvenido(a), ${clientName.value}! Su registro ha sido exitoso.`;
    isSuccess.value = true;
    clientName.value = ''; // Limpiar el campo
    
  } else {
    message.value = 'Por favor, ingrese un nombre válido (mínimo 3 caracteres).';
    isSuccess.value = false;
  }

  // Ocultar mensaje después de un tiempo
  setTimeout(() => {
    message.value = '';
  }, 4000);
};
</script>