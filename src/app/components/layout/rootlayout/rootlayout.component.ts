import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-rootlayout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ContainerComponent],
  templateUrl: './rootlayout.component.html',
  styleUrl: './rootlayout.component.scss',
})
export class RootlayoutComponent {}
