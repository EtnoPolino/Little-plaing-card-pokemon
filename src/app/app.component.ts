import { Component, computed, effect, inject, model, OnDestroy, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { Router, RouterOutlet } from "@angular/router";
import { LoginService } from "./services/login/login.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, MatButtonModule, MatToolbar, MatIcon],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent implements OnDestroy {
	private router = inject(Router);
	loginService = inject(LoginService);

	private logoutSubscription: Subscription | null = null;

	logout() {
		this.logoutSubscription = this.loginService.logout().subscribe({
			next: () => {
				this.navigateToLogin();
			},
			error: (error) => {
				this.navigateToLogin();
			},
		});
	}

	ngOnDestroy(): void {
		this.logoutSubscription?.unsubscribe();
	}

	navigateToLogin() {
		this.router.navigate(["login"]);
	}

	navigateHome() {
		this.router.navigate(["home"]);
	}
}
