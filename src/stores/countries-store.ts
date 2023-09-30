import { defineStore } from 'pinia';

interface CountriesStore {
    countries: string[];
    selectedCountry: null | string;
    cities: string[];
}

export const useCountriesStore = defineStore('countries', {
    state: () =>
        ({
            countries: [],
            selectedCountry: null,
            cities: [],
        } as CountriesStore),
    getters: {
        getCountries: (state) => state.countries,
        getSelectedCountry: (state) => state.selectedCountry,
        getCities: (store) => store.cities,
    },
    actions: {
        setCountries(countries: string[]) {
            this.countries = countries;
        },
        setSelectedCountry(country: string) {
            this.selectedCountry = country;
        },
        setCities(cities: string[]) {
            this.cities = cities;
        },
    },
});
