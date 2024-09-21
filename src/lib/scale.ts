import { AddIntervalToNote, NoteToString, type NoteValue } from "./string";

export class Scale implements IScale {
	key: NoteValue
	mode: Mode
	notes: NoteValue[]

	public constructor(key: NoteValue, mode: Mode) {
		this.key = key
		this.mode = mode
		this.notes = []

		for (let i = 0; i < mode.intervals.length; i++) {
			this.notes.push(this.getNoteMelodicInterval(i))
		}
	}

	public getNoteMelodicInterval(interval: number) {
		const fret = this.mode.getInterval(interval)
		return AddIntervalToNote(this.key, fret)
	}

	public getNoteMelodicIntervalString(interval: number) {
		const fret = this.mode.getInterval(interval)
		return NoteToString(this.getNoteMelodicInterval(fret))
	}

	public inScale(note: NoteValue) {
		return this.notes.findIndex(x => x === note);
	}

}

export interface IScale {
	inScale(note: NoteValue): number
}


export class Mode {
	intervals: number[]

	public constructor(intervals: number[]) {
		this.intervals = intervals
	}

	public getInterval(interval: number) {
		interval = interval % this.intervals.length

		let res = 0;
		for (let i = 0; i < interval; i++) {
			res += this.intervals[i]
		}

		return res;
	}
}


export const MajorMode = new Mode([0, 2, 2, 1, 2, 2, 2, 1])
export const MinorMode = new Mode([0, 2, 1, 2, 2, 1, 2, 2])
