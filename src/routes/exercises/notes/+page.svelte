<script lang="ts">
	import { playNote } from "$lib/sound_player";
	import {
		AllNotes,
		DefaultTuning,
		NoteToString,
		NoteValue,
		GuitarString
	} from "$lib/string";

	let key = NoteValue.C;
	let strings = DefaultTuning;
	let fret_size = 11;
	let notes = AllNotes;

	let selected_notes: string[] = $state([])

	function reset() {
		selected_notes = [];
	}

	const addToList = (string: String, fret: number) => {
		const key = `${string.nut.toString()}-${fret}`;

		if (selected_notes.some((x) => x == key)) {
			selected_notes = selected_notes.filter((x) => x != key);
		} else {
			selected_notes = [...selected_notes, key];
		}
	};

	function checkInList(string: String, fret: number) {
		const key = `${string.nut.toString()}-${fret}`;
		return selected_notes.some((x) => x == key);
	}

	function correctNote(string: String, fret: number) {
		return string.getNoteAt(fret).note == key;
	}

	let key_notes = $derived.by(()=>{
		let key_notes = new Set<string>();
		for (let i = 0; i < strings.length; i++) {
			const string = strings[i];

			for (let j = 0; j <= fret_size; j++) {
				if (string.getNoteAt(j).note == key) {
					key_notes.add(
						`${string.nut.toString()}-${j}`,
					);
				}
			}
		}

		return key_notes;
	})
	let found_all = $derived(Array.from(key_notes).every((x : string) => selected_notes.some((y) => y == x)));

	function randomizeKey() {
		key = AllNotes[Math.floor(Math.random() * AllNotes.length)];
		reset();
	}
	let fretboard = $derived.by( ()=>{
		let fretboard = [];
		for (let i = 0; i <= fret_size; i++) {
			fretboard.push(i);
		}

		return fretboard
	});
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
			on:change={() => {
				reset();
			}}
		>
			{#each notes as note}
				<option value={note} class="bg-[#2F4F4F]"
					>{NoteToString(note)}</option
				>
			{/each}
		</select>
		<button on:click={reset}>Reset</button>
		<button on:click={randomizeKey}>Random</button>
		<div>
			{`${found_all ? "Found all notes!" : "Some notes are missing!"}`}
		</div>
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
							class={`border 
${checkInList(string, fret) && correctNote(string, fret) ? "bg-green-500" : ""}
${checkInList(string, fret) && !correctNote(string, fret) ? "bg-red-500" : ""}
`}
							style={`
								
							`}
							on:click={() => {
								addToList(
									string,
									fret,
								);
								playNote(
									string.getNoteAt(
										fret,
									),
								);
							}}
						>
							{checkInList(
								string,
								fret,
							)
								? string
										.getNoteAt(
											fret,
										)
										.toString()
								: "_"}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</section>
