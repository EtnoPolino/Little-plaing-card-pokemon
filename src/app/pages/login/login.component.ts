import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { Credentials, LoginService } from "../../services/login/login.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../../model/user.model";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [MatButtonModule, MatInputModule, ReactiveFormsModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
})
export class LoginComponent implements OnDestroy {
	private formBuilder = inject(FormBuilder);
	private loginService = inject(LoginService);
	private router = inject(Router);

	invalidCredentials = false;

	private loginSubscription: Subscription | null = null;

	loginFormGroup = this.formBuilder.group({
		username: ["", [Validators.required]],
		password: ["", [Validators.required]],
	});

	ngOnDestroy(): void {
		this.loginSubscription?.unsubscribe();
	}

	login() {
		this.loginSubscription = this.loginService
			.login(this.loginFormGroup.value as Credentials)
			.subscribe({
				next: (result: User | null | undefined) => {
					this.navigateHome();
				},
				error: (error) => {
					this.invalidCredentials = true;
				},
			});
	}

	private navigateHome() {
		this.router.navigate(["home"]);
	}
}
