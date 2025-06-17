import { Component, computed, inject, model, signal } from "@angular/core";
import { Monster } from "../../model/monster";
import { MonsterService } from "../../services/monster/monster.service";
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
	selector: "app-monster-list",
	standalone: true,
	imports: [PlayingCardComponent, SearchBarComponent, CommonModule],
	templateUrl: "./monster-list.component.html",
	styleUrl: "./monster-list.component.css",
})
export class MonsterListComponent {
	//monsters = model<Monster[]>([]); //un signal, je veux recalculer mes monstres.

	private monsterService = inject(MonsterService);
	private router = inject(Router);
	monsters = toSignal(this.monsterService.getAllMonsters()); //on convertit notre observable en signal
	search = model(""); //un signal

	searchMonstersResponse = computed(() => {
		const monsterFiltered =
			this.monsters()?.filter((monster) => monster.name.toLowerCase().includes(this.search())) ??
			[]; //si il est undifined, onr etourne un tableau vide.
		return monsterFiltered;
	});

	/*
	selectedMonsterIndex = signal(1);
	selectedMonster = computed(() => {
		return this.monsters()?[this.selectedMonsterIndex()]
	}); */ //ne marche pas.

	addMonster() {
		this.router.navigate(["monster/"]);
	}

	openMonster(monster: Monster) {
		this.router.navigate(["monster/", monster.id]);
	}
}
