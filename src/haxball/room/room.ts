import { roomConfig } from './roomConfig';
import { HBInit } from "haxball-types";

declare const HBInit: HBInit;

export const HaxballRoom = HBInit(roomConfig);

HaxballRoom.setDefaultStadium("Big");
HaxballRoom.setScoreLimit(5);
HaxballRoom.setTimeLimit(0);