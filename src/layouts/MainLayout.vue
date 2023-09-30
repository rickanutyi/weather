<template>
    <q-layout view="lHh Lpr lFf">
        <div class="q-pa-md q-gutter-sm row">
            <q-toggle v-model="isDark" class="q-mb-md" />
            <div class="q-ml-lg">
                <LangSwitcher />
            </div>
            <div class="q-ml-lg">
                <TampTypeSwitcher />
            </div>
        </div>
        <q-page-container class="main">
            <div class="form">
                <CountrySelect :form-data="model" />
                <CitySelect :form-data="cityModel" />
            </div>
            <div class="weather">
                <WeatherDetail :weather-list="choosenDays" />
                <q-list
                    v-if="!isLoading"
                    bordered
                    separator
                    class="weather_list"
                >
                    <q-item
                        class="list-item"
                        clickable
                        v-ripple
                        @click="onDayClick(weather)"
                        v-for="weather in weatherList"
                        :key="weather.dt"
                    >
                        <weather-card :weather="weather" />
                    </q-item>
                </q-list>
                <div v-if="isLoading" class="progress__wrapper">
                    <q-circular-progress
                        indeterminate
                        rounded
                        size="50px"
                        color="lime"
                        class="q-ma-md"
                    />
                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<style lang="scss" scoped>
.main {
    display: flex;
    gap: 20px;
    padding-bottom: 20px;
    @media screen and (max-width: 760px) {
        flex-direction: column;
        padding-inline: 16px;
    }
}
.weather,
.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-top: 20px;
}

.weather {
    @media screen and (max-width: 760px) {
        align-items: center;
        justify-content: center;
    }
}

.form {
    align-items: flex-end;
    justify-content: flex-start;
    gap: 5px;
    @media screen and (max-width: 760px) {
        align-items: center;
        justify-content: center;
    }
}
.weather_list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    min-width: min(340px, 100%);
}
.list-item {
    min-width: min(340px, 100%);
}
.progress__wrapper {
    min-width: min(340px, 100%);
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

import WeatherCard from 'components/WeatherCard.vue';
import WeatherDetail from 'src/components/WeatherDetail.vue';
import CountrySelect from 'components/CountrySelect.vue';
import CitySelect from 'src/components/CitySelect.vue';
import LangSwitcher from 'src/components/LangSwitcher.vue';
import TampTypeSwitcher from 'src/components/TampTypeSwitcher.vue';

import countryService from 'src/services/country-service';
import weatherService from 'src/services/weather-service';

import { useCountriesStore } from 'stores/countries-store';
import { useWeatherStore } from 'src/stores/weather-store';
import { Weather } from 'src/stores/types';

const countriesStore = useCountriesStore();
const weatherStore = useWeatherStore();
const { getWeatherList } = storeToRefs(weatherStore);

const isLoading = ref(false);

const getWeather = (city: string) => {
    isLoading.value = true;
    weatherService
        .getWeatherByCity(city)
        .then((res) => {
            if (res) {
                const days: number[] = [];
                const filtered = res.filter((weather) => {
                    const date = new Date(weather.dt_txt);
                    if (!days.includes(date.getDay())) {
                        days.push(date.getDay());
                        return true;
                    } else return false;
                });
                weatherStore.setWeatherList(filtered);
            } else weatherStore.setWeatherList([]);
        })
        .catch(() => weatherStore.setWeatherList([]))
        .finally(() => (isLoading.value = false));
};

const getCountries = () => {
    countryService.getCountries().then((res) => {
        if (res) {
            const arrayOfCountries = res.map((country) => country.name);
            countriesStore.setCountries(arrayOfCountries);
        }
    });
};

const getCities = (countryName: string) => {
    countryService.getCities(countryName).then((res) => {
        if (res) countriesStore.setCities(res);
    });
};

export default defineComponent({
    name: 'MainLayout',

    components: {
        WeatherCard,
        CountrySelect,
        CitySelect,
        WeatherDetail,
        LangSwitcher,
        TampTypeSwitcher,
    },
    mounted() {
        getCountries();
    },

    setup() {
        const leftDrawerOpen = ref(false);
        const model = reactive({ country: '' });
        const cityModel = reactive({ city: '' });
        const choosenDays = ref<Weather[]>([]);
        const $q = useQuasar();
        const isDark = ref($q.dark.isActive);

        const onDayClick = (day: Weather) => {
            choosenDays.value = getWeatherList.value.filter((weather) => {
                const date = new Date(weather.dt_txt);
                const choosenDate = new Date(day.dt_txt);
                if (date.getDay() === choosenDate.getDay()) return true;
                return false;
            });
        };

        const switchTheme = () => {
            $q.dark.toggle();
        };

        watch(isDark, () => switchTheme());

        watch(model, () => {
            cityModel.city = '';
            getCities(model.country);
        });

        watch(cityModel, () => {
            getWeather(cityModel.city);
        });

        watch(getWeatherList, () => {
            getWeatherList.value.length && onDayClick(getWeatherList.value[0]);
        });
        return {
            weatherList: getWeatherList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
            model,
            cityModel,
            onDayClick,
            choosenDays,
            switchTheme,
            isDark,
            isLoading: isLoading,
        };
    },
});
</script>
