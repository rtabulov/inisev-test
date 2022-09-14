<script>
import { defineComponent } from 'vue';
import Checkmark from './Checkmark.vue';

export default defineComponent({
  components: { Checkmark },
  props: {
    email: {
      type: Object,
      required: true,
    },
  },
  emits: ['toggleEmail'],
});
</script>

<template>
  <div class="email-item" :class="{ 'email-item--read': email.isRead }">
    <Checkmark
      :checked="email.selected"
      @click.stop
      @change="() => $emit('toggleEmail', email.id)"
    />
    <p>
      {{ email.title }}
    </p>
  </div>
</template>
