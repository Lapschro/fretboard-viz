<script lang="ts">
	import { ToneColors } from "$lib/colors";
	import { DegreeToString, type IScale, type Scale } from "$lib/scale";
	import { playNote } from "$lib/sound_player";
	import type { Note } from "$lib/string";

	export let scale: IScale;
	export let note: Note;
	export let quality: number[];

	let degreeToString = (index: number) => {
		return DegreeToString(index, quality[index]);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<td
	class="border"
	style={`
		background-color: ${scale.inScale(note.note) != -1 ? ToneColors[scale.inScale(note.note)] : "transparent"};
		color: ${scale.inScale(note.note) != -1 ? "black" : "white"};
	`}
	on:click={() => playNote(note)}
>
	{note.toString()}
	{scale.inScale(note.note) != -1
		? `(${degreeToString(scale.inScale(note.note))})`
		: ""}
</td>
