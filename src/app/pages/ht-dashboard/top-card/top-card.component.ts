import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ngx-top-card',
    templateUrl: './top-card.component.html',
    styleUrls: ['./top-card.component.scss'],
})
export class TopCardComponent implements OnInit {
    @Input() title: string;
    @Input() value: number;
    @Input() stillActive: number;

    constructor() {
    }

    ngOnInit() {
    }

}
