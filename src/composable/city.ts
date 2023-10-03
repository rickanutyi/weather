import countryService from 'src/services/country-service';
import { useCountriesStore } from 'stores/countries-store';
import { ref } from 'vue';
import { Notify } from 'quasar';
const countriesStore = useCountriesStore();
const city = ref('Bishkek');

const getCities = (countryName: string) => {
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

export function useCities() {
    return { getCities, city };
}
