<template>
    <q-select
        filled
        v-model="model"
        use-input
        input-debounce="0"
        :label="t('selectCountry')"
        :options="options"
        @filter="filterFn"
        behavior="menu"
        rounded
        popup-content-style="border-radius: 10px bg-theme"
    >
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-grey">
                    {{ t('noResult') }}
                </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { defineProps, ref, watch } from 'vue';
import { useCountriesStore } from 'src/stores/countries-store';
import { useI18n } from 'vue-i18n';

const store = useCountriesStore();
const { countries } = storeToRefs(store);
const { t } = useI18n();

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const model = ref(props.modelValue);
const options = ref(countries.value);

watch(model, (value) => {
    emit('update:modelValue', value);
});

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
