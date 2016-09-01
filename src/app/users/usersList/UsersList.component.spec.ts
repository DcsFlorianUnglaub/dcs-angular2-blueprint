import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, provideRoutes } from '@angular/router';
import { fromJS, Map } from 'immutable';

import { dummyRoutes } from '../../utils/testing';
import { UsersListComponent } from './UsersList.component';


describe('UsersListComponent', () => {

  let fixture: ComponentFixture<any>;
  let component: UsersListComponent;
  let element: HTMLElement;
  let userFixture: Map<string, any> = Map({ id: 42, name: 'Arthur Dent', username: 'arthur', email: 'arthur@dent.com', phone: '42 42' });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersListComponent
      ],
      imports: [
        RouterTestingModule,
        RouterModule
      ],
      providers: [
        provideRoutes(dummyRoutes)
      ]
    });

    TestBed.overrideComponent(UsersListComponent, {
      set: {
        template: require('./UsersList.tpl.html')
      }
    });

    TestBed.compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
  }));


  describe('loading', () => {

    it('shows the loading block on loading=true', () => {
      component.loading = true;
      fixture.detectChanges();

      const element = fixture.debugElement.nativeElement;
      expect(element.querySelector('div.loading-animation').innerText).toMatch('loading ...');
    });

    it('does not show the loading block on loading=false', () => {
      component.loading = false;
      fixture.detectChanges();

      const element = fixture.debugElement.nativeElement;
      expect(element.querySelector('div.loading-animation')).toBeNull();
    });

  });


  describe('users', () => {

    describe('with an empty list', () => {

      beforeEach(async(() => {
        component.users = fromJS([]);
        fixture.detectChanges();
        element = fixture.debugElement.nativeElement;
      }));

      it('renders the no users info if List is empty', () => {
        expect(component.usersAvailable).toBeFalsy();
        expect(element.querySelector('.no-users-info').innerHTML).toMatch('No users available');
      });

    });


    describe('with a filled list', () => {

      beforeEach(async(() => {
        component.users = fromJS([userFixture]);
        fixture.detectChanges();
        element = fixture.debugElement.nativeElement;
      }));

      it('does not render the no users info', () => {
        expect(component.usersAvailable).toBeTruthy();
        expect(element.querySelector('.no-users-info')).toBeNull();
      });

      it('renders the users list if List is not empty', () => {
        expect(component.usersAvailable).toBeTruthy();
        expect(element.querySelector('.no-users-info')).toBeNull();
      });

    });

  });


  describe('delete user', () => {

    beforeEach(async(() => {
      component.users = fromJS([userFixture]);
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement;
    }));

    it('fires the event if a delete link is clicked', (done) => {
      const deleteLink = <HTMLElement>element.querySelector('.delete-link');

      component.deleteUser.subscribe(user => {
        expect(userFixture.equals(user)).toBeTruthy();
        done();
      });

      deleteLink.click();
    });

  });

});
