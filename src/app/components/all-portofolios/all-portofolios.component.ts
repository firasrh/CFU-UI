import { Component, Input, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Portfolio } from 'src/app/models/Portfolio';
import { CoinService } from 'src/app/services/coin.service';
@Component({
  selector: 'app-all-portofolios',
  templateUrl: './all-portofolios.component.html',
  styleUrls: ['./all-portofolios.component.css'],
})
export class AllPortofoliosComponent implements OnInit {
  portfolios: any = [];
  currentUserSubject: BehaviorSubject<User>;
  currentUserId: string = '';
  closeResult = '';
  portfolioForm: FormGroup;
  @Input() currentPortfolio: Portfolio = {
    name: '',
  };
  UserCoins: any = [];
  id: string = '';
  name: string = '';
  userID: string = '';
  searchTerm = '';
  term = '';
  Allcategories: string[] = [];
  categoriess: string[] = [];
  elements: any = [];
  show: boolean = false;
  categ = new FormControl();
  constructor(
    private fb: FormBuilder,
    private portfolio: PortfolioService,
    private router: Router,
    public dialog: MatDialog,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private coin: CoinService
  ) {}

  ngOnInit(): void {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserId = this.currentUserSubject.value.id;
    this.getUserPortfolios();
    this.getAllCatgories();
    this.portfolioForm = this.formBuilder.group({
      name: ['', Validators.required],
      userID: this.currentUserSubject.value.id,
    });
  }
  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        console.log(event.source.value);
        this.categoriess.push(event.source.value);
        console.log(this.categoriess);
        console.log(this.portfolios);
        this.elements = this.portfolios.filter(
          (element: { id: string; categories: string[] }) =>
            element.categories.some((el) => {
              return this.categoriess.includes(el);
            })
        );
        console.log(this.elements);
        if (this.categoriess.length > 0) {
          this.show = true;
        }
      } else {
        console.log(event.source.value);
        for (var i = 0; i < this.categoriess.length; i++) {
          if (this.categoriess[i] === event.source.value) {
            this.categoriess.splice(i, 1);
            this.reloadCurrentRoute();
          }
        }
        if (this.categoriess.length === 0) {
          this.show = false;
        }
      }
    }
  }

  getUserPortfolios() {
    this.portfolio
      .getUserPortfolios(this.currentUserId)
      .subscribe((content: any) => {
        this.portfolios = content;
        this.portfolios.forEach(
          (element: {
            coinsIDs: string[];
            id: string;
            name: string;
            userID: string;
            categories: string[];
            cat: string[];
          }) => {
            for (let item of element.coinsIDs) {
              this.coin.getCurrencyById(item).subscribe((res) => {
                element.categories = res.categories.filter(
                  (element: string) => {
                    return element !== null;
                  }
                );
                if (element.categories.length > 3) {
                  element.cat = element.categories.slice(3);
                }
              });
            }
          }
        );
        console.log(this.portfolios);
      });
  }

  getAllCatgories() {
    this.coin.getCatgeories().subscribe((content: any) => {
      for (let item of content) this.Allcategories.push(item.name);
    });
    console.log(this.Allcategories);
  }
  gotoDetails(item: any) {
    this.router.navigate(['portfolio', item.id]);
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  deletePortfolio(id: any) {
    this.portfolio.deletePortfolio(id).subscribe({
      next: (res) => {},
      error: (e) => console.error(e),
    });
    this.reloadCurrentRoute();
  }

  openDelete(contentDelete: any, id: any) {
    this.modalService
      .open(contentDelete, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'yes') {
            this.deletePortfolio(id);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openUpdate(contentUpdate: any, id: any) {
    this.portfolio.getPortfolioCoins(id).subscribe({
      next: (data) => {
        this.currentPortfolio = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
    this.modalService
      .open(contentUpdate, { ariaLabelledBy: 'modal-basic-title2' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'save') {
            const data = {
              name: this.currentPortfolio.name,
            };
            this.portfolio.updatePortfolio(id, data).subscribe({
              next: (res) => {
                console.log(res);
              },
              error: (e) => console.error(e),
            });
            this.reloadCurrentRoute();
            this.portfolioForm.reset();
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.portfolioForm.reset();
        }
      );
  }
  openAdd(contentAdd: any) {
    this.modalService
      .open(contentAdd, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'save') {
            console.log(this.portfolioForm.value);
            this.portfolio.createPortfolio(this.portfolioForm.value).subscribe({
              next: (res) => {},
              error: () => {},
            });
          }
          this.reloadCurrentRoute();
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
