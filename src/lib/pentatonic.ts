import type { IScale, Scale } from "./scale";
import type { NoteValue } from "./string";

export class Pentatonic implements IScale {
	scale: Scale
	melodicIntervals: number[]
	notes: NoteValue[]

	public constructor(scale: Scale, melodicIntervals: number[]) {
		this.scale = scale
		this.melodicIntervals = melodicIntervals;
		this.notes = []

		for (let i = 0; i < melodicIntervals.length; i++) {
			this.notes.push(scale.getNoteMelodicInterval(melodicIntervals[i]))
		}
	}
	public inScale(note: NoteValue): number {
		if (this.notes.some(x => x === note)) {
			return this.scale.inScale(note)
		}
		return -1
	}
}

export const MajorPentatonicMelodicInterval = [0, 2, 3, 5, 6]
export const MinorPentatonicMelodicInterval = [0, 3, 4, 5, 7]
