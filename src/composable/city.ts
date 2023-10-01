import countryService from 'src/services/country-service';
import { useCountriesStore } from 'stores/countries-store';
import { useCountry } from './country';
import { watch, ref } from 'vue';

const countriesStore = useCountriesStore();
const { country } = useCountry();

const getCities = (countryName: string) => {
    countryService.getCities(countryName).then((res) => {
        if (res) countriesStore.setCities(res);
    });
};

const city = ref('');

watch(country, () => {
    city.value = '';
    getCities(country.value);
});

export function useCities() {
    return { getCities, city };
}
