import { IMonster } from "../interfaces/monster.interface";
import { MonsterType } from "../utils/monster.utils";

export class Monster implements IMonster {
	id: number = -1;
	name: string = "My Monster";
	hp: number = 40;
	image: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";
	type: MonsterType = MonsterType.PLANT;
	figureCaption: string = "N°025 Monster";
	attackName: string = "Geo Impact";
	attackStrength: number = 60;
	attackDescription: string =
		"This is a long description of a monster capacity. Probably something to do with plants.";

	copy(): Monster {
		return Object.assign(new Monster(), this);
	}

	static fromJson(monsterJson: IMonster): Monster {
		return Object.assign(new Monster(), monsterJson);
	}

	toJson(): IMonster {
		// ce qu'on envoie au serveur
		const monsterJson: IMonster = Object.assign({}, this);
		delete monsterJson.id; //on ne veut pas envoyer l'ID
		return monsterJson;
	}
}
