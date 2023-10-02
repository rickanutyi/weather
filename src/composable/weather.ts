import { ref } from 'vue';
import weatherService from 'src/services/weather-service';
import { WeatherStore, useWeatherStore } from 'src/stores/weather-store';
import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';

const isLoading = ref(false);

isLoading.value = false;

const fetchWeather = (weatherStore: WeatherStore, city: string) => {
    if (!city) {
        weatherStore.setWeatherList([]);
        return;
    }
    isLoading.value = true;

    weatherService
        .getWeatherByCity(city)
        .then((res) => {
            if (res?.length) {
                const days: number[] = [];
                const filtered = res.filter((weather) => {
                    const date = new Date(weather.dt_txt);

                    if (!days.includes(date.getDay())) {
                        days.push(date.getDay());
                        return true;
                    } else return false;
                });
                weatherStore.setWeatherList(filtered);
            } else {
                weatherStore.setWeatherList([]);
                Notify.create({
                    type: 'negative',
                    message: `Ошибка при получении данных о погоде по городу ${city}.`,
                });
            }
        })
        .catch((err) => {
            weatherStore.setWeatherList([]);
            Notify.create({
                type: 'negative',
                message: `Ошибка при получении данных о погоде по городу ${city}.`,
            });
        })
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
