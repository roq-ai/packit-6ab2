import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface CatalogInterface {
  id?: string;
  name: string;
  description?: string;
  recyclability?: boolean;
  compostability?: boolean;
  reduced_carbon_footprint?: boolean;
  company_id?: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface CatalogGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  company_id?: string;
}
