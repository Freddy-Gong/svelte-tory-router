import { writable } from "svelte/store";
export const params = writable({});
export const tag = writable({ component: null })
export const globalGuard = writable({})