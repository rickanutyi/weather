import { ref } from 'vue';
import weatherService from 'src/services/weather-service';
import { WeatherStore, useWeatherStore } from 'src/stores/weather-store';
import { storeToRefs } from 'pinia';

const isLoading = ref(false);

isLoading.value = false;

const fetchWeather = (weatherStore: WeatherStore, city: string) => {
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

function getByDate(weatherStore: WeatherStore, date?: Date | null) {
    if (date) return weatherStore.getByDate(date);
    return [];
}

export function useWeather() {
    const weatherStore = useWeatherStore();
    const { weatherList } = storeToRefs(weatherStore);

    const getWeather = (city: string) => fetchWeather(weatherStore, city);
    const getWeatherByDate = (date?: Date | null) =>
        getByDate(weatherStore, date);

    return { isLoading, getWeather, getWeatherByDate, weatherList };
}
