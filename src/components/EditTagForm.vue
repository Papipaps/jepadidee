<template>
  <p>Bonjour</p>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .pen-tool-size {
    display: flex;
    align-items: center;
    gap: 5px;
    span {
      margin: 0 5px;
      &:hover {
        cursor: pointer;
      }
      border-radius: 50%;
      background-color: black;
      border: '1px solid red';
    }
  }
  .pen-tool {
    display: flex;
  }
</style>
