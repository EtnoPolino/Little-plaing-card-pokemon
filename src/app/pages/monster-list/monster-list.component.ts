import { Component, computed, inject, model, signal } from "@angular/core";
import { Monster } from "../../model/monster";
import { MonsterService } from "../../services/monster/monster.service";
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-monster-list",
  standalone: true,
  imports: [PlayingCardComponent, SearchBarComponent, CommonModule],
  templateUrl: "./monster-list.component.html",
  styleUrl: "./monster-list.component.css",
})
export class MonsterListComponent {
  monsters = model<Monster[]>([]); //un signal, je veux recalculer mes monstres.
  search = model(""); //un signal
  monsterService = inject(MonsterService);

  searchMonstersResponse = computed(() => {
    const monsterFiltered = this.monsters().filter((monster) =>
      monster.name.toLowerCase().includes(this.search())
    );
    return monsterFiltered;
  });

  selectedMonsterIndex = signal(1);
  selectedMonster = computed(() => {
    return this.monsters()[this.selectedMonsterIndex()];
  });

  constructor() {
    this.monsters.set(this.monsterService.getAllMonsters());
  }

  addMonster() {
    const genericMonster = new Monster();
    this.monsterService.addMonster(genericMonster);
    this.monsters.set(this.monsterService.getAllMonsters());
  }
}
