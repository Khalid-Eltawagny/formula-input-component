import { Component, EventEmitter, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<i contenteditable = 'false'
    (click)='onClick()'
  >Field</i>`,
  styles: [
    `i { font-family: Lato; background: green; padding:3px; margin: 5px }`,
  ],
})
export class HelloComponent {
  @Input() name: string;

  fieldOrAttributeChanged = new EventEmitter();
  @HostBinding('attr.contenteditable')
  contenteditable = false;

  @HostBinding('attr.field-id')
  @Input()
  json: string;

  fun() {
    console.log(123);
  }

  onClick() {
    this.fieldOrAttributeChanged.emit({ num: '1', name: 'khalid' });
  }
}
