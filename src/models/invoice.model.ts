import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProductInvoice} from './product-invoice.model';

@model()
export class Invoice extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  consecutive: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  hour: number;

  @property({
    type: 'number',
    required: true,
  })
  id_client: number;

  @hasMany(() => ProductInvoice, {keyTo: 'id_invoice'})
  invoiceHasManyProductInvoice: ProductInvoice[];

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
