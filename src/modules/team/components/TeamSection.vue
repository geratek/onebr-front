<template>
  <section class="team-section" :class="{single: members.length === 1}">
    <h2 class="team-section__title">
      {{ title }}
    </h2>
    <div class="team-section__content" :class="{showborder: showborder}">
      <template v-for="member in members">
        <slot v-bind="member" />
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import TeamMember from '@/modules/shared/entities/TeamMember'

@Component
export default class TeamSection extends Vue {
  @Prop({ required: true })
  private readonly title!: string;

  @Prop({ required: true })
  private readonly members!: TeamMember[];

  @Prop({ required: false })
  private readonly showborder!: boolean;
}
</script>

<style lang="scss" scoped>
.team-section {
  align-items: center;
  display: flex;
  flex-direction: column;

  &.single {
    @media #{map-get($display-breakpoints, 'md-and-up')} {
      margin-right: 92px;
    }

    .team-section__title {
      padding-left: 0;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__title {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 14px;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      align-self: flex-start;
      font-size: 30px;
      padding-left: 20px;
    }
  }

  &__content {
    display: flex;
    position: relative;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;

    &.showborder {
      border-right-width: 1px;
      border-right-style: dashed;
      border-right-color: darkgray;
    }

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      flex-direction: row;
    }
  }
}
</style>
