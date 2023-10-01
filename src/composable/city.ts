import countryService from 'src/services/country-service';
import { useCountriesStore } from 'stores/countries-store';
import { useCountry } from './country';
import { watch, ref } from 'vue';

const countriesStore = useCountriesStore();
const { country } = useCountry();
const city = ref('');

const getCities = (countryName: string) => {
    city.value = '';
    countryService
        .getCities(countryName)
        .then((res) => {
            if (res) countriesStore.setCities(res);
            else countriesStore.setCities([]);
        })
        .catch((err) => {
            countriesStore.setCities([]);
        });
};

watch(country, () => {
    city.value = '';
    getCities(country.value);
});

export function useCities() {
    return { getCities, city };
}
