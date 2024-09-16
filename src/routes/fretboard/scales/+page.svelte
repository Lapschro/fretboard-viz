<script lang="ts">
	import { ToneColors } from "$lib/colors";
	import { MajorMode, MinorMode, Scale } from "$lib/scale";
	import { AllNotes, Note, NoteToString, String } from "$lib/string";

	let fret_size = 24;

	let key = Note.C;
	let current_scale = new Scale(key, MajorMode);

	let notes = AllNotes;

	const strings = [
		new String(Note.E),
		new String(Note.B),
		new String(Note.G),
		new String(Note.D),
		new String(Note.A),
		new String(Note.E),
	];

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
			class="bg-gray-800 border-sky-50"
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
			class="bg-gray-800"
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
			class="bg-gray-800"
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
						<td
							class="border"
							style={`
								background-color: ${current_scale.inScale(string.get_note_at(fret)) != -1 ? ToneColors[current_scale.inScale(string.get_note_at(fret))] : "transparent"};
								color: ${current_scale.inScale(string.get_note_at(fret)) != -1 ? "black" : "white"};

							`}
						>
							{string.get_note_at_string(
								fret,
							)}
							{current_scale.inScale(
								string.get_note_at(
									fret,
								),
							) != -1
								? `(${current_scale.inScale(
										string.get_note_at(
											fret,
										),
									)})`
								: ""}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</section>
