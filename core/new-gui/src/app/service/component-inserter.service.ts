import { ComponentFactoryResolver, ComponentRef, Injectable, Inject, ViewContainerRef, ViewRef, Injector, StaticProvider } from '@angular/core';
import { v4 as uuid } from 'uuid';

interface ComponentType {
  apply: any;
  call: any;
  bind: any;
  prototype: any;
  length: any;
  arguments: any;
  caller: any;
  name: any;

  new (...args: any[]): unknown;
  [Symbol.hasInstance](value: any): boolean;
}


@Injectable({
  providedIn: 'root',
})
export class ComponentInserterService {
  constructor( @Inject(ComponentFactoryResolver) private cFR: ComponentFactoryResolver) {
  }

  public injectComponent<T>(component: ComponentType, vCR: ViewContainerRef, providers: StaticProvider[] = []): ComponentRef<T> {
    let resolvePromise: (value: ComponentRef<T>) => void;

    const componentRefPromise = new Promise<ComponentRef<T>>(( resolve, reject ) => {
      resolvePromise = resolve;
    }); // componentRef of new component

    providers.push({provide: 'ComponentRefPromise', useValue: componentRefPromise});
    const injector = Injector.create({providers: providers, parent: vCR.injector});
    const factory = this.cFR.resolveComponentFactory(component);
    const componentRef = <ComponentRef<T>> vCR.createComponent(factory, undefined, injector);

    // @ts-ignore
    resolvePromise(componentRef);

    return componentRef;
  }

  public removeComponent(componentRef: ViewRef, vCR: ViewContainerRef): void {
    const componentIndex = vCR.indexOf(componentRef);
    vCR.remove(componentIndex);
  }
}


