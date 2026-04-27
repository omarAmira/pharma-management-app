export interface Patient {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance: string;   // LocalDate côté Java → string côté Angular
  numeroDossier: string;
  numeroTlf: string;
 
  qrCode?: string;   // <-- nouveau champ
}
