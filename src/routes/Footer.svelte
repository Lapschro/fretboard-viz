<script lang="ts">
	import volume_settings from "$lib/stores/note_sound";

	const { note_duration_s, volume } = volume_settings;
</script>

<div class="flex flex-row items-center justify-center gap-2">
	<div class="flex flex-row space-x-2">
		<label for="note_duration">Note duration(s):</label>
		<span
			><input
				type="number"
				min="0.1"
				max="5"
				step="0.01"
				bind:value={$note_duration_s}
				class="bg-inherit"
			/>s</span
		>
		<input
			id="note_duration"
			name="note_duration"
			type="range"
			min="0.1"
			step="0.01"
			max="5"
			bind:value={$note_duration_s}
		/>
	</div>
	<div class="flex flex-row space-x-2">
		<label for="volume">Volume:</label>
		<span>{$volume}</span>
		<input
			type="range"
			id="volume"
			name="range"
			min="0.1"
			max="1"
			step="0.1"
			bind:value={$volume}
		/>
	</div>
</div>
