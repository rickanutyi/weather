<template>
    <q-select
        v-model="model"
        :options="options"
        dense
        borderless
        emit-value
        map-options
        options-dense
        style="min-width: 100px"
    />
</template>

<script>
import { useTempStore } from 'src/stores/temp-store';
import { watch, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
    setup() {
        const { t, locale } = useI18n();
        const tempStore = useTempStore();

        const model = ref(tempStore.getTempType);

        watch(model, () => {
            tempStore.setTempType(model.value);
        });

        const options = ref([
            { value: 'C', label: t('celsius') },
            { value: 'F', label: t('fahrenheit') },
        ]);
        watch(locale, () => {
            //по какой то причине options не реактивен для локализации
            options.value[0].label = t('celsius');
            options.value[1].label = t('fahrenheit');
        });

        return {
            model,
            options,
        };
    },
};
</script>
