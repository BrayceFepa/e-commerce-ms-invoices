import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Invoice, InvoiceRelations, ProductInvoice} from '../models';
import {ProductInvoiceRepository} from './product-invoice.repository';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.id,
  InvoiceRelations
> {

  public readonly invoiceHasManyProductInvoice: HasManyRepositoryFactory<ProductInvoice, typeof Invoice.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductInvoiceRepository') protected productInvoiceRepositoryGetter: Getter<ProductInvoiceRepository>,
  ) {
    super(Invoice, dataSource);
    this.invoiceHasManyProductInvoice = this.createHasManyRepositoryFactoryFor('invoiceHasManyProductInvoice', productInvoiceRepositoryGetter,);
    this.registerInclusionResolver('invoiceHasManyProductInvoice', this.invoiceHasManyProductInvoice.inclusionResolver);
  }
}
