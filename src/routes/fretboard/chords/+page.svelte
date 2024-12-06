<script lang="ts">
	import {
		GenerateQuality,
		MajorMode,
		MinorMode,
		Mode,
		ModeValues,
		Scale,
	} from "$lib/scale";
	import {
		AllNotes,
		GuitarString,
		NoteToString,
		NoteValue,
	} from "$lib/string";

	import Note from "../../Note.svelte";

	let nutNotes: { note: NoteValue; octave: number }[] = $state([]);
	let strings: GuitarString[] = $derived(
		nutNotes.map((x) => new GuitarString(x.note, x.octave)),
	);

	let fret_size: number = $state(23);

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

	let currentMode = $state(modes[0]);

	let fretboard = $derived.by(() => {
		const f: number[] = [];
		for (let i = 0; i <= fret_size; i++) {
			f.push(i);
		}
		return f;
	});

	let currentQuality = $derived(currentMode.quality);

	const addNutNote = () => {
		nutNotes.push({ note: NoteValue.E, octave: 1 });
	};

	let currentMainNote = $state(NoteValue.E);

	let currentScale = $derived(
		new Scale(currentMainNote, currentMode.mode),
	);
</script>

<section>
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

	<div class="flex flex-row gap-4 px-4">
		<div class="flex flex-col justify-center">
			{#each strings as string, idx}
				<select
					name={string.nut.toString()}
					id={string.nut.toString()}
					onchange={(e) => {
						nutNotes[idx].note = parseInt(
							e!.currentTarget.value,
						);
					}}
					value={string.nut.note}
					class="bg-[#2F4F4F]"
				>
					{#each AllNotes as note}
						<option value={note}
							>{NoteToString(
								note,
							)}</option
						>
					{/each}
				</select>
			{/each}
		</div>

		<table class="px-6">
			<tbody>
				{#each strings as string}
					<tr>
						{#each fretboard as fret}
							<Note
								quality={currentQuality}
								scale={currentScale}
								note={string.getNoteAt(
									fret,
								)}
								onclick={(
									n,
								) => {
									currentMainNote =
										n;
								}}
							/>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<button
		onclick={() => {
			addNutNote();
		}}>Add note</button
	>
</section>
