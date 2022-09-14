<script>
import { defineComponent } from 'vue';
import EmailItem from './EmailItem.vue';
import SimpleButton from './SimpleButton.vue';
import Checkmark from './Checkmark.vue';

export default defineComponent({
  components: {
    EmailItem,
    SimpleButton,
    Checkmark,
  },

  props: {
    emails: {
      type: Array,
      required: true,
    },
    disableKeys: {
      type: Boolean,
      required: true,
    },
  },

  emits: [
    'selectAll',
    'deselectAll',
    'toggleEmail',
    'markAsRead',
    'archive',
    'showEmail',
  ],

  unmounted() {
    window.removeEventListener('keydown', this.keydownListener);
  },

  computed: {
    selectedEmails() {
      return this.emails.filter((e) => e.selected);
    },
    selectedEmailIds() {
      return this.selectedEmails.map((e) => e.id);
    },
    selectedEmailCount() {
      return this.selectedEmails.length;
    },
  },

  watch: {
    disableKeys: {
      immediate: true,
      handler(val) {
        if (!val) {
          window.addEventListener('keydown', this.keydownListener);
        } else {
          window.removeEventListener('keydown', this.keydownListener);
        }
      },
    },
  },

  methods: {
    keydownListener(e) {
      if (e.key === 'r') {
        this.$emit('markAsRead', this.selectedEmailIds);
      } else if (e.key === 'a') {
        this.$emit('archive', this.selectedEmailIds);
      }
    },
  },
});
</script>
<template>
  <h2>Emails selected ({{ selectedEmailCount }})</h2>

  <div class="button-group mt-4">
    <Checkmark
      :checked="emails.length > 0 && emails.every((e) => e.selected)"
      @change="(val) => $emit(val ? 'selectAll' : 'deselectAll')"
    />
    <SimpleButton @click="() => $emit('markAsRead', selectedEmailIds)"
      >Mark as read (r)</SimpleButton
    >
    <SimpleButton @click="() => $emit('archive', selectedEmailIds)"
      >Archive (a)</SimpleButton
    >
  </div>

  <div class="mt-6">
    <EmailItem
      v-for="email of emails"
      @click="() => $emit('showEmail', email.id)"
      :key="email.id"
      :email="email"
      @toggleEmail="(payload) => $emit('toggleEmail', payload)"
    />
  </div>
</template>
