<template>
    <q-select
        filled
        v-model="model"
        use-input
        input-debounce="0"
        :label="t('selectCity')"
        :options="options"
        @filter="filterFn"
        behavior="menu"
        :hint="isCountryCoosen ? '' : t('chooseCountryFirst')"
        :disable="!isCountryCoosen"
        rounded
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
import { ref, watch } from 'vue';
import { useCountriesStore } from 'src/stores/countries-store';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    coutry: {
        tyle: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const { t } = useI18n();
const store = useCountriesStore();
const { cities: stringOptions } = storeToRefs(store);
const options = ref(stringOptions);
const model = ref(props.modelValue);
const isCountryCoosen = ref(true);

watch(model, (value) => {
    emit('update:modelValue', value);
});

watch(
    () => props.modelValue,
    (value) => {
        model.value = value;
    }
);
watch(
    () => props.coutry,
    (value) => {
        if (value) isCountryCoosen.value = true;
        else isCountryCoosen.value = false;
    }
);
const filterFn = (val: string, update: (arg: () => void) => void) => {
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
