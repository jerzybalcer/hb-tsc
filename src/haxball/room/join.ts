import { Player } from '../model/Player';
import { HaxballRoom } from './room';

HaxballRoom.onPlayerJoin = (player: Player) => {
    HaxballRoom.setPlayerAdmin(player.id, true);

    sendWelcomeMessage(player);
};

const sendWelcomeMessage = (player: Player) => {
    HaxballRoom.sendAnnouncement(`Welcome ${player.name}!`);
};