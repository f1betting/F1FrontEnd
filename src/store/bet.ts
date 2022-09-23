import { defineStore } from "pinia";
import { Bet }         from "../typings/typings";

export const useBetStore = defineStore("BetStore", {
	state: (): { bet: Bet } => {
		return {
			bet: {
				p1:       "",
				p2:       "",
				p3:       "",
				points:   -1,
				round:    -1,
				username: "",
				raceName: ""
			}
		};
	}
});


