import { AddIntervalToNote, NoteToString, NoteValue } from "./string";

export enum Quality {
	Major,
	Minor,
	Diminished
}

export enum ModeValues {
	Ionian = 0,
	Dorian,
	Phrygian,
	Lydian,
	Mixolydian,
	Aeolian,
	Locrian
}

export const ModeCount = 7

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
	static modes: { [key: number]: Mode } = {}
	intervals: number[]

	private constructor(intervals: number[]) {
		this.intervals = intervals
	}

	public static get(value: ModeValues) {
		if (!Mode.modes[value]) {
			Mode.modes[value] = new Mode(GenerateMode(value))
		}

		return Mode.modes[value]
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

export const BaseInterval = [2, 2, 1, 2, 2, 2, 1]
export const MajorMode = Mode.get(ModeValues.Ionian)
export const MinorMode = Mode.get(ModeValues.Aeolian)

export const BaseQuality = [Quality.Major, Quality.Minor, Quality.Minor, Quality.Major, Quality.Major, Quality.Minor, Quality.Diminished]

export function GenerateInterval(mode: ModeValues, interval: number[]) {
	const intervals = []

	for (let i = 0; i < BaseInterval.length; i++) {
		intervals.push(interval[(i + mode) % interval.length])
	}

	return intervals
}

export function GenerateMode(mode: ModeValues) {
	return GenerateInterval(mode, BaseInterval)
}

export function GenerateQuality(mode: ModeValues) {
	return GenerateInterval(mode, BaseQuality)
}

export function DegreeToString(degree: number, quality: Quality) {
	let res = ''

	switch (degree) {
		case 0: res += 'i'
			break;
		case 1: res += 'ii'
			break;
		case 2: res += 'iii'
			break;
		case 3: res += 'iv'
			break;
		case 4: res += 'v'
			break;
		case 5: res += 'vi'
			break;
		case 6: res += 'vii'
			break;
		case 7: res += 'viii'
			break;
	}

	switch (quality) {
		case Quality.Major: res = res.toUpperCase()
			break;
		case Quality.Minor: res = res.toLowerCase()
			break;
		case Quality.Diminished: res += '°'
			break;
	}

	return res;
}
