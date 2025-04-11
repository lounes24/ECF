// Modèle pour la table DISPONIBILITE
export class Disponibilite {
  constructor(series_id, platforms_id, date_ajout, id = null) {
    this.id = id;
    this.series_id = series_id;
    this.platforms_id = platforms_id;
    this.date_ajout = date_ajout;
  }

  // Méthode statique pour transformer les données en un format valide
  static fromDbRow(row) {
    return new Disponibilite(row.series_id, row.platforms_id, row.date_ajout, row.id);
  }

  // Méthode pour convertir une instance de la classe en un objet simple
  toObject() {
    return {
      id: this.id,
      series_id: this.series_id,
      platforms_id: this.platforms_id,
      date_ajout: this.date_ajout,
    };
  }

  // Méthode statique pour transformer une ligne de la base de données en une instance avec les détails de la série et de la plateforme
  static fromDbRowWithDetails(row) {
    return {
      series_id: row.series_id,
      platforms_id: row.platforms_id,
      date_ajout: row.date_ajout,
      series_title: row.series_title, // Titre de la série
      platform_name: row.platform_name, // Nom de la plateforme
    };
  }
}
