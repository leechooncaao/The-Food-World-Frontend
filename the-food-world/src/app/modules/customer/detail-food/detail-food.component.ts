import { CommentDTO } from './../../../models/CommentDTO';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/models/Account';
import { Food } from 'src/app/models/Food';
import { Rating } from 'src/app/models/Rating';
import { RatingInfo } from 'src/app/models/RatingInfo';
import { FoodService } from 'src/app/services/food.service';
import { RatingService } from 'src/app/services/rating.service';
import { CommentService } from 'src/app/services/comment.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

declare var $: any;

@Component({
  selector: 'app-detail-food',
  templateUrl: './detail-food.component.html',
  styleUrls: ['./detail-food.component.css']
})
export class DetailFoodComponent implements OnInit {
  food: Food;
  ratingInfo: RatingInfo;
  ratingForm: FormGroup;
  rating: Rating;
  listCommentDTO : CommentDTO[];
  fileMessageImage : string;
  imageUrlFromLocalForCreate : string;
  imageUrlFromLocalForEdit: string;
  imageFile : File;
  commentForm: FormGroup;
  editCommentForm: FormGroup;
  editingCommentId: number;
  deleteCommentId: number;
  account : Account = {
    accountId: 1,
    accountName: "leechoncaao",
    accountPassword: "$2y$12$O5l4LNddjCsTKD/EcsEmx.j9bLJKYIxzlJ5tj64QMJx26K6ZXrqX.",
    accountEmail: "lephuocthanhcao@gmail.com",
    accountStatus: 0,
    accountRegisterTime: "2021-05-16T00:39:00.000+00:00",
    accountLoginTime: "2021-05-16T01:39:00.000+00:00",
    customer: {
        customerId: 1,
        customerName: "Lê Phước Thanh Cao",
        customerPhone: "0777542581",
        customerBirthday: "1996-12-12T17:00:00.000+00:00",
        customerAvatar: "https://anhdep123.com/wp-content/uploads/2020/05/h%C3%ACnh-v%E1%BA%BD-m%C3%A8o-cute.jpg",
        customerAddress: "41b Mai Lão Bạng"
    }
  }
  loading = false;
  isShow = false;
  
  constructor(private foodService: FoodService,
              private activatedRoute: ActivatedRoute,
              private ratingService: RatingService,
              private commentService: CommentService,
              private storage: AngularFireStorage,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.getDetailFoodById();

    this.ratingForm = new FormGroup({
      ratingLevel: new FormControl(0)
    });

    this.commentForm = new FormGroup({
      commentId: new FormControl(null),
      commentContent: new FormControl(null),
      commentImage: new FormControl(null),
      food: new FormControl(null),
      account: new FormControl(this.account)
    });

    this.editCommentForm = new FormGroup({
      commentId: new FormControl(null),
      commentContent: new FormControl(null),
      commentImage: new FormControl(null),
      food: new FormControl(null),
      account: new FormControl(this.account)
    });

  }

  getDetailFoodById(){
    this.activatedRoute.params.subscribe(data => {
      this.foodService.getDetailFood(data.foodId).subscribe(foodDTO => {
        this.food = foodDTO.food;
        this.ratingInfo = foodDTO.ratingInfo;
        this.getRating(this.food.foodId, this.account.accountId);
        this.getListComment();
      })
    })
  }

  addOrUpdateRating(){
    
    this.rating.ratingLevel = this.ratingForm.get('ratingLevel').value;

    this.ratingService.addOrUpdateRating(this.rating).subscribe(data => {
      this.ratingService.getRatingInfo(this.food.foodId).subscribe(data => {
          this.ratingInfo = data;
      });
      
      this.rating = data;
    })
  }

  getRating(foodId: any, accountId: any){
    this.ratingService.getRating(foodId,accountId).subscribe(data => {
      if(data == null){
        this.rating = new Rating();
        this.rating.ratingLevel = 0;
        this.rating.account = this.account;
        this.rating.food = this.food;
      }else{
        this.rating = data;
      }

      this.ratingForm.get('ratingLevel').setValue(this.rating.ratingLevel);
    })
  }

  getListComment(){
    this.commentService.getListCommentByFoodId(this.food.foodId).subscribe(data => {
      this.listCommentDTO = data;
    })
  }

