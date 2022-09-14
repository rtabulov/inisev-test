<script>
import { defineComponent } from 'vue';

import { SAMPLE_EMAILS } from './sample-emails';
import TheLayout from './components/TheLayout.vue';
import ArchiveView from './views/ArchiveView.vue';
import InboxView from './views/InboxView.vue';
import EmailView from './views/EmailView.vue';

export default defineComponent({
  components: {
    TheLayout,
    ArchiveView,
    InboxView,
    EmailView,
  },

  data() {
    return {
      emails: SAMPLE_EMAILS.map((e) => ({ ...e, selected: false })),
      pathname: window.location.pathname,
      pageEmailId: undefined,
    };
  },

  computed: {
    pageEmail() {
      return this.emails.find((e) => e.id === this.pageEmailId);
    },
    archivedEmails() {
      return this.emails.filter((email) => email.isArchived);
    },
    inboxEmails() {
      return this.emails.filter((email) => !email.isArchived);
    },

    inboxOrArchiveProps() {
      return {
        emails: this.inboxEmails,
        disableKeys: !!this.pageEmailId,
        onSelectAll: this.selectAll,
        onDeselectAll: this.deselectAll,
        onToggleEmail: this.toggleEmail,
        onMarkAsRead: this.markAsRead,
        onArchive: this.archive,
        onShowEmail: (id) => (this.pageEmailId = id),
      };
    },
  },

  mounted() {
    window.addEventListener('popstate', this.handleRouteChange);
  },

  methods: {
    handleRouteChange() {
      this.pathname = window.location.pathname;
    },

    archive(ids) {
      this.emails = this.emails.map((e) => {
        if (ids.includes(e.id)) {
          return { ...e, isArchived: true };
        }

        return e;
      });
    },
    markAsRead(ids) {
      this.emails = this.emails.map((e) => {
        if (ids.includes(e.id)) {
          return { ...e, isRead: true };
        }

        return e;
      });
    },
    selectAll() {
      this.emails = this.emails.map((e) => ({ ...e, selected: true }));
    },
    deselectAll() {
      this.emails = this.emails.map((e) => ({ ...e, selected: false }));
    },
    toggleEmail(emailId) {
      this.emails = this.emails.map((e) =>
        e.id !== emailId ? e : { ...e, selected: !e.selected },
      );
    },
  },

  watch: {
    pathname() {
      this.deselectAll();
    },
  },
});
</script>

<template>
  <TheLayout
    :darken="!!pageEmailId"
    :inboxEmailsLength="inboxEmails.length"
    :archivedEmailsLength="archivedEmails.length"
  >
    <ArchiveView v-if="pathname === '/archive'" v-bind="inboxOrArchiveProps" />
    <InboxView v-if="pathname === '/inbox'" v-bind="inboxOrArchiveProps" />
  </TheLayout>

  <EmailView
    v-if="pageEmail"
    :email="pageEmail"
    @markAsRead="markAsRead"
    @archive="archive"
    @clearPageEmail="pageEmailId = undefined"
  />
</template>
