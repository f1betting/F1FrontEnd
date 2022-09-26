export interface NextRace {
	season: number,
	round: number
}

export interface Bet {
	p1: string,
	p2: string,
	p3: string,
	points: number,
	round: number,
	season: number,
	username: string,
	raceName: string
}

export interface Driver {
	code: string,
	dateOfBirth: string,
	driverId: string,
	familyName: string,
	givenName: string,
	nationality: string,
	permanentNumber: number,
	url: string
}

interface Constructor {
	constructorId: string,
	url: string,
	nam: string,
	nationality: string,
}

export interface raceResult {
	number: number,
	position: number,
	positionText: string,
	points: number,
	Driver: Driver
	Constructor: Constructor
}
