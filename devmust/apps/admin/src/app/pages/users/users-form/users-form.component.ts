import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
import {User, UsersService} from "@devmust/users";

declare const require

@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styles: []
})
export class UsersFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editmode = false;
    currentUserId: string;
    countries = [];

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private location: Location,
        private route: ActivatedRoute,
        private router:Router,
    ) {}

    ngOnInit(): void {
        this._initUserForm();
        this._getCountries();
        this._checkEditMode();
    }

    private _getCountries() {
        countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
        this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry => {
            return {
                id : entry[0],
                name: entry[1]
            }
        });
        console.log(this.countries)
    }

    private _initUserForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            isAdmin: [false],
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            country: ['']
        });
    }

    private _addUser(user: User) {
        this.usersService.createUser(user).subscribe({
            next: () => this.messageService.add({severity: 'success', summary: 'Success', detail: `User ${user.name} is Created`}),
            error: () => this.messageService.add({severity: 'error', summary: 'Error', detail: `User ${user.name} could not be Created`}),
            complete: () => setTimeout(() => this.router.navigate(['/users']), 2000)
        });
    }

    private _updateUser(user: User) {
        this.usersService.updateUser(user).subscribe({
            next: () => this.messageService.add({severity: 'success', summary: 'Success', detail: `User ${user.name} is updated `}),
            error: () => this.messageService.add({severity: 'error', summary: 'Error', detail: `User ${user.name} could not be updated`}),
            complete: () => setTimeout(() => this.router.navigate(['/users']), 2000)
        });
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editmode = true;
                this.currentUserId = params.id;
                this.usersService.getUser(params.id).subscribe((user) => {
                    this.userForm.name.setValue(user.name);
                    this.userForm.email.setValue(user.email);
                    this.userForm.phone.setValue(user.phone);
                    this.userForm.isAdmin.setValue(user.isAdmin);
                    this.userForm.street.setValue(user.street);
                    this.userForm.apartment.setValue(user.apartment);
                    this.userForm.zip.setValue(user.zip);
                    this.userForm.city.setValue(user.city);
                    this.userForm.country.setValue(user.country);
                    this.userForm.password.setValidators([]);
                    this.userForm.password.updateValueAndValidity();
                });
            }
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const user: User = {
            id: this.currentUserId,
            name: this.userForm.name.value,
            email: this.userForm.email.value,
            phone: this.userForm.phone.value,
            isAdmin: this.userForm.isAdmin.value,
            street: this.userForm.street.value,
            apartment: this.userForm.apartment.value,
            zip: this.userForm.zip.value,
            city: this.userForm.city.value,
            country: this.userForm.country.value
        };
        if (this.editmode) {
            this._updateUser(user);
        } else {
            this._addUser(user);
        }
    }

    onCancle() {
        this.location.back();
    }

    get userForm() {
        return this.form.controls;
    }
}
