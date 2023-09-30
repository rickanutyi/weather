import { api } from 'boot/axios';
import { Weather } from 'src/stores/types';

type BaseResponse<T> = {
    cod: string;
    message: number | string;
    cnt: number;
    list: T[];
};
export default {
    getWeatherByCity(city: string, lang: 'ru' | 'en' = 'ru') {
        const url = '';
        return api
            .get<BaseResponse<Weather>>(url, {
                params: {
                    q: city,
                    lang: lang,
                    units: 'metric',
                    appid: '42c86fedafa859132192ba49496ee723',
                },
            })
            .then((res) => {
                if (res.status === 200) return res.data.list;
                console.error(String(res.data));
                return [];
            })
            .catch((err) => console.error(err));
    },
};
