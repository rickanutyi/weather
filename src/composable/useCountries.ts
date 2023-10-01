import countryService from 'src/services/country-service';
import { useCountriesStore } from 'src/stores/countries-store';

const countriesStore = useCountriesStore();

const getCountries = () => {
    countryService.getCountries().then((res) => {
        if (res) {
            const arrayOfCountries = res.map((country) => country.name);
            countriesStore.setCountries(arrayOfCountries);
        }
    });
};

const getCities = (countryName: string) => {
    countryService.getCities(countryName).then((res) => {
        if (res) countriesStore.setCities(res);
    });
};

export function useCountries() {
    return { getCountries, getCities };
}
