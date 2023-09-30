<template>
    <q-select
        v-model="model"
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
import { useTempStore } from 'src/stores/temp-store';
import { watch, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
    setup() {
        const { t } = useI18n();
        const tempStore = useTempStore();

        const model = ref(tempStore.getTempType);

        watch(model, () => {
            tempStore.setTempType(model.value);
        });
        return {
            model,
            localeOptions: [
                { value: 'C', label: t('celsius') },
                { value: 'F', label: t('fahrenheit') },
            ],
        };
    },
};
</script>
