import RoomConfig from "haxball-types/RoomConfig";

export const roomConfig: RoomConfig = {
    roomName: 'My Room',
    playerName: undefined,
    password: undefined,
    maxPlayers: 16,
    public: true,
    geo: { code: '', lat: 0, lon: 0 },
    token: window.localStorage.getItem('headlessToken') as string,
    noPlayer: true,
};