import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss']
})
export class KnowledgeComponent implements OnInit {
  imageObject: Object[];

  constructor() {
    this.imageObject = [
      {
        image: '../content/images/java.jpg',
        thumbImage: '../content/images/java.jpg',
        alt: 'Java 8',
        title: null
      },
      {
        image: '../content/images/rsz_spring.jpg',
        thumbImage: '../content/images/rsz_spring.jpg',
        alt: 'Spring',
        title: null
      }
    ];
  }

  ngOnInit() {}
}
