import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {AuthorizationService} from '../authorization/authorization.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import menuAnim from '../shared/munuAnimation';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: menuAnim
})
export class AppbarComponent implements OnInit, OnChanges {

  constructor(
    public authorizationService: AuthorizationService,
  ) { }

  menuAnimState = 'hidden';
  isOpenMenu = false;
  onOpenMenu: any = () => {this.isOpenMenu = true; this.menuAnimState = 'show'};
  onCloseMenu: any = () => {this.isOpenMenu = false; this.menuAnimState = 'hidden'};

  logout: any = () => {
    this.onCloseMenu();
    this.authorizationService.logout();
  };

  @ViewChild('menuElement') insideElement;
  @ViewChild('menuButton') menuButton;
  @HostListener('document:click', ['$event.target'])

  public onClick(targetElement) {
    if (this.isOpenMenu === true) {
      const clickedInside = this.insideElement.nativeElement.contains(targetElement);
      const menuBtn = this.menuButton.nativeElement;
      if (clickedInside) {
        this.onCloseMenu();
      } else {
        if (targetElement !== menuBtn) {
          this.onCloseMenu();
        }
      }
    }
  }

  ngOnChanges() {
  }

  ngOnInit(): void {
  }

}
