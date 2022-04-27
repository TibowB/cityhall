import { defineStore } from 'pinia';
import { Region } from '../types/region';

export const useStore = defineStore('mainStore', {
  state: () => {
    return {
      regions: Array<Region>(),
    };
  },
});
