import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [NgIf, NgFor, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;

  menuItems = [
    { label: 'Dashboard', link: '/home', icon: 'hbi bi-speedometer2' },
    { label: 'Task List', link: '/tasks', icon: 'bi bi-list-task' },
    { label: 'Project List', link: '/projects', icon: 'bi bi-kanban' },
    { label: 'Time Tracking', link: '/time-tracking', icon: 'bi bi-clock' },
  ];

  constructor() {
    this.checkWindowSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkWindowSize();
  }

  private checkWindowSize() {
    this.isCollapsed = window.innerWidth < 992;
  }
}
