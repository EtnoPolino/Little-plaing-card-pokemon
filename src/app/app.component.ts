import {
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PlayingCardComponent } from "./components/playing-card/playing-card.component";
import { Monster } from "./model/monster";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { CommonModule } from "@angular/common";
import { MonsterService } from "./services/monster/monster.service";

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
  monsterService = inject(MonsterService);

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
    this.monsters = this.monsterService.getAllMonsters();
  }
}
