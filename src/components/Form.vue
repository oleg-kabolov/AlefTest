<script setup>
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "../../store/userStore";
import Input from "../UI/Input.vue";
import Button from "../UI/Button.vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchData();
});

const validateRequired = (value) => !!value || "Обязательно для заполнения";

const validateNumeric = (value) => !isNaN(Number(value)) || "Введите возраст";

const validateNotNumeric = (value) => isNaN(Number(value)) || "Введите имя";

const validateParentAgeRange = (value) =>
  (Number(value) >= 18 && Number(value) <= 90) ||
  "Возраст родителя от 18 до 90 лет";
const validateChildAgeRange = (value) =>
  (Number(value) >= 1 && Number(value) <= 18) ||
  "Возраст ребенка должен быть от 1 до 18 лет";
const getFirstError = (value, validators) => {
  for (const validator of validators) {
    const result = validator(value);
    if (result !== true) {
      return result;
    }
  }
  return "";
};

const isValid = computed(() => {
  return userStore.userData.parents.every((parent) => {
    const isParentValid =
      getFirstError(parent.name, [validateRequired, validateNotNumeric]) ===
        "" &&
      getFirstError(parent.age, [
        validateRequired,
        validateNumeric,
        validateParentAgeRange,
      ]) === "";

    const areChildrenValid = parent.children.every((child) => {
      return (
        getFirstError(child.name, [validateRequired, validateNotNumeric]) ===
          "" &&
        getFirstError(child.age, [
          validateRequired,
          validateNumeric,
          validateChildAgeRange,
        ]) === ""
      );
    });

    return isParentValid && areChildrenValid;
  });
});

const addChild = (parentId) => {
  userStore.addChild(parentId);
};

const removeChild = (parentId, index) => {
  userStore.removeChild(parentId, index);
};

const saveData = async () => {
  if (isValid.value) {
    await userStore.saveData();
  } else {
    console.log("Пожалуйста, исправьте ошибки в форме.");
  }
};
</script>

<template>
  <div v-if="userStore.userData" class="form form-container">
    <h3 class="form__title">Персональные данные</h3>
    <div
      class="form__parent-wrapper"
      v-for="parent in userStore.userData.parents"
      :key="parent.id"
    >
      <div class="form__input-wrapper">
        <Input
          v-model="parent.name"
          :error="
            getFirstError(parent.name, [validateRequired, validateNotNumeric])
          "
          labelText="Имя"
          input-id="name-input"
          class-name-input="form__input"
          class-name-input-wrapper="form__input-wrapper"
          class-name-label="form__label"
          placeholder="Введите имя"
        />
      </div>
      <div class="form__input-wrapper">
        <Input
          v-model="parent.age"
          :error="
            getFirstError(parent.age, [
              validateRequired,
              validateNumeric,
              validateParentAgeRange,
            ])
          "
          labelText="Возраст"
          input-id="name-input"
          class-name-input="form__input"
          class-name-input-wrapper="form__input-wrapper"
          class-name-label="form__label"
          placeholder="Введите имя"
        />
      </div>
      <div class="form__divider">
        <h4 class="form__title">Дети (макс. 5)</h4>
        <Button
          v-if="parent.children.length < 5"
          class-name-btn="form__btn-rounded"
          btn-text="Добавить ребенка"
          @update:click="addChild(parent.id)"
          icon="+"
          class-name-icon="form__icon"
        />
      </div>
      <div
        class="form__child-wrapper"
        v-for="(child, index) in parent.children"
        :key="child.id"
      >
        <div class="form__input-wrapper">
          <Input
            v-model="child.name"
            :error="
              getFirstError(child.name, [validateRequired, validateNotNumeric])
            "
            labelText="Имя"
            input-id="childName"
            class-name-input="form__input"
            class-name-input-wrapper="form__input-wrapper"
            class-name-label="form__label"
            placeholder="Введите имя"
          />
        </div>
        <div class="form__input-wrapper">
          <Input
            v-model="child.age"
            :error="
              getFirstError(child.age, [
                validateRequired,
                validateNumeric,
                validateChildAgeRange,
              ])
            "
            labelText="Возраст"
            input-id="childAge"
            class-name-input="form__input"
            class-name-input-wrapper="form__input-wrapper"
            class-name-label="form__label"
            placeholder="Введите имя"
          />
        </div>
        <Button
          class-name-btn="form__btn-delete"
          btn-text="Удалить"
          @update:click="addChild(removeChild(parent.id, index))"
        />
      </div>
    </div>

    <Button
      class-name-btn="form__btn-rounded--filled"
      btn-text="Сохранить"
      @update:click="saveData"
    />
  </div>
  <div class="loader" v-else>Загрузка...</div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  min-height: 600px;
  margin: 0 auto;
}
.form__title {
  font-weight: 400;
}
.form__input-wrapper {
  position: relative;
  margin-bottom: 10px;
}
:deep(.form__label) {
  position: absolute;
  top: 8px;
  left: 17px;
  font-size: 12px;
  color: #11111165;
}
:deep(.form__input) {
  padding-top: 27px;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid #f2f2f2;
}
.form {
  padding-bottom: 130px;
}
.form__child-wrapper {
  display: flex;
  gap: 18px;
}
:deep(.form__btn-delete) {
  background-color: transparent;
  color: #01a7fd;
  padding: 18px 18px;
  border-radius: 5px;
}
:deep(.form__btn-delete:hover) {
  background-color: #6f41e215;
}
.form__divider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 11px;
}
:deep(.form__btn-rounded) {
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 5px 15px;
  color: #01a7fd;
  background-color: transparent;
  border: 2px solid #01a7fd;
  transition: 0.2s ease-out;
}
:deep(.form__icon) {
  font-size: 28px;
  margin-right: 10px;
  color: #01a7fd;
}
:deep(.form__btn-rounded--filled) {
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 15px 15px;
  color: #fff;
  background-color: #01a7fd;
  border: 2px solid #01a7fd;
  transition: 0.2s ease-out;
}
.loader {
  height: 800px;
}
</style>