   // get url of image uploaded from local computer for creating
   getImageFromLocalForCreate(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileMessageImage = null;
      const file = event.target.files[0].name;
      if (file.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.imageUrlFromLocalForCreate = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);

        this.imageFile = event.target.files[0];
      }else{
        this.fileMessageImage = "Image extension must be .png or .jpeg/.jpg";

      }
    }
  }

  // get url of image uploaded from local computer for editing
  getImageFromLocalForEdit(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileMessageImage = null;
      const file = event.target.files[0].name;
      if (file.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.imageUrlFromLocalForEdit = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);

        this.imageFile = event.target.files[0];
      }else{
        this.fileMessageImage = "Image extension must be .png or .jpeg/.jpg";

      }
    }
  }

  // save image to firebase and get url-firebase to comment
  saveImagetoFirebaseForCreate() {
    return new Promise(resolve => {
      const name = this.imageFile.name;
      if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const fileRef = this.storage.ref(name);
        this.storage.upload(name, this.imageFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.commentForm.get('commentImage').setValue(url);
              resolve(1);
            });
          })).subscribe();
      }
    });
  }

  // save image to firebase and get url-firebase to comment
  saveImagetoFirebaseForEdit() {
    return new Promise(resolve => {
      const name = this.imageFile.name;
      if (name.match(/.*\.(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
        const fileRef = this.storage.ref(name);
        this.storage.upload(name, this.imageFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.editCommentForm.get('commentImage').setValue(url);
              resolve(1);
            });
          })).subscribe();
      }
    });
  }

  deleteCurrentImageForCreate(){
    this.imageUrlFromLocalForCreate = null;
  }

  deleteCurrentImageForEdit(){
    this.imageUrlFromLocalForEdit = null;
  }

  async createComment(){
    this.loading = true;
    this.commentForm.get('food').setValue(this.food);
    this.commentForm.get('account').setValue(this.account);

    if(this.imageUrlFromLocalForCreate){
      await this.saveImagetoFirebaseForCreate();
    }
    
    this.commentService.createComment(this.commentForm.value).subscribe(data => {
      this.commentForm.reset();
      this.imageUrlFromLocalForCreate = null;
      const newComment = new CommentDTO();
      newComment.commentId = data.commentId;
      newComment.commentContent = data.commentContent;
      newComment.commentImage = data.commentImage;
      newComment.commentTime = data.commentTime;
      newComment.accountId = data.account.accountId;
      newComment.customerAvatar = data.account.customer.customerAvatar;
      newComment.customerName = data.account.customer.customerName;
      newComment.foodId = data.food.foodId;
      newComment.ratingLevel = this.rating.ratingLevel;

      this.listCommentDTO.unshift(newComment);
      this.loading = false;
    })
  }

  toggleEditCommentForm(editCommentId: number, index: number){
    this.isShow = !this.isShow;
    if(this.isShow){
      $('#' + editCommentId).hide();
      $('#edit' + editCommentId).show();

      const currentCommentDTO = this.listCommentDTO[index];
      this.editCommentForm.get('commentId').setValue(currentCommentDTO.commentId);
      this.editCommentForm.get('commentContent').setValue(currentCommentDTO.commentContent);
      this.editCommentForm.get('commentImage').setValue(currentCommentDTO.commentImage);
      this.editCommentForm.get('food').setValue(this.food);
      this.editCommentForm.get('account').setValue(this.account);
      this.imageUrlFromLocalForEdit = this.editCommentForm.get('commentImage').value;
    }else{
      $('#' + editCommentId).show();
      $('#edit' + editCommentId).hide();
    }

    
  }

  async updateComment(index: number){
    this.loading = true;

    if(this.imageUrlFromLocalForEdit && this.imageUrlFromLocalForEdit != this.listCommentDTO[index].commentImage){
      await this.saveImagetoFirebaseForEdit();
    }else if(!this.imageUrlFromLocalForEdit){
      this.editCommentForm.get('commentImage').setValue(null);
    }

    this.commentService.updateComment(this.listCommentDTO[index].commentId, this.editCommentForm.value).subscribe(data => {
      this.imageUrlFromLocalForEdit = null;
      const newComment = new CommentDTO();
      newComment.commentId = data.commentId;
      newComment.commentContent = data.commentContent;
      newComment.commentImage = data.commentImage;
      newComment.commentTime = data.commentTime;
      newComment.accountId = data.account.accountId;
      newComment.customerAvatar = data.account.customer.customerAvatar;
      newComment.customerName = data.account.customer.customerName;
      newComment.foodId = data.food.foodId;
      newComment.ratingLevel = this.rating.ratingLevel;

      this.listCommentDTO[index] = newComment;
      this.loading = false;
    })
  }

  onDeleteComment(commentId: number){
    this.deleteCommentId = commentId;
  }

  deleteComment(){
    $('#exampleModal').modal('hide');
    this.commentService.deleteComment(this.deleteCommentId).subscribe(() =>{
      this.listCommentDTO = this.listCommentDTO.filter(commentDTO => commentDTO.commentId !== this.deleteCommentId);
    })
  }

  addToCart(){
    this.cartService.addNewFoodToCart(this.food);
  }

}
