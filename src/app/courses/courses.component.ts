import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoursesService } from './courses.service';
import { Course } from './course';

@Component({
    selector: 'courses',
    styleUrls: ['./courses.component.css'],
    templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit {
    courses: Course[];

    constructor(private service: CoursesService, 
                private router: Router) { }

    ngOnInit() {
        this.getCourses();
    }

    public editCourse(course: Course) {
        this.router.navigate(['courses', 'edit', course.id]);
    }

    public deleteCourse(course: Course) {
        this.router.navigate(['courses', 'delete', course.id]);
    }

    public createCourse() {
        this.router.navigate(['courses', 'new']);
    }

    private getCourses() {
        this.service.getCourses().subscribe(
            courses => this.courses = courses
        );
    }
}