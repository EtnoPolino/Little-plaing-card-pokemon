import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { User } from "../../model/user.model";
import { map, Observable, tap } from "rxjs";

export interface Credentials {
	username: string;
	password: string;
}

@Injectable({
	providedIn: "root",
})
export class LoginService {
	private http = inject(HttpClient);
	private baseURL = "http://localhost:8080";

	//undefined = on ne sait pas si l'utilisateur est loggé ou non
	//null = on sait que l'utilisateur n'est pas loggé
	//User = l'user est loggé.
	user = signal<User | null | undefined>(undefined);

	constructor() {}

	login(credentials: Credentials): Observable<User | null | undefined> {
		return this.http.post(this.baseURL + "/sessions/login/", credentials).pipe(
			tap((result: any) => {
				localStorage.setItem("token", result["token"]);
				const user = Object.assign(new User(), result["user"]);
				this.user.set(user);
			}),
			map((result: any) => {
				return this.user();
			})
		);
	}

	getUsers(): Observable<User | null | undefined> {
		return this.http.get(this.baseURL + "/sessions/me/").pipe(
			tap((result: any) => {
				const user = Object.assign(new User(), result);
				this.user.set(user);
			}),
			map((result: any) => {
				return this.user();
			})
		);
	}

	logout(): Observable<null> {
		return this.http.get(this.baseURL + "/sessions/logout/").pipe(
			tap((result: any) => {
				localStorage.removeItem("token");
				this.user.set(null);
			})
		);
	}
}
