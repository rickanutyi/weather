<template>
    <q-toggle v-model="isDark" class="q-mb-md" />
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';

const $q = useQuasar();
const isDark = ref($q.dark.isActive);
const switchTheme = () => {
    $q.dark.toggle();
};
watch(isDark, () => switchTheme());
</script>
