import { countryApi } from 'boot/axios';
import { Country } from 'src/stores/types';

type BaseResponse<T> = {
    data: T;
    error: boolean;
    msg: string;
};

export default {
    async getCountries() {
        const url = '/capital';
        return countryApi
            .get<BaseResponse<Country[]>>(url)
            .then((res) => {
                if (!res.data.error) return res.data?.data;
                console.error(String(res.data));
                return [];
            })
            .catch((err) => console.error(err));
    },
    async getCities(countryName: string) {
        const url = '/cities';
        return countryApi
            .post<BaseResponse<string[]>>(url, { country: countryName })
            .then((res) => {
                if (!res.data.error) return res.data?.data;
                console.error(String(res.data));
                return [];
            })
            .catch((err) => console.error(err));
    },
};
