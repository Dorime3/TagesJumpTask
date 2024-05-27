<script setup lang="ts">
import { computed, onMounted, ref, defineProps, toRefs } from "vue";
import LikeOutlineIcon from "@/assets/icons/like-outline-icon.vue";
import DoneCircleIcon from "@/assets/icons/done-circle-icon.vue";
import CartIcon from "@/assets/icons/cart-icon.vue";
import LikeFilledIcon from "@/assets/icons/like-filled-icon.vue";
import { useStore } from "vuex";
import { IItem } from "@/store/types";
import { basePath } from "@/utils/config";

const props = defineProps<{ item: IItem }>();

const { id, name, code, price, image } = toRefs(props.item);

const isHoveredItem = ref(false);
const isMobile = ref(false);

onMounted(() => {
  if (window.innerWidth <= 768) {
    isMobile.value = true;
  }
});

const store = useStore();
const toggleCartItem = (id: string) => {
  store.dispatch("catalogStore/toggleCartItem", id);
};
const toggleFavoriteItem = (id: string) => {
  store.dispatch("catalogStore/toggleFavoriteItem", id);
};
const cartItemsIds = computed(() => store.state.catalogStore.cartItemsIds);
const favoriteItemsIds = computed(
  () => store.state.catalogStore.favoriteItemsIds
);
</script>

<template>
  <div
    class="main-section__card-item"
    @mouseover="isHoveredItem = true"
    @mouseleave="isHoveredItem = false"
  >
    <div v-if="price?.old_price" class="main-section__card-sale">Скидка</div>
    <img
      class="main-section__card-img"
      v-if="image"
      :src="basePath + image.url"
      :alt="name"
    />
    <div class="main-section__card-wrapper">
      <div class="main-section__card-info">
        <p v-if="code" class="main-section__card-info-subtext">
          {{ code }}
        </p>
        <h2 class="main-section__card-info-title">{{ name }}</h2>
        <div class="main-section__card-prices">
          <div v-if="price?.old_price" class="main-section__card-price-old">
            {{ Math.round(price.old_price || 0) }}₽
          </div>
          <div v-if="price?.current_price" class="main-section__card-price-new">
            {{ Math.round(price.current_price || 0) }}₽
          </div>
        </div>
      </div>
      <div class="main-section__card-actions">
        <DoneCircleIcon
          v-if="cartItemsIds.includes(id)"
          @click="toggleCartItem(id)"
          class="main-section__card-button remove-from-cart"
        />
        <CartIcon
          v-else
          v-show="isMobile || isHoveredItem"
          @click="toggleCartItem(id)"
          class="main-section__card-button add-to-cart"
        />
        <LikeFilledIcon
          v-if="favoriteItemsIds.includes(id)"
          @click="toggleFavoriteItem(id)"
          class="main-section__card-button unlike"
        />
        <LikeOutlineIcon
          v-else
          @click="toggleFavoriteItem(id)"
          class="main-section__card-button like"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
