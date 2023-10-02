import { WeatherType } from 'src/stores/types';

export const getImgName = (w: WeatherType) => {
    if (w === 'Clear') return 'sunny.png';
    if (w === 'Clouds') return 'partly_cloudy.png';
    return 'rain_s_cloudy.png';
};

export const showTempType = (temp: number, type: 'C' | 'F', fixed = 2) => {
    if (type === 'F') {
        const res = temp * (9 / 5) + 32;
        return `${res.toFixed(fixed)}°F`;
    } else return `${temp}°C`;
};

export const getDayName = (day: number, t: (key: string) => string) => {
    const days = [
        t('monday'),
        t('tuesday'),
        t('wednessday'),
        t('thurthday'),
        t('fridey'),
        t('saturday'),
        t('sunday'),
    ];
    return days[day];
};
