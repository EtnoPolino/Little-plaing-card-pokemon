import { MonsterType } from "../utils/monster.utils";

export interface IMonster {
	id?: number;
	name: string;
	hp: number;
	image: string;
	type: MonsterType;
	figureCaption: string;
	attackName: string;
	attackStrength: number;
	attackDescription: string;
}
