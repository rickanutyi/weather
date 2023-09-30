import { defineStore } from 'pinia';

interface TempStoreData {
    type: 'F' | 'C';
}
export const useTempStore = defineStore('temp', {
    state: () =>
        ({
            type: 'C',
        } as TempStoreData),
    getters: {
        getTempType: (store) => store.type,
    },
    actions: {
        setTempType(type: 'F' | 'C') {
            this.type = type;
        },
    },
});
