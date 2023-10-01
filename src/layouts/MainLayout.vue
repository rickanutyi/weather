<template>
    <q-layout view="lHh Lpr lFf">
        <div class="q-pa-md q-gutter-sm row no-wrap">
            <q-toggle
                :model-value="$q.dark.isActive"
                @update:model-value="toggleTheme"
                class="q-mb-md"
            />

            <div class="q-ml-lg">
                <LangSwitcher />
            </div>
            <div class="q-ml-lg">
                <TampTypeSwitcher />
            </div>
        </div>

        <q-page-container class="container">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<style lang="scss" scoped>
.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 16px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import LangSwitcher from 'src/components/LangSwitcher.vue';
import TampTypeSwitcher from 'src/components/TampTypeSwitcher.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name: 'MainLayout',

    components: {
        LangSwitcher,
        TampTypeSwitcher,
    },

    setup() {
        const $q = useQuasar();
        const toggleTheme = () => $q.dark.toggle();

        return {
            toggleTheme,
        };
    },
});
</script>
