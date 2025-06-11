import { Component, OnInit } from '@angular/core';
import { Etudiant } from './etudiant.model';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {
  etudiants: Etudiant[] = [];
  newEtudiant: Etudiant = {
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    date_naissance: '',
    filiere: ''
  };
  modifier: boolean = false;
  searchText: string = '';

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.chargerEtudiants();
  }

  get etudiantsFiltres() {
    return this.etudiants.filter(et =>
      Object.values(et).some(val =>
        val?.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }

  chargerEtudiants() {
    this.etudiantService.getEtudiants().subscribe(response => {
      this.etudiants = response;
    });
  }

 enregistrer() {
  console.log("📤 Données envoyées :", this.newEtudiant);
  
  if (this.modifier && this.newEtudiant.id != null) {
    this.etudiantService.updateEtudiant(this.newEtudiant.id, this.newEtudiant).subscribe(() => {
      this.chargerEtudiants();
      this.resetForm();
    });
  } else {
    const { id, ...etudiantSansId } = this.newEtudiant;
  this.etudiantService.addEtudiant(etudiantSansId).subscribe(() => {
    this.chargerEtudiants();
    this.resetForm();
    });
  }
}


  supprimer(id: number) {
    this.etudiantService.deleteEtudiant(id).subscribe(() => this.chargerEtudiants());
  }

  editer(et: Etudiant) {
    this.newEtudiant = { ...et };
    this.modifier = true;
  }

 resetForm() {
  this.newEtudiant = {
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    date_naissance: '',
    filiere: ''
  } as Etudiant; // forcer le cast pour enlever l'id
  this.modifier = false;
}


}
