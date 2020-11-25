<template>
  <router-link class="menu-item" :to="to">
    <strong class="display-1 font-weight-bold">
      {{ title }}
    </strong>
    <p
      class="menu-item__subtitle body-1"
      v-html="subtitle"
    />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MenuItem extends Vue {
  @Prop({ required: true }) readonly title!: string;

  @Prop({ default: '' }) readonly subtitle!: string;

  @Prop({ required: true }) readonly to!: string;
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.menu-item {
  display: block;
  text-align: center;

  &:after {
    background-color: #000064;
    content: "";
    display: block;
    margin: 0 auto;
    height: 3px;
    width: 40px;
  }

  &:hover, &.router-link-active {
    &:after {
      background-color: #4141F5;
    }
  }

  &__subtitle {
    color: #333;
    margin: 10px 0 30px;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    margin-bottom: 14px;

    &__subtitle {
      margin: 7px 0 15px;
    }
  }
}
</style>
