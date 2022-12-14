import { defineStore } from "pinia";
import { JWTPayload } from "jose";

export const useUserStore = defineStore("UserStore", {
    state: (): userState => {
        return {
            token: "",
            id: {
                picture: ""
            },
            userdata: {
                username: "",
                uuid: "",
                points: 0
            },
            guest: false
        };
    }
});

interface userState {
    token: string,
    id: FinalJWTPayload,
    userdata: userData,
    guest: boolean
}

interface userData {
    username: string,
    uuid: string,
    points?: number
}

interface FinalJWTPayload extends JWTPayload {
    picture?: string
}
