import { Component, computed, effect, model, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PlayingCardComponent } from "./components/playing-card/playing-card.component";
import { Monster } from "./model/monster";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { MonsterType } from "./utils/monster.utils";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    PlayingCardComponent,
    SearchBarComponent,
    CommonModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  monsters!: Monster[];
  search = model(""); //un signal

  searchMonstersResponse = computed(() => {
    const monsterFiltered = this.monsters.filter((monster) =>
      monster.name.toLowerCase().includes(this.search())
    );
    return monsterFiltered;
  });

  selectedMonsterIndex = signal(1);
  selectedMonster = computed(() => {
    return this.monsters[this.selectedMonsterIndex()];
  });

  constructor() {
    this.monsters = [];
    const monster1 = new Monster();
    monster1.name = "pik";
    monster1.hp = 100;
    monster1.figureCaption = "N° 111";
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.name = "Dragofeu";
    monster2.image =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";
    monster2.type = MonsterType.WATER;
    monster2.hp = 200;
    monster2.figureCaption = "N° 222";
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.name = "Pikachu";
    monster3.image =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";
    monster3.type = MonsterType.ELECTRIC;
    monster3.hp = 300;
    monster3.figureCaption = "N° 333";
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.name = "Salameche";
    monster4.image =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";
    monster4.type = MonsterType.FIRE;
    monster4.hp = 400;
    monster4.figureCaption = "N° 333";
    this.monsters.push(monster4);
  }
}
