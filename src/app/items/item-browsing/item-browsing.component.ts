import {Component, OnInit} from '@angular/core';
import {Item} from '../items-service/data/Item';
import {ItemsService} from '../items-service/items.service';

@Component({
  selector: 'item-browsing',
  templateUrl: './item-browsing.component.html',
  styleUrls: ['./item-browsing.component.scss']
})
export class ItemBrowsingComponent implements OnInit {

  items: Item[];

  constructor(private itemService: ItemsService) { }

  ngOnInit() {
    this.itemService.getAllItems().subscribe({
      next: response => this.items = response.body,
      error: error => {}
    });
  }

}
