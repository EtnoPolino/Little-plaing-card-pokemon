import { Injectable } from "@angular/core";
import { Monster } from "../../model/monster";
import { MonsterType } from "../../utils/monster.utils";

@Injectable({
  providedIn: "root",
})
export class MonsterService {
  monsters: Monster[] = [];
  currentIndex: number = 1;

  constructor() {
    this.loadData();
  }

  private init() {
    this.monsters = [];

    const monster1 = new Monster();
    monster1.id = this.currentIndex++;
    monster1.name = "pik";
    monster1.hp = 100;
    monster1.figureCaption = "N° 111";
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.id = this.currentIndex++;
    monster2.name = "Dragofeu";
    monster2.image =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";
    monster2.type = MonsterType.WATER;
    monster2.hp = 200;
    monster2.figureCaption = "N° 222";
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.id = this.currentIndex++;
    monster3.name = "Pikachu";
    monster3.image =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";
    monster3.type = MonsterType.ELECTRIC;
    monster3.hp = 300;
    monster3.figureCaption = "N° 333";
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.id = this.currentIndex++;
    monster4.name = "Salameche";
    monster4.image =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";
    monster4.type = MonsterType.FIRE;
    monster4.hp = 400;
    monster4.figureCaption = "N° 333";
    this.monsters.push(monster4);
  }

  private save() {
    localStorage.setItem("monsters", JSON.stringify(this.monsters));
  }

  private loadData() {
    const monsterData = localStorage.getItem("monsters");
    if (monsterData) {
      this.monsters = JSON.parse(monsterData).map((monsterJson: any) =>
        Object.assign(new Monster(), monsterJson)
      );
      this.currentIndex = Math.max(
        ...this.monsters.map((monster) => monster.id)
      ); //je veux les valeurs
    } else {
      this.init();
      this.save();
    }
  }

  getAllMonsters(): Monster[] {
    return this.monsters.map((monster) => monster.copy());
  }

  getById(id: number): Monster | undefined {
    const monster = this.monsters.find((monster) => id === monster.id);
    return monster ? monster.copy() : undefined;
  }

  addMonster(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.currentIndex++;
    this.save();
    return monsterCopy;
  }

  updateMonster(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(
      (originalMonster) => monster.id === originalMonster.id
    );
    if (monsterIndex != -1) {
      this.monsters[monsterIndex] = monsterCopy.copy();
    }
    this.save();
    return monsterCopy;
  }

  deleteMonster(id: number): void {
    const monsterIndex = this.monsters.findIndex(
      (monster) => id === monster.id
    );
    if (monsterIndex != -1) {
      this.monsters.splice(monsterIndex, 1);
    }
    this.save();
  }
}
