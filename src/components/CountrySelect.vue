<template>
    <SelectCustom
        :form-data="model"
        :options="options"
        :label="getText('selectCountry')"
        :on-select-value="onSelect"
    />
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { ref, defineComponent, watch, PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import { useCountriesStore } from 'src/stores/countries-store';
import SelectCustom from './SelectCustom.vue';

export default defineComponent({
    components: {
        SelectCustom,
    },
    props: {
        formData: {
            type: String,
            required: true,
        },
        onSelectCountry: {
            required: true,
            type: Function as PropType<(v: string) => void>,
        },
    },
    setup(props) {
        const store = useCountriesStore();
        const { countries } = storeToRefs(store);
        const { t } = useI18n();
        const getText = (key: string) => t(key);

        const model = ref(props.formData || '');
        const options = ref(countries);

        const filterFn = (val: string, update: (arg: () => void) => void) => {
            if (val === '' || !val) {
                update(() => {
                    options.value = countries.value;
                });
                return;
            }

            update(() => {
                const needle = val.toLowerCase();
                options.value = countries.value.filter(
                    (v) => v.toLowerCase().indexOf(needle) > -1
                );
            });
        };

        return {
            getText,
            model,
            options,
            filterFn,
            onSelect: props.onSelectCountry,
        };
    },
});
</script>
