import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { CoursesService } from '../courses/courses.service';
import { Course } from '../courses/course';

@Component({
    selector: 'add-edit-course',
    styleUrls: ['./add-edit-course.component.css'],
    templateUrl: './add-edit-course.component.html'
})

export class AddEditCourse implements OnInit {
    currentCourse: Course;
    addEditForm: FormGroup;

    constructor(private service: CoursesService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router) { }

    ngOnInit() {
        this.buildForm();
        this.getCourseFromRoute();
    }

    public onSubmit(addEditForm: FormGroup) {
        this.currentCourse.name = addEditForm.value.name;
        this.currentCourse.description = addEditForm.value.description;
        this.currentCourse.date = addEditForm.value.date;
        this.currentCourse.duration = addEditForm.value.duration;


        if (this.currentCourse.id) {
            this.service.updateCourse(this.currentCourse)
                .subscribe(
                () => this.goBack()
                );
        } else {
            this.service.addCourse(this.currentCourse)
                .subscribe(
                () => this.goBack()
                );
        }
    }

    public goBack() {
        this.router.navigate(['/courses']);
    }

    private getCourseFromRoute() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id = params['id'];
            if (id) {
                this.service.getCourse(id).subscribe(
                    course => {
                        this.currentCourse = course;
                        this.addEditForm.patchValue(this.currentCourse);
                    }
                );
            }
            else {
                this.currentCourse = new Course(null, null, null, null, null);
                this.addEditForm.patchValue(this.currentCourse);
            }
        });
    }

    private buildForm() {
        this.addEditForm = this.fb.group({
            name: ['', [Validators.required, Validators.pattern('^[A-Za-z А-Яа-яЁё 0-9 \s]+$')]],
            description: ['', [Validators.required, Validators.pattern('^[A-Za-z А-Яа-яЁё 0-9 \s]+$')]],
            date: ['', [Validators.required, Validators.pattern('[0-9]{2}\.[0-9]{2}\.[0-9]{4}')]],
            duration: ['', [Validators.required, Validators.pattern('[0-9]{1,5}')]]
        });
    }
}