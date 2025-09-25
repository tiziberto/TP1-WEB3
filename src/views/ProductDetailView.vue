<template>
  <v-container>
    <v-card v-if="product" class="pa-6" elevation="6">
      
      <v-img 
        :src="product.imagen" 
        height="300px" 
        cover 
        class="mb-4 rounded"
        alt="Imagen del producto"
      ></v-img>

      <v-card-title class="text-h4">{{ product.nombre }}</v-card-title>
      <v-card-subtitle class="text-h6">
        ID: {{ product.id }}
      </v-card-subtitle>
      <v-divider class="my-3"></v-divider>
      <v-card-text>
        <p><strong>Precio:</strong> ${{ product.precio.toFixed(2) }}</p>
        <p><strong>Stock:</strong> {{ product.stock }} unidades</p>
      </v-card-text>
      
      <v-card-actions>
        <v-btn color="secondary" @click="goBack" prepend-icon="mdi-arrow-left">
          Volver a Productos
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-alert v-else type="error" title="Error 404">
      Producto con ID {{ route.params.id }} no encontrado.
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { products } from '../data/products.js';

const route = useRoute();
const router = useRouter();
const product = ref(null);

onMounted(() => {
  const productId = parseInt(route.params.id);
  product.value = products.find(p => p.id === productId); 
});

const goBack = () => {
  router.back();
};
</script>