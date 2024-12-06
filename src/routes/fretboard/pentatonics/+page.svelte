<script lang="ts">
	import { ToneColors } from "$lib/colors";
	import {
		MajorPentatonicMelodicInterval,
		MinorPentatonicMelodicInterval,
		Pentatonic,
	} from "$lib/pentatonic";
	import { MajorMode, MinorMode, Scale } from "$lib/scale";
	import {
		AllNotes,
		DefaultTuning,
		NoteToString,
		NoteValue,
		GuitarString,
	} from "$lib/string";
	import Note from "../../Note.svelte";

	let fret_size = 24;

	let key = NoteValue.C;
	let current_scale = new Scale(key, MajorMode);
	let notes = AllNotes;

	const strings = DefaultTuning;

	const modes = [
		{
			mode: MajorMode,
			name: "Major",
			pentatonic: MajorPentatonicMelodicInterval,
		},
		{
			mode: MinorMode,
			name: "Minor",
			pentatonic: MinorPentatonicMelodicInterval,
		},
	];

	let currentMode = modes[0];

	let fretboard: number[] = [];
	let currentPentatonic = new Pentatonic(
		new Scale(key, currentMode.mode),
		MajorPentatonicMelodicInterval,
	);

	$: {
		fretboard = [];
		for (let i = 0; i <= fret_size; i++) {
			fretboard.push(i);
		}
		current_scale = new Scale(key, currentMode.mode);

		currentPentatonic = new Pentatonic(
			current_scale,
			currentMode.pentatonic,
		);
	}

	function inPentatonic(note: NoteValue) {
		return currentPentatonic.inScale(note) !== -1;
	}

	function getColor(string: GuitarString, fret: number) {
		return ToneColors[
			currentPentatonic.inScale(string.getNoteAt(fret).note)
		];
	}
</script>

<section class="p-4 flex flex-col space-y-4">
	<div class="flex flex-row items-center space-x-2">
		<label for="fre_size">Number of frets:</label>
		<input
			class="bg-[#2F4F4F] border-sky-50"
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
				<option value={note}
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
				<option value={mode}>{mode.name}</option>
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
							quality={currentPentatonic.melodicIntervals}
							scale={currentPentatonic}
							note={string.getNoteAt(
								fret,
							)}
						/>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</section>
