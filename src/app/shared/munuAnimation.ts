import {animate, state, style, transition, trigger} from '@angular/animations';

const menuAnim = [
  trigger('menuAnim', [
    state('hidden', style({transform: 'scale(0)', opacity: '0'})),
    state('show', style({transform: 'scale(1)', opacity: '1'})),
    transition(':enter',[style({transform: 'scale(0)', opacity: '0'}), animate(100,  style({transform: 'scale(1)', opacity: '1'}))]),
    transition(':leave', [animate(100, style({transform: 'scale(0)', opacity: '0'}))])
  ])
];

export default menuAnim;
