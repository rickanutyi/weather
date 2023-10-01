import { ref } from 'vue';
import countryService from 'src/services/country-service';
import { useCountriesStore } from 'stores/countries-store';

const countriesStore = useCountriesStore();
const country = ref('');

const getCountries = () => {
    countryService.getCountries().then((res) => {
        if (res) {
            const arrayOfCountries = res.map((country) => country.name);
            countriesStore.setCountries(arrayOfCountries);
        }
    });
};

export function useCountry() {
    return { getCountries, country };
}
