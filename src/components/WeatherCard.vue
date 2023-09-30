<template>
    <q-item-section avatar>
        <q-avatar rounded>
            <img class="icon" :src="`src/assets/icons/${getImage()}`" alt="" />
        </q-avatar>
    </q-item-section>
    <q-item-section>
        <span class="date">{{ formatDate(weather?.dt_txt || '') }}</span>
    </q-item-section>
    <q-item-section>
        <span>
            {{ getText('temprature') }}
            {{ tempType(weather?.main.temp || 0, tempStore.getTempType.value) }}
        </span>
    </q-item-section>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

import { Weather } from 'src/stores/types';
import { useTempStore } from 'src/stores/temp-store';

import { getImgName, getDayName, showTempType } from 'src/helpers/index';

const props = defineProps({
    weather: Object as PropType<Weather>,
});

const tempStore = storeToRefs(useTempStore());
const { t } = useI18n();
const tempType = showTempType;
const getText = (key: string) => t(key);
const getImage = () => {
    if (props.weather) {
        const w = props.weather.weather[0].main;
        return getImgName(w);
    }
    return 'sunny.png';
};

const formatDate = (date: string) => {
    return getDayName(new Date(date).getDay(), getText);
};
</script>

<style scoped>
.weather-card {
    width: 100%;
    height: 100%;
    min-height: 50px;
    /* max-width: 340px; */
    min-width: min(340px, 100%);

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    cursor: pointer;
}

.icon {
    width: 40px;
    height: 40px;
}
.date {
    color: '#000';
}
</style>
