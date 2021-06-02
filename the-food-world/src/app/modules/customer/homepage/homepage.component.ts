import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Food } from 'src/app/models/Food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  foods: Food[];
  foodName: null;
  currentFood: null;
  sortAndSearchForm: FormGroup;
  sortCriteria: any;
  searchByCategoryForm: FormGroup;
  foodCategoryId: any;

  page = 1;
  count = 0;
  pageSize = 9;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.sortCriteria = ["foodTimePost", "desc"];

    this.retrieveFoods();

    this.sortAndSearchForm = new FormGroup({
      sortBy: new FormControl("1"),
      searchBy: new FormControl(null)
    });

    this.searchByCategoryForm = new FormGroup({
      foodCategoryId : new FormControl(null)
    });
  }

  getRequestParams(foodName, page, pageSize, sortCriteria, foodCategoryId) {
    let params = {};

    if (foodName != null && foodName != '') {
      params[`foodName`] = foodName;
    }

    if (page) {
      params[`page`] = page-1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    if(sortCriteria){
      params[`sortCriteria`] = sortCriteria;
    }

    if(foodCategoryId){
      params[`categoryId`] = foodCategoryId;
    }

    return params;
  }

  retrieveFoods() {
    const params = this.getRequestParams(this.foodName, this.page, this.pageSize, this.sortCriteria, this.foodCategoryId);

    this.foodService.getAllFoods(params)
      .subscribe(
        response => {
          if(response){
            this.foods = response.foods;
            this.count = response.totalItems;
          }else{
            this.foods = null;
          }
          
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event) {
    window.scrollTo(0,500);
    this.page = event;
    this.retrieveFoods();
  }

  searchAndSort(){
    this.getSortCriteria();
    this.foodName = this.sortAndSearchForm.get('searchBy').value;

    this.retrieveFoods();
  }

  sort(){
    this.getSortCriteria();

    this.retrieveFoods();
  }

  getSortCriteria(){
    let tempSortValue = this.sortAndSearchForm.get('sortBy').value;

    switch(tempSortValue){
      case "2":
        this.sortCriteria = ["numberOrder", "desc"];
        break;
      case "3":
        this.sortCriteria = ["foodPrice", "desc"];
        break;
      case "4":
        this.sortCriteria = ["foodPrice", "asc"];
        break;
      default:
        this.sortCriteria = ["foodTimePost", "desc"];
        break;
    }
  }

  searchByCategory(){
    this.foodCategoryId = this.searchByCategoryForm.get('foodCategoryId').value;
    window.scrollTo(0,500);
    this.page = 1;
    this.retrieveFoods();
  }

}
