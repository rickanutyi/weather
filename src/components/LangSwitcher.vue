<template>
    <q-select
        v-model="locale"
        :options="localeOptions"
        dense
        borderless
        emit-value
        map-options
        options-dense
        style="min-width: 100px"
    />
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
    setup() {
        const { locale, t } = useI18n({ useScope: 'global' });
        return {
            locale,
            localeOptions: [
                { value: 'en-US', label: 'English' },
                { value: 'ru-Ru', label: 'Русский' },
            ],
        };
    },
};
</script>
