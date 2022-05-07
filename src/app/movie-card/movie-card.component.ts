import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openSynopsisViewDialog(movie: any): void {
    console.log(movie);
    this.dialog.open(SynopsisViewComponent, {
      width: '800px',
      data: movie
    })
  }

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favoriteMovies = response.Favorite_Movies;
      console.log(this.favoriteMovies);
    })
  }

  isFavorite(data: any): boolean {
    return this.favoriteMovies.includes(data);
  }

  addToFavorites(movie: string, title: string): void {
    this.fetchApiData.addToFavorites(movie).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open(
        `${title} has been added to your favorites!`, 'OK', { duration: 2000 }
      );
    })
    this.ngOnInit();
  }

  removeFromFavorites(movie: string, title: string): void {
    this.fetchApiData.removeFromFavorites(movie).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open(
        `${title} has been removed from your favorites`, 'OK', { duration: 2000 }
      );
    })
    this.ngOnInit();
  }

  favoritesList(movie: string, title: string): void {
    this.isFavorite(movie) ? this.removeFromFavorites(movie, title) : this.addToFavorites(movie, title)
  }
}
