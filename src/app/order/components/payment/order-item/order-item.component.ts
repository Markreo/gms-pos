import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AnimationController} from "@ionic/angular";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemComponent implements OnInit {
  @Input() item;
  @ViewChild('divElement', {static: true}) divRef: ElementRef;

  constructor(private animationCtrl: AnimationController, private elRef: ElementRef) {
  }

  ngOnInit(): void {
    console.log('init', this.divRef);
    const a = this.animationCtrl.create()
      .addElement(this.divRef.nativeElement)
      .duration(500)
      .easing('ease-out')
      .fromTo('background', '#ffcb2a', 'transparent')
      .fromTo('boxShadow', '6px 2px 8px 0px #ffcb2a', '6px 2px 16px 0px transparent');
    a.play().then();

  }

  getOrderItemClass(item) {
    return {
      submitted: item.id && !item.waiting_qty && item.cooking_qty,
      'wait-supply': item.id && item.waiting_qty,
      done: item.id && !item.waiting_qty && !item.cooking_qty
    };
  }
}
