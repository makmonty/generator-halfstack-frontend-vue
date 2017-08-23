<style lang="scss">
$nav-width: 200px;
$navbar-height: 54px;
$nav-font-color: #dae6f1;
// $nav-item-border-color: lighten($nav-bg-color, 8%);


.nav {
  position: absolute;
  width: $nav-width;
  left: 0;
  bottom: 0;
  top: $navbar-height;

  .nav-link {
    border-radius: 0;
    // color: $nav-bg-color;
  }
}

.content {
  position: absolute;
  left: $nav-width;
  right: 0;
  top: $navbar-height;
  bottom: 0;
}
</style>

<template>
  <div>
    <nav class="navbar navbar-inverse">
      <span class="navbar-brand">Administration</span>
    </nav>
    <ul class="nav nav-pills flex-column">
      <li class="nav-item">
        <router-link :to="{name: 'admin-dashboard'}" class="nav-link">
          <icon name="dashboard"></icon>
          Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'admin-games'}" class="nav-link">
          <icon name="gamepad"></icon>
          Games
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'admin-platforms'}" class="nav-link">
          <icon name="tv"></icon>
          Platforms
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'admin-game-aliases'}" class="nav-link">
          <icon name="clone"></icon>
          Game Aliases
        </router-link>
      </li>
    </ul>
    <div class="content container-fluid my-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.dispatch('start');
  }
};
</script>
