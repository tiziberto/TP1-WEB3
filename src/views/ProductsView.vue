<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-4 mb-4">
          <v-card-title>Listado de Productos</v-card-title>
          <v-text-field
            v-model="searchQuery"
            label="Buscar producto por nombre"
            prepend-inner-icon="mdi-magnify"
            clearable
            variant="outlined"
            class="mt-2"
          ></v-text-field>
        </v-card>

        <v-row v-if="filteredProducts.length > 0">
          <v-col
            v-for="product in filteredProducts"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
          >
            <ProductItem
              :product="product"
              @add-to-cart="handleAddToCart"
              @click="goToDetail(product.id)"
              style="cursor: pointer;"
            />
          </v-col>
        </v-row>

        <v-alert
          v-else
          type="info"
          title="Sin Resultados"
          text="No hay productos que coincidan con la búsqueda o la lista está vacía."
        ></v-alert>
      </v-col>

      <v-col cols="12" md="4">
        <ShoppingCart ref="shoppingCartRef" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { products } from '../data/products.js';
import ProductItem from '../components/ProductItem.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

const router = useRouter();
const searchQuery = ref('');
const shoppingCartRef = ref(null); // <-- 3. Inicializa la referencia

// Lógica de filtrado case-insensitive
const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products;
  }
  const searchLower = searchQuery.value.toLowerCase();
  return products.filter(product =>
    product.nombre.toLowerCase().includes(searchLower)
  );
});

// 4. Manejador de evento que llama al método del hijo a través de la referencia
const handleAddToCart = (productId) => {
  if (shoppingCartRef.value) {
    // Llama al método expuesto "addItem"
    shoppingCartRef.value.addItem(productId);
  }
};

// Navegación programática
const goToDetail = (id) => {
  router.push(`/productos/${id}`);
};
</script>