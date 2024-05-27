<script setup lang="ts">
import SearchFields from "../components/SearchFields.vue";
import CatalogList from "../components/CatalogList.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";
import type { Store } from "vuex";
import type { IRootState } from "../store/types";

const store: Store<IRootState> = useStore();

onMounted(async () => {
  await store!.dispatch("catalogStore/init");
});
</script>

<template>
  <SearchFields />
  <CatalogList />
</template>

<style scoped></style>
