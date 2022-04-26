<template>
    <header>
        <router-link to="/">Accueil</router-link>
        <h1 >Mairies de France et Outre-Mer</h1>
    </header>
</template>

<style lang="scss">
header {
  height: 4em;
  width: 100%;
  background-color: #133675;
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    margin-left: 1em;
    text-decoration: none;
  }
  h1 {
    margin-right: 1em;
    font-size: 1.5em;
    user-select: none;
  }
}

</style>