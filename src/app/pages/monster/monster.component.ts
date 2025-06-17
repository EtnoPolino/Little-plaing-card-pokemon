import { Component, computed, inject, OnDestroy, OnInit, signal } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, of, Subscription, switchMap } from "rxjs";
import { MonsterType } from "../../utils/monster.utils";
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { Monster } from "../../model/monster";
import { MonsterService } from "../../services/monster/monster.service";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDialog } from "@angular/material/dialog";
import { DeleteMonsterConfirmationDialogComponent } from "../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component";

@Component({
	selector: "app-monster",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		PlayingCardComponent,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
	],
	templateUrl: "./monster.component.html",
	styleUrl: "./monster.component.css",
})
export class MonsterComponent implements OnInit, OnDestroy {
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private formBuilder = inject(FormBuilder);
	private monsterService = inject(MonsterService);
	private readonly dialog = inject(MatDialog);

	/*name = new FormControl("", [Validators.required]);
  hp = new FormControl(0, [Validators.required, Validators.min(1), Validators.max(200)]);*/
	pokemonFormGroup = this.formBuilder.group({
		name: ["", [Validators.required]],
		image: ["", [Validators.required]],
		type: [MonsterType.ELECTRIC, [Validators.required]],
		hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
		figureCaption: ["", [Validators.required]],
		attackName: ["", [Validators.required]],
		attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
		attackDescription: ["", [Validators.required]],
	});

	monsterId = -1;

	private subscriptions: Subscription = new Subscription();

	monster: Monster = Object.assign(new Monster(), this.pokemonFormGroup.value);
	monsterTypes = Object.values(MonsterType);

	ngOnInit(): void {
		//A chaque changement d'une valeur de notre formGroup il faut que cela se reflete dans notre object monster
		const formValueSubscription = this.pokemonFormGroup.valueChanges.subscribe((data) => {
			this.monster = Object.assign(new Monster(), data);
		});
		this.subscriptions.add(formValueSubscription);

		const routeSubscription = this.route.params
			.pipe(
				switchMap((params) => {
					//switchMap prend un observable pour retourner un observable
					if (params["id"]) {
						this.monsterId = parseInt(params["id"]);
						return this.monsterService.getById(this.monsterId);
					}
					return of(null);
				})
			)
			.subscribe((monsterFound) => {
				if (monsterFound) {
					this.monster = monsterFound;
					this.pokemonFormGroup.patchValue(this.monster);
				}
			});

		this.subscriptions.add(routeSubscription);
	} // fin ng

	ngOnDestroy(): void {
		this.subscriptions?.unsubscribe();
	}

	next() {
		let nextId = this.monsterId || 0;
		nextId++;
		this.router.navigate(["/monster/" + nextId]);
	}

	submit(event: Event) {
		event.preventDefault();
		let saveObservable = null;
		if (this.monsterId === -1) {
			// si on cree un monstre, l'id aura encore sa valeur par défaut.
			saveObservable = this.monsterService.addMonster(this.monster);
		} else {
			this.monster.id = this.monsterId;
			saveObservable = this.monsterService.updateMonster(this.monster);
		}
		const saveSubscription = saveObservable.subscribe((_) => {
			this.navigateBack();
		});

		this.subscriptions.add(saveSubscription);
	}

	isFieldValid(smthg: string) {
		const formControl = this.pokemonFormGroup.get(smthg);
		return formControl?.invalid && (formControl?.dirty || formControl?.touched);
	}

	onFileChange(event: any) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.pokemonFormGroup.patchValue({
					image: reader.result as string,
				});
			};
		}
	}

	navigateBack() {
		this.router.navigate(["/home"]);
	}

	deleteMonster() {
		const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialogComponent);
		dialogRef
			.afterClosed()
			.pipe(
				filter((confirmation) => confirmation),
				switchMap((_) => this.monsterService.deleteMonster(this.monsterId))
			)
			.subscribe((comfirmation) => {
				this.navigateBack();
			});
	}
}
