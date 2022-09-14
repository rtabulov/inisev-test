<script>
import { defineComponent } from 'vue';
import { handleNavigation } from '../utils';

export default defineComponent({
  props: {
    inboxEmailsLength: {
      type: Number,
      required: true,
    },
    archivedEmailsLength: {
      type: Number,
      required: true,
    },
    darken: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    handleNavigation,
  },
});
</script>

<template>
  <div v-if="darken" class="dark-overlay"></div>
  <aside class="sidebar">
    <nav class="sidebar__links-container">
      <a
        href="/inbox"
        class="sidebar__link"
        @click.prevent="(e) => handleNavigation(e.target.href, 'Inbox')"
        >Inbox {{ inboxEmailsLength }}</a
      >
      <a
        href="/archive"
        class="sidebar__link"
        @click.prevent="(e) => handleNavigation(e.target.href, 'Archive')"
        >Archive {{ archivedEmailsLength }}</a
      >

      <a class="sidebar__link mt-auto">Logout</a>
    </nav>
  </aside>

  <main class="main">
    <slot />
  </main>
</template>
