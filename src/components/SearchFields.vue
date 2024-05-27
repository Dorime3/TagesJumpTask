<script setup lang="ts">
import router from "../router";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import CustomSelect from "../components/common/CustomSelect.vue";
import { sortOptions } from "../utils/config";

const store = useStore();
const formattedMaterials = computed(
  () => store.getters["catalogStore/getFormattedMaterials"]
);
const sortBy = computed({
  get() {
    return store.state.catalogStore.sortBy;
  },
  set(val) {
    store.commit("catalogStore/SET_SORT_BY", val);
    if (val) {
      router.replace({
        query: { ...router.currentRoute.value.query, sort: val },
      });
    } else {
      // убираем пустой query-парам
      const { sort, ...queryWithoutSort } = router.currentRoute.value.query;
      router.replace({ query: queryWithoutSort });
    }
  },
});

const filterBy = computed({
  get() {
    return store.state.catalogStore.filterBy;
  },
  set(val) {
    store.commit("catalogStore/SET_FILTER_BY", val);
    if (val) {
      router.replace({
        query: { ...router.currentRoute.value.query, filter: val },
      });
    } else {
      const { filter, ...queryWithoutFilter } = router.currentRoute.value.query;
      router.replace({ query: queryWithoutFilter });
    }
  },
});

onMounted(() => {
  const initialSortBy = router.currentRoute.value.query.sort;
  const initialFilterBy = router.currentRoute.value.query.filter;

  if (initialSortBy) {
    sortBy.value = initialSortBy;
  }
  if (initialFilterBy) {
    filterBy.value = initialFilterBy;
  }
});
</script>

<template>
  <h1 class="main-section__title">Комплекты стеллажных систем</h1>
  <div class="main-section-fields">
    <div class="main-section__block">
      <div class="main-section__label label">Сортировать по:</div>
      <CustomSelect :options="sortOptions" v-model="sortBy" />
    </div>
    <div class="main-section__block">
      <div class="main-section__label label">Материал:</div>
      <CustomSelect :options="formattedMaterials" v-model="filterBy" />
    </div>
  </div>
</template>

<style scoped></style>
