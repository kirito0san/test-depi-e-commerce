import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// Mock components for header, router-outlet, and footer
@Component({ selector: 'app-header', template: '' })
class MockHeaderComponent {}

@Component({ selector: 'router-outlet', template: '' })
class MockRouterOutletComponent {}

@Component({ selector: 'app-footer', template: '' })
class MockFooterComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerMock = {
      events: of(new NavigationEnd(0, '', '')),
    };

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockHeaderComponent,
        MockRouterOutletComponent,
        MockFooterComponent,
      ],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to router events on init', () => {
    spyOn(router.events, 'subscribe');
    component.ngOnInit();
    expect(router.events.subscribe).toHaveBeenCalled();
  });

  it('should scroll to top on NavigationEnd event', () => {
    spyOn(window, 'scrollTo');
    component.ngOnInit();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should contain header component', () => {
    const headerElement = fixture.debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
  });

  it('should contain router-outlet', () => {
    const routerOutletElement = fixture.debugElement.query(
      By.css('router-outlet')
    );
    expect(routerOutletElement).toBeTruthy();
  });

  it('should contain footer component', () => {
    const footerElement = fixture.debugElement.query(By.css('app-footer'));
    expect(footerElement).toBeTruthy();
  });
});
