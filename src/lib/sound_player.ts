import { NoteValue, Note } from "./string";

export function NoteValueToHertz(note: Note) {
	const a4 = Note.get(NoteValue.A, 4)

	return (440 * Math.pow(2, a4.distance(note) / 12))
}

export function playNote(note: Note, timeInSeconds?: number, volume_value?: number) {
	const audioContext = new AudioContext()

	const oscillator = audioContext.createOscillator()
	const volume = audioContext.createGain();

	oscillator.connect(volume)
	volume.connect(audioContext.destination)

	volume.gain.value = volume_value ?? 0.1

	oscillator.type = 'sine'
	oscillator.frequency.setValueAtTime(NoteValueToHertz(note), audioContext.currentTime)
	oscillator.start()
	oscillator.stop(audioContext.currentTime + (timeInSeconds ?? 0.5))
}
