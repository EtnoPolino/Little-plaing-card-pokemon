import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle,
} from "@angular/material/dialog";

@Component({
	selector: "app-delete-monster-confirmation-dialog",
	standalone: true,
	imports: [MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatButtonModule],
	templateUrl: "./delete-monster-confirmation-dialog.component.html",
	styleUrl: "./delete-monster-confirmation-dialog.component.css",
})
export class DeleteMonsterConfirmationDialogComponent {}
