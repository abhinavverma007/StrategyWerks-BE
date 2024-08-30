import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Doctor} from '../models';

export class DoctorRepository extends DefaultCrudRepository<
  Doctor,
  typeof Doctor.prototype.id
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Doctor, dataSource);
  }
}
