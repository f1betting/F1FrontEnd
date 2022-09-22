import { defineStore } from "pinia";

export const useBetStore = defineStore("BetStore", {
	state: (): { bet: bet } => {
		return {
			bet: {
				p1:       "",
				p2:       "",
				p3:       "",
				points:   -1,
				round:    -1,
				username: ""
			}
		};
	}
});

interface bet {
	p1: string,
	p2: string,
	p3: string,
	points: number,
	round: number,
	username: string
}
