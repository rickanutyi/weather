<template>
    <q-select
        filled
        v-model="model.city"
        use-input
        input-debounce="0"
        :label="getText('selectCity')"
        :options="options"
        @filter="filterFn"
        style="width: 320px"
        behavior="menu"
    >
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-grey">
                    {{ getText('noResult') }}
                </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useCountriesStore } from 'src/stores/countries-store';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    formData: {
        type: Object,
        required: true,
    },
});

const store = useCountriesStore();
const { cities: stringOptions } = storeToRefs(store);
const options = ref(stringOptions);
const model = ref(props.formData || { city: '' });
const { t } = useI18n();

const getText = (key: string) => t(key);

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
</script>
