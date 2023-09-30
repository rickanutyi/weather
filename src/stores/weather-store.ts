import { defineStore } from 'pinia';
import { Weather } from './types';

type WeatherStoreData = {
    weatherList: Weather[];
};
export const useWeatherStore = defineStore('weather', {
    state: () =>
        ({
            weatherList: [],
        } as WeatherStoreData),
    getters: {
        getWeatherList: (store) => store.weatherList,
    },
    actions: {
        setWeatherList(weatherList: Weather[]) {
            this.weatherList = weatherList;
        },
    },
});
