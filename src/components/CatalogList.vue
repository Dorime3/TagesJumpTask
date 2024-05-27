<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import CatalogItem from "../components/CatalogItem.vue";

const store = useStore();
const sortedFilteredItems = computed(
  () => store.getters["catalogStore/sortedFilteredItems"]
);
</script>

<template>
  <section class="main-section__cards">
    <div
      v-for="item in sortedFilteredItems"
      :key="item.id"
      class="main-section__card-item-wrapper"
    >
      <CatalogItem :item="item" />
    </div>
  </section>
</template>

<style scoped></style>
