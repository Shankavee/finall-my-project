import { Component, OnInit } from '@angular/core';
import { MonetizationService } from '../services/monetization.service';

@Component({
  selector: 'app-monetization',
  standalone: false,
  templateUrl: './monetization.component.html',
  styleUrls: ['./monetization.component.css']
})
export class MonetizationComponent implements OnInit {
  revenueSharingData: any[] = [];
  promotionalCodes: any[] = [];
  payments: any[] = [];
  newCode: string = '';
  newDiscount: number = 0;

  constructor(private monetizationService: MonetizationService) {}

  ngOnInit(): void {
    this.loadRevenueSharing();
    this.loadPromotionalCodes();
    this.loadPayments();
  }

  loadRevenueSharing() {
    this.monetizationService.getRevenueSharing().subscribe((data) => {
      this.revenueSharingData = data;
    });
  }

  loadPromotionalCodes() {
    this.monetizationService.getPromotionalCodes().subscribe((data) => {
      this.promotionalCodes = data;
    });
  }

  addPromotionalCode() {
    this.monetizationService.addPromotionalCode(this.newCode, this.newDiscount).subscribe(() => {
      this.loadPromotionalCodes();
      this.newCode = '';
      this.newDiscount = 0;
    });
  }

  loadPayments() {
    const userId = '123'; // Replace with dynamic user ID
    this.monetizationService.getPaymentDashboard(userId).subscribe((data) => {
      this.payments = data;
    });
  }
}
