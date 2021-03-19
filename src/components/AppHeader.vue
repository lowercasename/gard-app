<template>
  <header>
    <h1><a href="/">Gard</a></h1>
    <h2>Sword-and-Story Anglo-Saxon Roleplaying</h2>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<style lang="scss" scoped>
@import "@/scss/_variables.scss";
header {
  padding: 0 1rem;
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(187, 186, 186);
  box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
}
h1, h2 {
  margin-bottom: 0;
}
a {
  color: #1b1b1b;
  text-decoration: none;
  transition: .15s ease-out;
  &:hover {
    color: $red;
  }
}
</style>