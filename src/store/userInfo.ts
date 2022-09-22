import { defineStore } from "pinia";
import { JWTPayload }  from "jose";

export const useUserStore = defineStore("UserStore", {
	state: (): userState => {
		return {
			token:    "",
			id:       {},
			userdata: {
				username: "",
				uuid:     "",
				points:   0,
			}
		};
	}
});

interface userState {
	token: string
	id: JWTPayload,
	userdata: userData
}

interface userData {
	username: string,
	uuid: string,
	points: number
}
