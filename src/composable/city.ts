import countryService from 'src/services/country-service';
import { useCountriesStore } from 'stores/countries-store';
import { useCountry } from './country';
import { watch, ref } from 'vue';
import { Notify } from 'quasar';
const countriesStore = useCountriesStore();
const { country } = useCountry();
const city = ref('');

const getCities = (countryName: string) => {
    city.value = '';
    return countryService
        .getCities(countryName)
        .then((res) => {
            if (res.length) countriesStore.setCities(res);
            else {
                countriesStore.setCities([]);
                Notify.create({
                    type: 'negative',
                    message: 'Не удалось загрузить список городов',
                });
            }
        })
        .catch((err) => {
            countriesStore.setCities([]);
            Notify.create({
                type: 'negative',
                message: 'Не удалось загрузить список городов',
            });
        });
};

// watch(country, () => {
//     city.value = '';
//     getCities(country.value);
// });

export function useCities() {
    return { getCities, city };
}
