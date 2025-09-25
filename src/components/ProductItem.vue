<template>
  <v-card :class="{'out-of-stock': product.stock === 0}" class="mb-3">
    
    <v-img 
      :src="product.imagen" 
      height="150px" 
      cover 
      alt="Imagen del producto"
    >
      <div v-if="product.stock === 0" class="overlay-out-of-stock"></div>
    </v-img>

    <v-card-title>{{ product.nombre }}</v-card-title>
    <v-card-subtitle>
      Precio: ${{ product.precio.toFixed(2) }} | Stock: {{ product.stock }}
    </v-card-subtitle>
    <v-card-text>
      <v-chip
        v-if="product.stock === 0"
        color="red"
        label
        size="small"
      >
        Sin Stock
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :disabled="product.stock === 0"
        color="primary"
        @click.stop="$emit('addToCart', product.id)"
      >
        Agregar al Carrito
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(['addToCart']);
</script>

<style scoped>
.out-of-stock {
  opacity: 0.6; /* estilo visual para cuando el stock es 0 */
}

.overlay-out-of-stock {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 0, 0, 0.2); 
}
</style>