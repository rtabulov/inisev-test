<script>
import { defineComponent } from 'vue';
import EmailList from '../components/EmailList.vue';

export default defineComponent({
  components: { EmailList },
});
</script>

<template>
  <div class="p-8">
    <h1>Archive</h1>
    <EmailList v-bind="$attrs" />
  </div>
</template>
