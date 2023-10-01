import { defineStore } from 'pinia';
import { Weather } from './types';

type WeatherStoreData = {
    weatherList: Weather[];
};

export const useWeatherStore = defineStore('weather', {
    state: (): WeatherStoreData => ({ weatherList: [] }),
    getters: {
        getWeatherList: (store) => store.weatherList,

        getByDate(store) {
            return (date: Date) => {
                return store.weatherList.filter((weather) => {
                    const currentDate = new Date(weather.dt_txt);
                    if (currentDate.getDay() === date.getDay()) return true;

                    return false;
                });
            };
        },
    },
    actions: {
        setWeatherList(weatherList: Weather[]) {
            this.weatherList = weatherList;
        },
    },
});

export type WeatherStore = ReturnType<typeof useWeatherStore>;
