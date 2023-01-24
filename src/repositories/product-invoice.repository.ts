import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProductInvoice, ProductInvoiceRelations, Invoice} from '../models';
import {InvoiceRepository} from './invoice.repository';

export class ProductInvoiceRepository extends DefaultCrudRepository<
  ProductInvoice,
  typeof ProductInvoice.prototype.id,
  ProductInvoiceRelations
> {

  public readonly productInvoiceBelongstoinvoice: BelongsToAccessor<Invoice, typeof ProductInvoice.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>,
  ) {
    super(ProductInvoice, dataSource);
    this.productInvoiceBelongstoinvoice = this.createBelongsToAccessorFor('productInvoiceBelongstoinvoice', invoiceRepositoryGetter,);
    this.registerInclusionResolver('productInvoiceBelongstoinvoice', this.productInvoiceBelongstoinvoice.inclusionResolver);
  }
}
