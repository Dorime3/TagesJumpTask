<script setup lang="ts">
import { RouterView } from "vue-router";
import BreadCrumbs from "../components/common/BreadCrumbs.vue";
</script>

<template>
  <div class="container">
    <header class="header-section">
      <BreadCrumbs />
    </header>
    <section class="main-section">
      <RouterView />
    </section>
  </div>
</template>

<style scoped></style>
