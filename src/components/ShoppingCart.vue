<template>
  <v-card class="pa-4">
    <v-card-title>Mi Carrito</v-card-title>

    <!-- Lista de productos -->
    <v-list v-if="cartItems.length">
      <v-list-item
        v-for="item in cartItems"
        :key="item.id"
      >
        <v-list-item-title>{{ item.nombre }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ item.cantidad }} x ${{ item.precio.toFixed(2) }} = ${{ item.subtotal.toFixed(2) }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <v-btn
            icon="mdi-minus"
            size="small"
            variant="flat"
            @click="updateQuantity(item.id, -1)"
            class="mr-1"
          ></v-btn>
          <v-btn
            icon="mdi-plus"
            size="small"
            variant="flat"
            @click="updateQuantity(item.id, 1)"
            class="mr-3"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>

    <!-- Mensaje cuando el carrito está vacío -->
    <v-card-text v-else>
      El carrito está vacío.
    </v-card-text>

    <v-divider></v-divider>

    <v-card-title class="text-right">
      Total: ${{ total.toFixed(2) }}
    </v-card-title>
  </v-card>
</template>

<script setup>
import { ref, computed, defineExpose, watch } from 'vue';
import { products } from '../data/products.js';

const cartItems = ref([]);

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.subtotal, 0);
});

const addItem = (productId) => {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cartItems.value.find(item => item.id === productId);

  if (existingItem) {
    existingItem.cantidad++;
  } else {
    cartItems.value.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: 1,
      subtotal: product.precio, // inicializamos subtotal
    });
  }
};

const updateQuantity = (productId, delta) => {
  const item = cartItems.value.find(item => item.id === productId);
  if (!item) return;

  const newQuantity = item.cantidad + delta;

  if (newQuantity <= 0) {
    cartItems.value = cartItems.value.filter(i => i.id !== productId);
  } else {
    item.cantidad = newQuantity;
    item.subtotal = item.precio * item.cantidad;
  }
};

// recalcular subtotales si cambian otros valores
watch(cartItems, (newCart) => {
  newCart.forEach(item => {
    item.subtotal = item.precio * item.cantidad;
  });
}, { deep: true });

// método para poder llamarlo desde otros componentes
defineExpose({
  addItem
});
</script>
