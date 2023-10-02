<template>
    <div v-if="!!getDefaultWeather()" class="detail">
        <div class="detail__right">
            <h4 class="text title">{{ choosenCity }}</h4>
            <span class="text">{{ getText('date') }} {{ dateTime }}</span>
            <br />
            <span>{{
                tempType(
                    currentWeather?.main.temp || 0,
                    tempStore.getTempType.value,
                    1
                )
            }}</span>
        </div>
        <img
            class="icon"
            :src="`/${getImage(currentWeather || undefined)}`"
            alt=""
        />
    </div>
    <div>
        <h5 class="q-mb-sm q-mt-sm">{{ getText('todaysForecast') }}</h5>
        <q-list borderless class="card__list bg-theme-medium">
            <q-item
                class="card-item"
                v-for="weather in weatherList"
                :key="weather.dt"
                clickable
                @click="onClickCard(weather)"
            >
                <span>{{ getDate(weather.dt_txt).format('HH:MM') }}</span>
                <img class="icon-mini" :src="`/${getImage(weather)}`" alt="" />
                <span class="card__temp">{{
                    tempType(
                        weather.main.temp || 0,
                        tempStore.getTempType.value,
                        1
                    )
                }}</span>
            </q-item>
        </q-list>
    </div>
    <div class="detail__list bg-theme-medium q-mt-sm">
        <span class="text">
            {{ getText('temprature') }}:
            <span class="q-ml-sm">
                {{
                    tempType(
                        currentWeather?.main.temp || 0,
                        tempStore.getTempType.value
                    )
                }}
            </span>
        </span>
        <span class="text">
            {{ getText('feelsLike') }}:
            <span class="q-ml-sm">
                {{
                    tempType(
                        currentWeather?.main.feels_like || 0,
                        tempStore.getTempType.value
                    )
                }}
            </span>
        </span>
        <span class="text">
            {{ getText('minimum') }}:
            <span class="q-ml-sm">
                {{
                    tempType(
                        currentWeather?.main.temp_min || 0,
                        tempStore.getTempType.value
                    )
                }}
            </span>
        </span>
        <span class="text">
            {{ getText('maximum') }}:
            <span class="q-ml-sm">
                {{
                    tempType(
                        currentWeather?.main.temp_max || 0,
                        tempStore.getTempType.value
                    )
                }}
            </span>
        </span>
        <span class="text">
            {{ getText('wind') }}:
            <span class="q-ml-sm">
                {{ currentWeather?.wind.speed }} {{ getText('speed') }}
            </span>
        </span>
    </div>
</template>
<style lang="scss" scoped>
.detail {
    padding: 20px 0px;
    min-width: min(340px, 100%);
    display: flex;
    justify-content: space-between;
}
.text {
    font-size: 12px;
}
.title {
    margin: 0px;
    font-size: 24px;
}
.detail__left {
    display: flex;
    flex-direction: column;
}

.detail__list {
    padding: 10px;
    border-radius: 10px;
    display: grid;
    gap: 4px;
}

.body--dark .card-item:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.28);
}

.card__list {
    min-height: 100px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
}
.card-item {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.card__temp {
    font-size: 12px;
}
.icon {
    width: 80px;
    height: 80px;
}
.icon-mini {
    width: 40px;
    height: 40px;
}
</style>
<script lang="ts" setup>
import { PropType, computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { dayjs } from 'src/boot/dayjs';
import { useTempStore } from 'src/stores/temp-store';

import { Weather } from 'src/stores/types';
import { getImgName, showTempType } from 'src/helpers';

import { useI18n } from 'vue-i18n';

const props = defineProps({
    weatherList: Object as PropType<Weather[]>,
    city: String,
});

const tempStore = storeToRefs(useTempStore());
const { t } = useI18n();

const getText = (key: string) => t(key);
const tempType = showTempType;
const choosenCity = ref(props.city);

const currentWeather = ref<Weather | null>(null);

const onClickCard = (weather: Weather) => (currentWeather.value = weather);
const getDefaultWeather = () => {
    if (props.weatherList && props.weatherList.length)
        return props.weatherList[0];
};

const getDate = dayjs;

const dateTime = computed(() =>
    dayjs(currentWeather.value?.dt_txt || '').format('DD-MM-YYYY / HH:MM')
);

watch(
    () => props.weatherList,
    () => {
        if (props.weatherList && props.weatherList.length) {
            currentWeather.value = props.weatherList[0];
        }
    }
);

watch(
    () => props.city,
    () => {
        choosenCity.value = props.city;
    }
);

const getImage = (weather?: Weather) => {
    if (weather) {
        const w = weather.weather[0].main;
        return getImgName(w);
    }
    return 'sunny.png';
};
</script>
