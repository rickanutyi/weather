import { defineStore } from 'pinia';
import { Weather } from './types';

type WeatherStoreData = {
    weatherList: Weather[];
};

export const useWeatherStore = defineStore('weather', {
    state: (): WeatherStoreData => ({ weatherList: [] }),
    getters: {
        getWeatherList: (store) => {
            const days: number[] = [];
            const filtered = store.weatherList.filter((weather) => {
                const date = new Date(weather.dt_txt);

                if (!days.includes(date.getDay())) {
                    days.push(date.getDay());
                    return true;
                } else return false;
            });
            return filtered;
        },
        getByDate(store) {
            return (date: Date) => {
                let dayCount = 0;
                return store.weatherList.filter((weather) => {
                    const currentDate = new Date(weather.dt_txt);
                    if (
                        currentDate.getDay() === date.getDay() &&
                        dayCount < 5
                    ) {
                        dayCount = dayCount + 1;
                        return true;
                    }

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
