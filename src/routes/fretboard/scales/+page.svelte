<script lang="ts">
	import { ToneColors } from "$lib/colors";
	import { MajorMode, MinorMode, Scale } from "$lib/scale";
	import {
		AllNotes,
		DefaultTuning,
		Note,
		NoteToString,
		NoteValue,
		String,
	} from "$lib/string";

	let fret_size = 23;

	let key = NoteValue.C;
	let current_scale = new Scale(key, MajorMode);

	const strings = DefaultTuning;

	let notes = AllNotes;

	const modes = [
		{ mode: MajorMode, name: "Major" },
		{ mode: MinorMode, name: "Minor" },
	];

	let currentMode = modes[0];

	let fretboard: number[] = [];
	$: {
		fretboard = [];
		for (let i = 0; i <= fret_size; i++) {
			fretboard.push(i);
		}
		current_scale = new Scale(key, currentMode.mode);
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
						<td
							class="border"
							style={`
								background-color: ${current_scale.inScale(string.getNoteAt(fret).note) != -1 ? ToneColors[current_scale.inScale(string.getNoteAt(fret).note)] : "transparent"};
								color: ${current_scale.inScale(string.getNoteAt(fret).note) != -1 ? "black" : "white"};

							`}
						>
							{string.getNoteAtString(
								fret,
							)}
							{current_scale.inScale(
								string.getNoteAt(
									fret,
								).note,
							) != -1
								? `(${current_scale.inScale(
										string.getNoteAt(
											fret,
										)
											.note,
									)})`
								: ""}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</section>
