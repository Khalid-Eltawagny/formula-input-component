import {
  Component,
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injector,
  Input,
} from '@angular/core';
import { HelloComponent } from './hello.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input()
  Formula: string = '';

  CHILDS: string[] = [];
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  createComponent(component, componentProps?: object) {
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    (componentRef.instance as HelloComponent).json = '';
    (componentRef.instance as HelloComponent).fieldOrAttributeChanged.subscribe(
      (data) => console.log(data)
    );

    return componentRef;
  }

  attachComponent(componentRef: ComponentRef<unknown>, appendTo: Element) {
    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    this.appendItem(domElem);
    return;
  }

  fun(data) {
    console.log(data);
  }

  FormulaInputDiv: Element;
  onInsertField(): void {
    this.FormulaInputDiv = document.getElementById('formulaInput');
    (this.FormulaInputDiv as HTMLElement).focus();
    this.attachComponent(
      this.createComponent(HelloComponent),
      this.FormulaInputDiv
    );

    let selection = window.getSelection();
    let range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(this.FormulaInputDiv);
    range.collapse(false);
    selection.addRange(range);
    (this.FormulaInputDiv as HTMLElement).focus();
  }

  appendItem(el: Element) {
    let selection, range;
    selection = window.getSelection();
    range = selection.getRangeAt(0);
    range.deleteContents();
    let frag = document.createDocumentFragment(),
      node,
      lastNode;

    node = el;
    lastNode = frag.appendChild(node);

    range.insertNode(frag);

    // Preserve the selection
    if (lastNode) {
      range = range.cloneRange();
      range.setStartAfter(lastNode);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  onDeleteFormula(): void {
    this.FormulaInputDiv.innerHTML = '';
  }

  onFormulaItemClicked(data) {
    // show the pop-up with this data
  }

  public getFormula(): string {
    return this.Formula;
  }
}
