<script lang="ts">
	import { ToneColors } from "$lib/colors";
	import {
		DegreeToString,
		GenerateQuality,
		MajorMode,
		MinorMode,
		Mode,
		ModeValues,
		Scale,
	} from "$lib/scale";
	import { playNote } from "$lib/sound_player";
	import {
		AllNotes,
		DefaultTuning,
		NoteToString,
		NoteValue,
	} from "$lib/string";
	import Note from "../../Note.svelte";

	let fret_size = 23;

	let key = NoteValue.C;
	let current_scale = new Scale(key, MajorMode);

	const strings = DefaultTuning;

	let notes = AllNotes;

	const modes = [
		{
			mode: MajorMode,
			name: "Ionian (Major)",
			quality: GenerateQuality(ModeValues.Ionian),
		},
		{
			mode: Mode.get(ModeValues.Dorian),
			name: "Dorian",
			quality: GenerateQuality(ModeValues.Dorian),
		},
		{
			mode: Mode.get(ModeValues.Phrygian),
			name: "Phrygian",
			quality: GenerateQuality(ModeValues.Phrygian),
		},
		{
			mode: Mode.get(ModeValues.Lydian),
			name: "Lydian",
			quality: GenerateQuality(ModeValues.Lydian),
		},
		{
			mode: Mode.get(ModeValues.Mixolydian),
			name: "Mixolydian",
			quality: GenerateQuality(ModeValues.Mixolydian),
		},
		{
			mode: MinorMode,
			name: "Aeolian (Minor)",
			quality: GenerateQuality(ModeValues.Aeolian),
		},
		{
			mode: Mode.get(ModeValues.Locrian),
			name: "Locrian",
			quality: GenerateQuality(ModeValues.Locrian),
		},
	];

	let currentMode = modes[0];

	let currentQuality = modes[0].quality;

	let fretboard: number[] = [];

	let degreeToString = (index: number) => {
		return DegreeToString(index, currentQuality[index]);
	};

	$: {
		fretboard = [];
		for (let i = 0; i <= fret_size; i++) {
			fretboard.push(i);
		}
		current_scale = new Scale(key, currentMode.mode);
		currentQuality = currentMode.quality;

		degreeToString = (index: number) => {
			return DegreeToString(index, currentQuality[index]);
		};
	}
</script>

<section class="p-4 flex flex-col space-y-4">
	<div class="flex flex-row items-center space-x-2">
		<label for="fre_size">Number of frets:</label>
		<input
			class="bg-default border-sky-50"
			type="number"
			bind:value={fret_size}
			min="0"
			max="30"
		/>
		<input type="range" bind:value={fret_size} min="0" max="30" />
		<label for="key">Key:</label>
		<select
			name="key"
			id="key"
			bind:value={key}
			class="bg-[#2F4F4F]"
		>
			{#each notes as note}
				<option value={note} class="bg-[#2F4F4F]"
					>{NoteToString(note)}</option
				>
			{/each}
		</select>
		<label for="mode">Mode:</label>
		<select
			name="mode"
			id="mode"
			bind:value={currentMode}
			class="bg-[#2F4F4F]"
		>
			{#each modes as mode}
				<option
					value={mode}
					class="bg-[#2F4F4F] border-[#2F4F4F]"
					>{mode.name}</option
				>
			{/each}
		</select>
	</div>
	<table class="table-auto border-collapse border w-fit">
		<thead>
			{#each fretboard as fret}
				<td class="min-w-[5ch] border">{fret}</td>
			{/each}
		</thead>
		<tbody>
			{#each strings as string}
				<tr>
					{#each fretboard as fret}
						<Note
							quality={currentQuality}
							note={string.getNoteAt(
								fret,
							)}
							scale={current_scale}
						/>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</section>
