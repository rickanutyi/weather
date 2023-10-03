<template>
    <q-page class="page q-col-gutter-md">
        <div class="col-4 q-mb-md">
            <CountrySelect v-model="country" />
            <CitySelect v-model="city" :coutry="country" class="q-mt-sm" />
        </div>

        <div class="col-12 row row-mobile q-pb-md">
            <div class="col-12 col-md-6 clear__padding">
                <WeatherDetail
                    :city="city"
                    :weather-list="getWeatherByDate(currentDate)"
                />
            </div>

            <div class="col-12 col-md-6 q-mt-md">
                <h6 class="q-mt-sm q-mb-sm" v-if="!city">
                    {{ t('selectCity') }}
                </h6>

                <div v-if="isLoading" class="progress__wrapper">
                    <q-circular-progress
                        indeterminate
                        rounded
                        size="50px"
                        color="lime"
                        class="q-ma-md"
                    />
                </div>

                <q-list
                    v-else
                    borderless
                    separator
                    class="week__list bg-theme-medium"
                >
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
        </div>
    </q-page>
</template>

<style scoped lang="scss">
.page {
    min-height: auto !important;
}
.progress__wrapper {
    display: flex;
    justify-content: center;
}

body.screen--md .clear__padding,
body.screen--lg .clear__padding {
    padding-right: 15px;
}
.week__list {
    padding: 10px;
    border-radius: 10px;
    min-height: 100px;
}
.list-item {
    padding-block: 20px;
    display: flex;
    justify-content: space-between;
}
.row-mobile {
    @media screen and (max-width: 670px) {
        flex-direction: column;
    }
}
.week__list {
    min-height: 100px;
}
.mobile-mt {
    margin-top: 0px;
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
        getWeather(city.value);
        getCities(country.value);
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
        watch(weatherList, () => {
            if (weatherList.value.length) {
                currentDate.value = new Date(weatherList.value[0].dt_txt);
            } else currentDate.value = null;
        });

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
