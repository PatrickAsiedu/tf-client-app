import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";

@Component({
  selector: 'app-maincontainer',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './maincontainer.component.html',
  styleUrl: './maincontainer.component.scss'
})
export class MaincontainerComponent {

}
