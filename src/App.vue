<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Práctico Vue 3</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn :to="{ name: 'Home' }" :variant="$route.path === '/' ? 'tonal' : 'text'" class="mx-1">
        Inicio
      </v-btn>
      <v-btn :to="{ name: 'Products' }" :variant="$route.path.startsWith('/productos') ? 'tonal' : 'text'" class="mx-1">
        Productos
      </v-btn>
      <v-btn :to="{ name: 'Clients' }" :variant="$route.path === '/clientes' ? 'tonal' : 'text'" class="mx-1">
        Clientes
      </v-btn>
      
      <template v-if="user">
        <v-chip class="mx-3" color="white" label outlined>
          {{ user.email }}
        </v-chip>
        <v-btn @click="handleLogout" icon="mdi-logout" variant="flat"></v-btn>
      </template>
      <v-btn v-else :to="{ name: 'Login' }" variant="flat" prepend-icon="mdi-login">
        Login
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getActiveUser, logout } from './services/authService';

const user = ref(null);

onMounted(() => {
  // Persistencia de sesión
  user.value = getActiveUser(); 
});

const handleLogout = () => {
  logout(); 
};
</script>