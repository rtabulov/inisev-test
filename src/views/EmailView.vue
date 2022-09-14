<script>
import { defineComponent } from 'vue';
import SimpleButton from '../components/SimpleButton.vue';

export default defineComponent({
  components: { SimpleButton },
  emits: ['markAsRead', 'archive', 'clearPageEmail'],
  props: {
    email: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    window.addEventListener('keydown', this.keydownListener);
    setTimeout(() => {
      window.addEventListener('click', this.close);
    }, 0);
  },

  unmounted() {
    window.removeEventListener('keydown', this.keydownListener);
    window.removeEventListener('click', this.close);
  },

  methods: {
    close() {
      this.$emit('clearPageEmail');
    },
    keydownListener(e) {
      e.stopPropagation();

      if (e.key === 'r') {
        this.$emit('markAsRead', [this.email.id]);
      } else if (e.key === 'a') {
        this.$emit('archive', [this.email.id]);
      } else if (e.key === 'Escape') {
        this.$emit('clearPageEmail');
      }
    },
  },
});
</script>

<template>
  <div class="email-view" @click.stop>
    <a href="#" @click.prevent="close">Close (Esc)</a>

    <div class="button-group mt-4">
      <SimpleButton @click="() => $emit('markAsRead', selectedEmailIds)"
        >Mark as read (r)</SimpleButton
      >
      <SimpleButton @click="() => $emit('archive', selectedEmailIds)"
        >Archive (a)</SimpleButton
      >
    </div>

    <div>
      <h2>{{ email.title }}</h2>
      <p>{{ email.body }}</p>
    </div>
  </div>
</template>
