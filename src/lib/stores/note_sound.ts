import { writable } from "svelte/store";

const note_duration_s = writable(0.3)
const volume = writable(0.5)

export default {
	note_duration_s: note_duration_s,
	volume
}
