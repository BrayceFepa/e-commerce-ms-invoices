import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductInvoice,
  Invoice,
} from '../models';
import {ProductInvoiceRepository} from '../repositories';

export class ProductInvoiceInvoiceController {
  constructor(
    @repository(ProductInvoiceRepository)
    public productInvoiceRepository: ProductInvoiceRepository,
  ) { }

  @get('/product-invoices/{id}/invoice', {
    responses: {
      '200': {
        description: 'Invoice belonging to ProductInvoice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Invoice)},
          },
        },
      },
    },
  })
  async getInvoice(
    @param.path.number('id') id: typeof ProductInvoice.prototype.id,
  ): Promise<Invoice> {
    return this.productInvoiceRepository.productInvoiceBelongstoinvoice(id);
  }
}
