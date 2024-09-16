export enum Note {
	C = 0,
	Cs,
	D,
	Ds,
	E,
	F,
	Fs,
	G,
	Gs,
	A,
	As,
	B
}

export const AllNotes = [
	Note.C,
	Note.Cs,
	Note.D,
	Note.Ds,
	Note.E,
	Note.F,
	Note.Fs,
	Note.G,
	Note.Gs,
	Note.A,
	Note.As,
	Note.B
]

export function NoteToString(n: Note) {
	switch (n) {
		case Note.C:
			return "C"
		case Note.Cs:
			return "C#"
		case Note.D:
			return "D"
		case Note.Ds:
			return "D#"
		case Note.E:
			return "E"
		case Note.F:
			return "F"
		case Note.Fs:
			return "F#"
		case Note.G:
			return "G"
		case Note.Gs:
			return "G#"
		case Note.A:
			return "A"
		case Note.As:
			return "A#"
		case Note.B:
			return "B"
	}
}

export const TOTAL_NOTES = 12

export class String {
	nut: Note;

	public constructor(nut_note: Note) {
		this.nut = nut_note;
	}

	public get_note_at(fret: number) {
		return (this.nut + fret) % TOTAL_NOTES
	}

	public get_note_at_string(fret: number) {
		return NoteToString(this.get_note_at(fret))
	}
}
