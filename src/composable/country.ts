import { ref } from 'vue';
import countryService from 'src/services/country-service';
import { useCountriesStore } from 'stores/countries-store';
import { Notify } from 'quasar';
const countriesStore = useCountriesStore();
const country = ref('Kyrgyzstan');

const getCountries = () => {
    countryService
        .getCountries()
        .then((res) => {
            if (res?.length) {
                const arrayOfCountries = res.map((country) => country.name);
                countriesStore.setCountries(arrayOfCountries);
            } else {
                Notify.create({
                    type: 'negative',
                    message: 'Не удалось загрузить список Стран',
                });
            }
        })
        .catch(() => {
            Notify.create({
                type: 'negative',
                message: 'Не удалось загрузить список Стран',
            });
        });
};

export function useCountry() {
    return { getCountries, country };
}
