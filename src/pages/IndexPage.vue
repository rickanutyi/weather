<template>
    <q-page class="page row q-col-gutter-md">
        <div class="col-12 col-sm-6 q-mb-md">
            <CountrySelect v-model="country" />
            <CitySelect v-model="city" :coutry="country" class="q-mt-sm" />
        </div>

        <div class="col-12 col-sm-6">
            <WeatherDetail :weather-list="getWeatherByDate(currentDate)" />

            <h5 v-if="!city">{{ t('selectCity') }}</h5>

            <div v-if="isLoading" class="progress__wrapper">
                <q-circular-progress
                    indeterminate
                    rounded
                    size="50px"
                    color="lime"
                    class="q-ma-md"
                />
            </div>

            <q-list v-else bordered separator class="weather_list">
                <q-item
                    v-ripple
                    class="list-item"
                    clickable
                    v-for="weather in weatherList"
                    @click="onWeatherClick(weather)"
                    :key="weather.dt"
                >
                    <weather-card :weather="weather" />
                </q-item>
            </q-list>
        </div>
    </q-page>
</template>

<style>
.page {
    min-height: auto !important;
}
</style>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import WeatherCard from 'components/WeatherCard.vue';
import WeatherDetail from 'src/components/WeatherDetail.vue';
import CountrySelect from 'components/CountrySelect.vue';
import CitySelect from 'src/components/CitySelect.vue';

import { Weather } from 'src/stores/types';
import { useWeather } from 'src/composable/weather';
import { useCountry } from 'src/composable/country';
import { useCities } from 'src/composable/city';

const { getWeather, isLoading, getWeatherByDate, weatherList } = useWeather();
const { getCountries, country } = useCountry();
const { getCities, city } = useCities();

export default defineComponent({
    name: 'IndexPage',

    components: {
        WeatherCard,
        CountrySelect,
        CitySelect,
        WeatherDetail,
    },
    mounted() {
        getCountries();
    },

    setup() {
        const currentDate = ref<Date | null>(null);
        const { t } = useI18n();
        const onWeatherClick = ({ dt_txt: day }: Weather) => {
            currentDate.value = new Date(day);
        };

        watch(city, (value) => getWeather(value));
        watch(country, (value) => {
            city.value = '';
            getCities(value);
        });
        watch(weatherList, () => (currentDate.value = null));

        return {
            weatherList,
            country,
            city,
            currentDate,
            isLoading,
            onWeatherClick,
            getWeatherByDate,
            t,
        };
    },
});
</script>
