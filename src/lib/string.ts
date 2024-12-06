export enum NoteValue {
	A = 0,
	As,
	B,
	C,
	Cs,
	D,
	Ds,
	E,
	F,
	Fs,
	G,
	Gs,
}

export const AllNotes = [
	NoteValue.C,
	NoteValue.Cs,
	NoteValue.D,
	NoteValue.Ds,
	NoteValue.E,
	NoteValue.F,
	NoteValue.Fs,
	NoteValue.G,
	NoteValue.Gs,
	NoteValue.A,
	NoteValue.As,
	NoteValue.B
]

export function NoteToString(n: NoteValue) {
	switch (n) {
		case NoteValue.C:
			return "C"
		case NoteValue.Cs:
			return "C#"
		case NoteValue.D:
			return "D"
		case NoteValue.Ds:
			return "D#"
		case NoteValue.E:
			return "E"
		case NoteValue.F:
			return "F"
		case NoteValue.Fs:
			return "F#"
		case NoteValue.G:
			return "G"
		case NoteValue.Gs:
			return "G#"
		case NoteValue.A:
			return "A"
		case NoteValue.As:
			return "A#"
		case NoteValue.B:
			return "B"
	}
}

export function AddIntervalToNote(note: NoteValue, interval: number) {
	const res = ((note + (interval % TOTAL_NOTES) + TOTAL_NOTES) % TOTAL_NOTES) as NoteValue
	return res
}

export class Note {
	note: NoteValue
	octave: number

	static notes: { [key: string]: Note } = {}

	private constructor(note: NoteValue, octave: number) {
		this.note = note
		this.octave = octave
	}

	static get(note: NoteValue, octave: number) {
		if (!!!Note.notes[`${NoteToString(note)}${octave}`]) {
			Note.notes[`${NoteToString(note)}${octave}`] = new Note(note, octave)
		}

		return Note.notes[`${NoteToString(note)}${octave}`]
	}

	addInterval(interval: number) {
		const note = AddIntervalToNote(this.note, interval) as NoteValue
		const octave = this.octave + Math.floor((this.note + interval) / TOTAL_NOTES)

		return Note.get(note, octave)
	}

	distance(note: Note) {
		return (-this.octave + note.octave) * TOTAL_NOTES + (-this.note + note.note)
	}

	toString() {
		return `${NoteToString(this.note)}${this.octave}`
	}
}

export const TOTAL_NOTES = 12

export class GuitarString {
	nut: Note;

	public constructor(nut_note: NoteValue, octave: number) {
		this.nut = Note.get(nut_note, octave);
	}

	public getNoteAt(fret: number) {
		return this.nut.addInterval(fret)
	}

	public getNoteAtString(fret: number) {
		return NoteToString(this.getNoteAt(fret).note)
	}
}

export const DefaultTuning = [
	new GuitarString(NoteValue.E, 4),
	new GuitarString(NoteValue.B, 4),
	new GuitarString(NoteValue.G, 3),
	new GuitarString(NoteValue.D, 3),
	new GuitarString(NoteValue.A, 3),
	new GuitarString(NoteValue.E, 2),
];
