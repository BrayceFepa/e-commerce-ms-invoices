import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Invoice} from './invoice.model';

@model(/*{
  settings: {
    foreignKeys: {
      fk_product_invoice_id_invoice: {
        name: "fk_product_invoice_id_invoice",
        entity: 'Invoice',
        entityKey: 'id',
        foreignKey: 'id_invoice',
      }
    },
  },
}*/)
export class ProductInvoice extends Entity {
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
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  unit_price: number;

  @property({
    type: 'number',
    required: true,
  })
  id_product: number;

  @belongsTo(() => Invoice, {name: 'productInvoiceBelongstoinvoice'})
  id_invoice: number;

  constructor(data?: Partial<ProductInvoice>) {
    super(data);
  }
}

export interface ProductInvoiceRelations {
  // describe navigational properties here
}

export type ProductInvoiceWithRelations = ProductInvoice & ProductInvoiceRelations;
