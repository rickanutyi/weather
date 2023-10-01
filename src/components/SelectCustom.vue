<template>
    <q-select
        filled
        v-model="model"
        use-input
        emit-value
        input-debounce="0"
        :label="label"
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
import { watch, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    formData: {
        type: String,
        required: true,
    },
    options: {
        type: Array as PropType<string[]>,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    onSelectValue: {
        required: true,
        type: Function as PropType<(v: string) => void>,
    },
});

const { t } = useI18n();

const model = ref(props.formData);
const options = ref(props.options);
const label = ref(props.label);

watch(
    () => model.value,
    () => props.onSelectValue(model.value)
);

watch(
    () => props.formData,
    () => {
        model.value = props.formData;
    }
);

const getText = (key: string) => t(key);
const filterFn = (val: string, update: (arg: () => void) => void) => {
    if (!val || val === '') {
        update(() => {
            options.value = props.options;
        });
        return;
    }

    update(() => {
        const needle = val.toLowerCase();

        options.value = props.options.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
        );
    });
};
</script>
