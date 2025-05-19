export enum MonsterType {
  PLANT = "plant",
  ELECTRIC = "electric",
  FIRE = "fire",
  WATER = "water",
}

export interface IMonsterProperties {
  imageUrl: string;
  color: string;
}

export const MonsterTypeProperties: { [key: string]: IMonsterProperties } = {
  [MonsterType.PLANT]: {
    imageUrl:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    color: "rgba(135, 255, 124)",
  },

  [MonsterType.ELECTRIC]: {
    imageUrl:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    color: "rgba(255, 255, 104)",
  },

  [MonsterType.FIRE]: {
    imageUrl:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    color: "rgba(255, 104, 104)",
  },

  [MonsterType.WATER]: {
    imageUrl:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    color: "rgba(118, 234, 255)",
  },
};
