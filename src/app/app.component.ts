import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title: string = 'Multi HTTP requests in Angular with RxJS';
  private apiUrl: string = 'https://swapi.co/api';
  public singleRequestResult: any;
  public multiRequestResult: any;
  public mergeMapResult: any;
  public forkJoinResult: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('ádfasdflk');
    this.singleRequest();
    this.multiRequests();
    this.multiRequestsWithMergeMap();
    this.multiRequestsWithForkJoin();
  }

  private singleRequest(): void {
    this.http.get(`${this.apiUrl}/people/1`).subscribe((character) => {
      this.singleRequestResult = character;
    });
  }

  private multiRequests(): void {
    this.http.get(`${this.apiUrl}/people/1`).subscribe((character) => {
      this.http.get(character['homeworld']).subscribe((homeworld) => {
        this.multiRequestResult = homeworld;
      });
    });
  }

  private multiRequestsWithMergeMap(): void {
    this.http
      .get(`${this.apiUrl}/people/1`)
      .pipe(mergeMap((character) => this.http.get(character['homeworld'])))
      .subscribe((homeworld) => {
        this.mergeMapResult = homeworld;
      });
  }

  private multiRequestsWithForkJoin(): void {
    forkJoin([
      this.http.get(`${this.apiUrl}/people/1`),
      this.http.get(`${this.apiUrl}/planets/1`),
    ]).subscribe((res) => {
      this.forkJoinResult = res;
    });
  }
}
