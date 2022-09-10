import { HBInit } from "haxball-types";

declare const HBInit: HBInit;

export const HaxballRoom = HBInit({
	roomName: "My room",
	maxPlayers: 16,
	noPlayer: true
});

HaxballRoom.setDefaultStadium("Big");
HaxballRoom.setScoreLimit(5);
HaxballRoom.setTimeLimit(0);