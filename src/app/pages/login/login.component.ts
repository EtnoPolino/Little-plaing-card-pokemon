import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [MatButtonModule, MatInputModule, ReactiveFormsModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
	private formBuilder = inject(FormBuilder);
	invalidCredentials = false;

	loginFormGroup = this.formBuilder.group({
		username: ["", [Validators.required]],
		password: ["", [Validators.required]],
	});

	ngOnInit(): void {
		throw new Error("Method not implemented.");
	}

	login() {}
}
