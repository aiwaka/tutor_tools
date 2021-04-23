<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/clients">Clients</router-link> |
      <router-link to="/watch">Watch</router-link> |
      <router-link to="/calc">Calculation</router-link> |
      <router-link to="/mail">Mail</router-link> |
      <router-link to="/settings">Settings</router-link>
    </div>
    <div id="container">
      <router-view/>
      <footer>
        <span>&copy; 2021 Aiwaka</span>
      </footer>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
html {
  font-size: 62.5%;
}
body {
  font-size: 1.6em;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

button {
    border-radius: 4rem;
    background-color: #fff;
    border: 2px solid #777;
}
button:hover {
    background-color: #ddd;
}
button[disabled]:hover {
  background-color: #fff;
}
button:active {
    background-color: #000;
    color: #fff;
}
button[disabled]:active {
  background-color: #fff;
  color: inherit;
}
#container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
footer {
  margin-top: auto;
  width: 100%;
  height: 5rem;
}
</style>
