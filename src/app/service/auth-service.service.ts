import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  public isBuy: boolean = false;
  public BuyForm!: FormGroup;
  public favorites = [];
  public cart = [];
  public couponIsActive: boolean = false; // Set to true if user exists, false otherwise
  public category: string = 'all';
  constructor() {}
}
