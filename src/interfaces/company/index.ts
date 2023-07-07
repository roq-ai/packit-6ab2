import { CatalogInterface } from 'interfaces/catalog';
import { ProjectInterface } from 'interfaces/project';
import { ResourceInterface } from 'interfaces/resource';
import { ReviewInterface } from 'interfaces/review';
import { SupplierInterface } from 'interfaces/supplier';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  catalog?: CatalogInterface[];
  project?: ProjectInterface[];
  resource?: ResourceInterface[];
  review?: ReviewInterface[];
  supplier?: SupplierInterface[];
  user?: UserInterface;
  _count?: {
    catalog?: number;
    project?: number;
    resource?: number;
    review?: number;
    supplier?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
