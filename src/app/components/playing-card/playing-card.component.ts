import {
  Component,
  computed,
  Input,
  input,
  InputSignal,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Monster } from "../../model/monster";
import { MonsterTypeProperties } from "../../utils/monster.utils";

@Component({
  selector: "app-playing-card",
  standalone: true,
  imports: [],
  templateUrl: "./playing-card.component.html",
  styleUrl: "./playing-card.component.css",
})
export class PlayingCardComponent {
  /* @Input() monster: Monster = new Monster(); */
  monster: InputSignal<Monster> = input(new Monster());

  /*monsterTypeIcon: string =
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png";*/
  /*backgroundColor: string = "rgba(255, 255, 104)"; */

  monsterTypeIcon = computed(() => {
    return MonsterTypeProperties[this.monster().type].imageUrl;
  });

  backgroundColor = computed(() => {
    return MonsterTypeProperties[this.monster().type].color;
  });
}
