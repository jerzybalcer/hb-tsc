import { Position } from './Position';
import { Team } from './Team';

export interface Player {
    id: number;
    name: string;
    team: Team;
    admin: boolean;
    position: Position;
    auth: string;
    conn: string;
};