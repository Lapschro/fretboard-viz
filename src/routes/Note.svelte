<script lang="ts">
	import { ToneColors } from "$lib/colors";
	import { DegreeToString, type IScale, type Scale } from "$lib/scale";
	import { playNote } from "$lib/sound_player";
	import type { Note, NoteValue } from "$lib/string";

	import note_settings from "$lib/stores/note_sound";
	import { onDestroy } from "svelte";

	export let scale: IScale;
	export let note: Note;
	export let quality: number[];

	export let onclick: ((n: NoteValue) => void) | null = null;

	let degreeToString = (index: number) => {
		return DegreeToString(index, quality[index]);
	};

	const { note_duration_s, volume } = note_settings;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<td
	class="border select-none"
	style={`
		background-color: ${scale.inScale(note.note) != -1 ? ToneColors[scale.inScale(note.note)] : "transparent"};
		color: ${scale.inScale(note.note) != -1 ? "black" : "white"};
	`}
	on:click={() => {
		playNote(note, $note_duration_s, $volume);
		if (onclick) {
			onclick(note.note);
		}
	}}
>
	{note.toString()}
	{scale.inScale(note.note) != -1
		? `(${degreeToString(scale.inScale(note.note))})`
		: ""}
</td>
