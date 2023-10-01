<template>
    <SelectCustom
        :form-data="model"
        :options="options"
        :label="getText('selectCity')"
        :on-select-value="onSelect"
    />
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { PropType, defineComponent, ref, watch } from 'vue';
import { useCountriesStore } from 'src/stores/countries-store';
import { useI18n } from 'vue-i18n';
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
        onSelectCity: {
            required: true,
            type: Function as PropType<(v: string) => void>,
        },
    },
    setup(props) {
        const store = useCountriesStore();
        const { t } = useI18n();
        const { cities: stringOptions } = storeToRefs(store);
        const options = ref(stringOptions);
        const getText = (key: string) => t(key);
        const model = ref(props.formData || '');

        watch(
            () => props.formData,
            () => {
                console.log(props.formData);
                model.value = props.formData;
            }
        );

        const filterFn = (val: string, update: (arg: () => void) => void) => {
            console.log(val);
            if (!val || val === '') {
                update(() => {
                    options.value = stringOptions.value;
                });
                return;
            }

            update(() => {
                const needle = val.toLowerCase();

                options.value = stringOptions.value.filter(
                    (v) => v.toLowerCase().indexOf(needle) > -1
                );
            });
        };
        return {
            getText,
            filterFn,
            model,
            options,
            onSelect: props.onSelectCity,
        };
    },
});
</script>
