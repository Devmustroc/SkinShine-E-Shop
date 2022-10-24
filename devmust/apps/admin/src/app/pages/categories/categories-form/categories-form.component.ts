import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService, Category} from "@devmust/products";
import {MessageService} from "primeng/api";


@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ],
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editmode = false;
    currentCategoryId : string;

  constructor(
      private messageService: MessageService,
      private formBuilder: FormBuilder,
      private categoriesService: CategoriesService,
      private location: Location,
      private router:Router,
      private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
          name: ['', Validators.required],
          icon: ['', Validators.required],
          color: ['#fff'],
      });

      this._checkEditMode();
  }


  onSubmit() {
      this.isSubmitted = true;
      if (this.form.invalid) {
          return;
      }
      const category: Category = {
          id: this.currentCategoryId,
          name: this.categoryForm['name'].value,
          icon: this.categoryForm['icon'].value,
          color: this.categoryForm['color'].value
      };
      if (this.editmode) {
          this._updateCategory(category)
      } else {
          this._addCategory(category)
      }
  }
  onCancle() {
      this.location.back();
  }

  private _addCategory(category: Category) {
      this.categoriesService.createCategory(category).subscribe({
          next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} is created` }),
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: `Category ${category.name} could not be created`}),
          complete: () => setTimeout(() => this.router.navigate(['/categories']), 2000)
      });
  }

  private _updateCategory(category: Category) {
      this.categoriesService.updateCategory(category).subscribe({
          next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} is updated `}),
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: `Category ${category.name} could not be updated`}),
          complete: () => setTimeout(() => this.router.navigate(['/categories']), 2000, ),
      });
  }

  private _checkEditMode() {
      this.route.params.subscribe(params => {
          if(params.id) {
              this.editmode = true;
              this.currentCategoryId = params.id;
              this.categoriesService.getCategory(params.id).subscribe(category => {
                  this.categoryForm.name.setValue(category.name);
                  this.categoryForm.icon.setValue(category.icon);
                  this.categoryForm.color.setValue(category.color);
              })
          }
      })
  }

  get categoryForm() {
      return this.form.controls
  }
}
