import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemsService} from '../items-service/items.service';
import {Item} from '../items-service/Item';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  item: Item = new Item({
    title: 'My new item for sale, very good!',
    description: 'This is the item, very good, very cheap, like new - buy immediately! Once-in-a-lifetime offer, you mustn\'t miss it! What will you say when your child says \'Why didn\'t you invest in Eastern Poland?\'?',
    price: 0.67,
    addedBy: 'kplich',
    added: new Date().toISOString(),
    category: 'Books',
    usedStatus: 'NEW',
    photoUrls: ['https://http.cat/200.jpg', 'https://http.cat/201.jpg', 'https://http.cat/207.jpg', 'https://ireland.apollo.olxcdn.com/v1/files/83xjf4xoe3do1-PL/image;s=1000x700']
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.paramMap.get('id');
  }

  get safePhotoUrls(): SafeUrl[] {
    return this.item.photoUrls.map(url => this.domSanitizer.bypassSecurityTrustUrl(url));
  }

}
