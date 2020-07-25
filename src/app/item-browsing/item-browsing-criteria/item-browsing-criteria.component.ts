import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'item-browsing-criteria',
  templateUrl: './item-browsing-criteria.component.html',
  styleUrls: ['./item-browsing-criteria.component.scss']
})
export class ItemBrowsingCriteriaComponent implements OnInit {

  criteriaForm: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit() {
  }

}
