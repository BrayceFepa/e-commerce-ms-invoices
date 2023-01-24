import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Invoice,
  ProductInvoice,
} from '../models';
import {InvoiceRepository} from '../repositories';

export class InvoiceProductInvoiceController {
  constructor(
    @repository(InvoiceRepository) protected invoiceRepository: InvoiceRepository,
  ) { }

  @get('/invoices/{id}/product-invoices', {
    responses: {
      '200': {
        description: 'Array of Invoice has many ProductInvoice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductInvoice)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProductInvoice>,
  ): Promise<ProductInvoice[]> {
    return this.invoiceRepository.invoiceHasManyProductInvoice(id).find(filter);
  }

  @post('/invoices/{id}/product-invoices', {
    responses: {
      '200': {
        description: 'Invoice model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductInvoice)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Invoice.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductInvoice, {
            title: 'NewProductInvoiceInInvoice',
            exclude: ['id'],
            optional: ['id_invoice']
          }),
        },
      },
    }) productInvoice: Omit<ProductInvoice, 'id'>,
  ): Promise<ProductInvoice> {
    return this.invoiceRepository.invoiceHasManyProductInvoice(id).create(productInvoice);
  }

  @patch('/invoices/{id}/product-invoices', {
    responses: {
      '200': {
        description: 'Invoice.ProductInvoice PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductInvoice, {partial: true}),
        },
      },
    })
    productInvoice: Partial<ProductInvoice>,
    @param.query.object('where', getWhereSchemaFor(ProductInvoice)) where?: Where<ProductInvoice>,
  ): Promise<Count> {
    return this.invoiceRepository.invoiceHasManyProductInvoice(id).patch(productInvoice, where);
  }

  @del('/invoices/{id}/product-invoices', {
    responses: {
      '200': {
        description: 'Invoice.ProductInvoice DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductInvoice)) where?: Where<ProductInvoice>,
  ): Promise<Count> {
    return this.invoiceRepository.invoiceHasManyProductInvoice(id).delete(where);
  }
}
