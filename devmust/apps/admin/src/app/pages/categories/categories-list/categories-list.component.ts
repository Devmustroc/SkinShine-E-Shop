// import module
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CategoriesService, Category} from "@devmust/products";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];
// constructor
    constructor(
        private categoriesService: CategoriesService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
    }

    ngOnInit(): void {
       this._getCategories()
    }
// delete Categories
    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this category?', header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe({
                    next: () => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is deleted'}),
                    error: () => this.messageService.add({severity: 'error', summary: 'Error', detail: 'Category could not be deleted'}),
                    complete: () => setTimeout(() => this.router.navigate(['/categories']), 2000)
                });
            }
        });

    }
// update Category
    updateCategory (categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`)
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }
}
