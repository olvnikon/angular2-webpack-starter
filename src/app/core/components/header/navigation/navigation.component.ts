import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import template from './navigation.component.html';
import { Router, NavigationEnd, ActivatedRoute, UrlSegment } from '@angular/router';
import { NavLink, Course } from '../../../entities';
import { CourseService } from '../../../services';

@Component({
  template,
  selector: 'header-nav',
  styles: [require('./navigation.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  public breadcrumbs: NavLink[] = [];

  constructor(private router: Router,
              private ref: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute,
              private courseService: CourseService) {
  }

  public ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this.breadcrumbs = [...this.refreshedBreadcrumbs];
        this.ref.markForCheck();
      });

    this.courseService.courseObservable
      .subscribe((course: Course) => {
        if (course) {
          this.breadcrumbs = [...this.breadcrumbs, { caption: course.name, isActive: true }];
          this.ref.markForCheck();
        }
      });
  }

  private get refreshedBreadcrumbs() {
    const breadcrumbs: NavLink[] = [{ caption: 'Home', url: '/' }];
    const urlSegments = this.activatedRoute.root.firstChild.snapshot.url;

    if (this.pathContains(urlSegments, 'login')) {
      breadcrumbs.push({ caption: 'Login', isActive: true });
    } else if (this.pathContains(urlSegments, 'courses')) {
      const isEdit = this.pathContains(urlSegments, 'edit');
      const isAdd = this.pathContains(urlSegments, 'new');
      breadcrumbs.push({ caption: 'Courses', url: '/courses', isActive: !isEdit && !isAdd });

      if (isAdd) {
        breadcrumbs.push({ caption: 'Add new', isActive: true });
      }
    }

    return breadcrumbs;
  }

  private pathContains(urlSegments: UrlSegment[], contains): boolean {
    return urlSegments.some(urlSegment => urlSegment.path === contains);
  }
}
