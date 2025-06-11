import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
// Si t’as d’autres composants (ajouter/edit), importeهم هنا

const routes: Routes = [
  { path: '', redirectTo: 'etudiants', pathMatch: 'full' },
  { path: 'etudiants', component: EtudiantsComponent },
  // { path: 'edit/:id', component: EditEtudiantComponent },
  // { path: 'ajouter', component: AjouterEtudiantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
