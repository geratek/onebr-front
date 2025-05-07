<template>
  <figure class="team-member text-center">
    <v-avatar
      :width="isMobile ? 155 : 200"
      :height="isMobile ? 149 : 190"
    >
      <img
        :src="profileImage"
        :alt="member.name"
      >
    </v-avatar>
    <figcaption>
      <h1 class="team-member__name primary--text">
        <a :href="member.curriculumLink" target="_blank">
          {{ member.name }}
        </a>
      </h1>
      <p class="body-2 ma-0" v-if="member.title === 'INSTRUCTOR'">
        {{ member.description }}
      </p>
    </figcaption>
  </figure>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import TeamMemberEntity from '@/modules/shared/entities/TeamMember'

@Component
export default class TeamMember extends Vue {
  @Prop({ required: true })
  private readonly member!: TeamMemberEntity;

  private get profileImage(): string {
    return this.member.image?.src ?? ''
  }

  private get isMobile(): boolean {
    return this.$vuetify.breakpoint.smAndDown
  }
}
</script>

<style lang="scss" scoped>
.team-member {
  width: 260px;
  padding: 12px 0 24px;

  &:only-child {
    padding-bottom: 75px;
  }

  @media #{map-get($display-breakpoints, 'md-and-up')} {
    &:not(:last-child) {
      margin-right: 42px;
    }
  }

  &__name {
    font-size: 18px;
    font-weight: 600;
    line-height: 150%;
    margin: 17px 0 6px;
  }
}
</style>
