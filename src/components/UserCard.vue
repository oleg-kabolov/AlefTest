<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "../../store/userStore";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchData();
});
</script>

<template>
  <div v-if="userStore.userData" class="card card-container">
    <h3 class="card__title">Персональные данные</h3>
    <div
      class="card_parent-wrapper"
      v-for="parent in userStore.userData.parents"
      :key="parent.id"
    >
      <div class="card__parent-wrapper">
        <div class="card__parent-name">{{ parent.name + "," }}</div>
        <div class="card__parent-age">{{ parent.age + " лет" }}</div>
      </div>
      <div class="card__divider">
        <h4 class="card__title">Дети</h4>
        <div
          class="card__wrapper"
          v-for="child in parent.children"
          :key="child.id"
        >
          <div class="card__child-wrapper">
            <div class="card__child-name">{{ child.name + "," }}</div>
            <div class="card__child-age">
              {{ child.age + " лет" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 600px;
  min-height: 700px;
  margin: 0 auto;
}
.card__wrapper {
  display: flex;
  justify-content: space-between;
}
.card__title {
  font-size: 16px;
  font-weight: 400;
}
.card__parent-wrapper {
  display: flex;
  gap: 15px;
  margin-bottom: 60px;
}
.card__parent-wrapper > div {
  font-size: 18px;
  font-weight: 700;
}
.card__child-wrapper {
  display: flex;
  gap: 5px;
  background-color: #f2f2f2;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.card__child-wrapper > div {
  font-size: 18px;
  color: #000;
  font-weight: 700;
}
</style>
