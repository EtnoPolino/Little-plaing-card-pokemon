import {
  Component,
  EventEmitter,
  input,
  Input,
  model,
  output,
  Output,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./search-bar.component.html",
  styleUrl: "./search-bar.component.css",
})
export class SearchBarComponent {
  /*@Input() searchInput = "Initial";
  @Output() searchChange = new EventEmitter<string>();
  @Output() searchButtonClicked = new EventEmitter();*/
  /* Angular 17 
  searchInput = input<string>("Initial");
  searchChange = output<string>();
  searchButtonClicked = output();

  searchClick() {
    this.searchButtonClicked.emit();
  }

  updateSearch(value: string) {
    this.searchChange.emit(value);
  } */

  /* depuis ANGULAR 17.2 */
  searchInput = model<string>("Initial"); // le signal model va créer un seachInput standard mais va aussi créer un output du nom de "searchInputChange" avec le model
  searchButtonClicked = output();

  searchClick() {
    this.searchButtonClicked.emit();
  }
}
