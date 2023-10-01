<template>
    <div v-if="!!getDefaultWeather()" class="detail">
        <div class="detail__left">
            <img class="icon" :src="`/${getImage()}`" alt="" />
            <span class="text">
                {{ getText('temprature') }}:
                <span class="q-ml-sm">
                    {{
                        tempType(
                            getDefaultWeather()?.main.temp || 0,
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
                            getDefaultWeather()?.main.feels_like || 0,
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
                            getDefaultWeather()?.main.temp_min || 0,
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
                            getDefaultWeather()?.main.temp_max || 0,
                            tempStore.getTempType.value
                        )
                    }}
                </span>
            </span>
            <span class="text">
                {{ getText('wind') }}:
                <span class="q-ml-sm">
                    {{ getDefaultWeather()?.wind.speed }} {{ getText('speed') }}
                </span>
            </span>
        </div>
        <div class="detail__right">
            <h4 class="text title">{{ getText('weather') }}</h4>
            <span>{{ choosenCity }}</span> <br />
            <span class="text">{{ getText('date') }} {{ dateTime }}</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.detail {
    padding: 20px 0px;
    min-width: min(340px, 100%);
    flex: 1;
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
.icon {
    width: 80px;
    height: 80px;
}
</style>
<script lang="ts" setup>
import { PropType, ref, watch } from 'vue';
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
const getDefaultWeather = () => {
    if (props.weatherList && props.weatherList.length)
        return props.weatherList[0];
};

const dateTime = ref(
    dayjs(getDefaultWeather()?.dt_txt || '').format('DD-MM-YYYY / HH:MM')
);

watch(
    () => props.weatherList,
    () => {
        dateTime.value = dayjs(getDefaultWeather()?.dt_txt || '').format(
            'DD-MM-YYYY / HH:MM'
        );
    }
);

watch(
    () => props.city,
    () => {
        choosenCity.value = props.city;
    }
);

const getImage = () => {
    if (props.weatherList && props.weatherList.length) {
        const w = props.weatherList[0].weather[0].main;
        return getImgName(w);
    }
    return 'sunny.png';
};
</script>
