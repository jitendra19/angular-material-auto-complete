import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'autocomplete-filter-example',
  templateUrl: 'autocomplete-filter-example.html',
  styleUrls: ['autocomplete-filter-example.css'],
})
export class AutocompleteFilterExample implements OnInit {
  myControl = new FormControl();
  namesControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  allNames: string[] = ['Sam', 'Samuel', 'Joey', 'Carla'];
  filteredOptions: Observable<string[]>;
  filteredNames: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

     this.filteredNames = this.namesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterNames(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterNames(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allNames.filter(option => option.toLowerCase().includes(filterValue));
  }
}

