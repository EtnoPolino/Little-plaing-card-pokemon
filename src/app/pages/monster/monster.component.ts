import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MonsterType } from "../../utils/monster.utils";
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { Monster } from "../../model/monster";

@Component({
	selector: "app-monster",
	standalone: true,
	imports: [ReactiveFormsModule, PlayingCardComponent],
	templateUrl: "./monster.component.html",
	styleUrl: "./monster.component.css",
})
export class MonsterComponent implements OnInit, OnDestroy {
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private formBuilder = inject(FormBuilder);

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

	monsterId = signal<number | undefined>(undefined);
	private routeSubscription: Subscription | null = null;
	private formValueSubscription: Subscription | null = null;

	monster: Monster = Object.assign(new Monster(), this.pokemonFormGroup.value);
	monsterTypes = Object.values(MonsterType);

	ngOnInit(): void {
		this.formValueSubscription = this.pokemonFormGroup.valueChanges.subscribe((data) => {
			this.monster = Object.assign(new Monster(), data);
		});

		this.route.params.subscribe((params) => {
			this.monsterId.set(params["id"] ? parseInt(params["id"]) : undefined);
		});
	}

	ngOnDestroy(): void {
		this.routeSubscription?.unsubscribe();
		this.formValueSubscription?.unsubscribe();
	}

	next() {
		let nextId = this.monsterId() || 0;
		nextId++;
		this.router.navigate(["/monster/" + nextId]);
	}

	submit(event: Event) {
		event.preventDefault();
		console.log(this.pokemonFormGroup.value);
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
}
