import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Course } from './course';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class CoursesService { 

    private url = 'http://localhost:2403/my-courses';

    constructor(private http: Http) {}

    public getCourses(): Observable<Course[]> {
        let courses = this.http.get(this.url)
            .map(this.extractCourses)
        return courses;
    }

    public getCourse(id: string): Observable<Course> {
        let course = this.http.get(this.url + '/' + id)
            .map(this.extractCourse)
        return course;
    }

    public addCourse(course: Course) {
        return this.http.post(this.url, course)
    }

    public updateCourse(course: Course) {
        return this.http.put(this.url + '/' + course.id, course)
    }

    public deleteCourse(course: Course) {
        return this.http.delete(this.url + '/' + course.id)
    }

    private extractCourses(response: Response) {
        let res = response.json();
        let courses: Course[] = [];
        for (let i = 0; i < res.length; i++) {
            courses.push(new Course(res[i].id, res[i].name, res[i].description, res[i].duration, res[i].date));
        }
        return courses;
    }

    private extractCourse(response: Response) {
        let res = response.json();
        let course = new Course(res.id, res.name, res.description, res.duration, res.date);
        return course;
    }
}