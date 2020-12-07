<template>
  <div class="perspective-list">
    <ul class="body-2">
      <li v-for="n in 7" :key="n">
        {{ $t(`perspective.items.${n}`) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PerspectiveList extends Vue {}
</script>

<style lang="scss" scoped>
.perspective-list {
  ul {
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
    list-style: none;
    margin: 0 auto;
    max-width: 1120px;
    padding: 24px 16px;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      padding: 30px;
    }

    li {
      &:not(:last-child) {
        margin-bottom: 12px;
      }

      &:before {
        content: "-";
      }
    }
  }
}
</style>
