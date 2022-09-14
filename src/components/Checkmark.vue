<script>
import { defineComponent } from 'vue';
import CheckmarkIcon from './icons/CheckmarkIcon.vue';

export default defineComponent({
  props: {
    initialChecked: {
      type: Boolean,
      default: undefined,
    },

    checked: {
      type: Boolean,
      default: undefined,
    },
  },
  data() {
    return {
      innerChecked: this.initialChecked || this.checked || false,
    };
  },
  computed: {
    actuallyChecked: {
      get() {
        if (typeof this.checked === 'undefined') {
          return this.innerChecked;
        }
        return this.checked;
      },
      set(val) {
        this.innerChecked = val;
        this.$emit('change', val);
      },
    },
  },
  emits: ['change'],
  components: { CheckmarkIcon },
});
</script>

<template>
  <div
    class="checkmark"
    :class="{ 'checkmark--checked': actuallyChecked }"
    @click="() => (actuallyChecked = !actuallyChecked)"
  >
    <CheckmarkIcon class="checkmark__icon" />
  </div>
</template>
