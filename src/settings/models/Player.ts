import { nanoid } from 'nanoid';
import { Optional } from 'utility-types';

export type Player = {
  id: string;
  name: string;
};

export const createPlayer = (override: Optional<Player, 'id'>): Player => ({ id: nanoid(), ...override });
