<template>
  <v-container fill-height class="d-flex justify-center align-center">
    <v-card class="pa-6" width="400" elevation="8" rounded="xl">
      <v-card-title class="text-h5 text-center mb-4">Iniciar Sesión</v-card-title>
      <v-form ref="form" @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="Email o Usuario"
          required
          :rules="emailRules"
          :error-messages="error"
          prepend-inner-icon="mdi-account"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          required
          :rules="passwordRules"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          class="mb-4"
        ></v-text-field>

        <v-progress-linear
          v-if="loading"
          indeterminate
          color="primary"
          class="mb-3"
        ></v-progress-linear>

        <v-alert
          v-if="error"
          type="error"
          text="Credenciales incorrectas. Inténtelo de nuevo."
          class="mb-4"
        ></v-alert>

        <v-btn
          :disabled="!isFormValid || loading"
          color="primary"
          type="submit"
          block
          size="large"
        >
          Ingresar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/authService';

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

// Validación: formato de email, contraseña de >=6 caracteres [cite: 55]
const emailRules = [
  v => !!v || 'El email es obligatorio.',
  v => /.+@.+\..+/.test(v) || 'El email debe ser válido.',
];
const passwordRules = [
  v => !!v || 'La contraseña es obligatoria.',
  v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres.',
];

// Lógica para deshabilitar el botón si es inválido [cite: 57]
const isFormValid = computed(() => {
  return emailRules.every(rule => rule(email.value) === true) &&
         passwordRules.every(rule => rule(password.value) === true);
});

const handleLogin = async () => {
  if (!isFormValid.value) return;

  loading.value = true;
  error.value = null;

  try {
    await login({ email: email.value, password: password.value });
    // Redirección correcta post-login [cite: 68]
    router.push('/');
  } catch (err) {
    // Manejo de errores de credenciales [cite: 70]
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>