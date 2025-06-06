import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { LoginService } from "../services/login/login.service";
import { catchError, map } from "rxjs";

export const isLoggedInGuard: CanActivateFn = (route, state) => {
	const loginService = inject(LoginService);
	const router = inject(Router);

	if (loginService.user() === undefined) {
		// l'utilisateur a toujours un token mais ça fait longtemps qu'il n'est plus co.
		return loginService.getUsers().pipe(
			map(() => {
				return true;
			}),
			catchError(() => router.navigate(["login"]))
		);
	}

	if (loginService.user() === null) {
		router.navigate(["login"]);
	}

	return true;
};
