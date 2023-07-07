import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface ResourceInterface {
  id?: string;
  title: string;
  content?: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface ResourceGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  company_id?: string;
}
