<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="header__logo">
      <img src="../assets/img/logo.svg" alt="Logo" />
    </div>
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__item">
          <a class="header__link" href="/">Форма</a>
        </li>
        <li class="header__item">
          <a class="header__link" href="/preview">Превью</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 60px;
  margin-bottom: 30px;
  gap: 40%;
  border-bottom: 1px solid #f2f2f2;
}
.header__link {
  color: #11111163;
}
.header__list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}
.header__link {
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
}
.header__link:hover {
  color: #000;
}
</style>
