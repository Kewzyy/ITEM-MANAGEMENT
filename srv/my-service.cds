using PIPELIFE as PIPELIFEITEMS from '../db/data-model';

service CatalogService {

entity PLITEMS @(
		title: '{i18n>taxiService}',
		Capabilities: {
			InsertRestrictions: {Insertable: true},
			UpdateRestrictions: {Updatable: true},
			DeleteRestrictions: {Deletable: true}
		}
	) as projection on PIPELIFEITEMS;     
     
  }
  
 