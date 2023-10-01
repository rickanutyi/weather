import weatherService from 'src/services/weather-service';
import { useWeatherStore } from 'src/stores/weather-store';

import { ref } from 'vue';

const weatherStore = useWeatherStore();
const isLoading = ref(false);

export const getWeather = (city: string) => {
    isLoading.value = false;

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
            }
        })
        .catch((err) => weatherStore.setWeatherList([]))
        .finally(() => (isLoading.value = false));
};

export function useWeather() {
    return { isLoading, getWeather };
}
