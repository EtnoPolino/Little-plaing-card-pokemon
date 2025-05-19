import { MonsterType } from "../utils/monster.utils";

export class Monster {
  name: string = "My Monster";
  hp: number = 40;
  image: string =
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";
  type: MonsterType = MonsterType.PLANT;
  figureCaption: string = "N°025 Monster";
  attackName: string = "Geo Impact";
  attackStrength: number = 60;
  attackDescription: string =
    "This is a long description of a monster capacity. Probably something to do with plants.";
}
