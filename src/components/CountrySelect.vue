<template>
    <q-select
        filled
        v-model="model.country"
        use-input
        input-debounce="0"
        :label="getText('selectCountry')"
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
import { ref, defineProps, PropType } from 'vue';
import { useCountriesStore } from 'src/stores/countries-store';
import { useI18n } from 'vue-i18n';

const store = useCountriesStore();
const { countries } = storeToRefs(store);
const { t } = useI18n();

type FormData = { country: string };

const getText = (key: string) => t(key);

const props = defineProps({
    formData: Object as PropType<FormData>,
});

const model = ref(props.formData || { country: '' });
const options = ref(countries.value);
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
</script>
