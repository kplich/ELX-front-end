import {Component, OnInit} from '@angular/core';
import {Item, ItemCategory} from '../items-service/data/Item';
import {ItemsService} from '../items-service/items.service';

@Component({
  selector: 'item-browsing',
    templateUrl: './item-browsing.component.html',
    styleUrls: ['./item-browsing.component.scss']
})
export class ItemBrowsingComponent implements OnInit {

    items: Item[];
    categories: ItemCategory[];

    constructor(private itemService: ItemsService) {
    }

    async ngOnInit() {
        try {
            this.categories = (await this.itemService.getCategories().toPromise()).body;
            console.log('categories');
        } catch (error) {
            // TODO: handle error
        }

        try {
            this.items = (await this.itemService.getAllItems().toPromise()).body;
            console.log('items');
        } catch (error) {
            // TODO: handle error
        }
    }


}
