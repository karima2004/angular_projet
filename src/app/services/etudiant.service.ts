import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etudiant } from '../components/etudiants/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:3001/etudiants';

  constructor(private http: HttpClient) {}

  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getEtudiantById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addEtudiant(etudiant: Etudiant): Observable<any> {
    return this.http.post(this.apiUrl, etudiant).pipe(catchError(this.handleError));
  }

  updateEtudiant(id: number, etudiant: Etudiant): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, etudiant).pipe(catchError(this.handleError));
  }

  deleteEtudiant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erreur détectée :', error);
    return throwError(() => new Error(error.error?.message || 'Erreur serveur. Veuillez réessayer plus tard.'));
  }
}
