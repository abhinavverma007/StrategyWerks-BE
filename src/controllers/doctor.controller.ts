import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';

import {Doctor} from '../models';
import {DoctorRepository} from '../repositories';

const basePath = `/doctors`;
export class DoctorController {
  constructor(
    @repository(DoctorRepository)
    public doctorRepository: DoctorRepository,
  ) {}

  @post(`${basePath}`)
  @response(200, {
    description: 'Doctor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Doctor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doctor, {
            title: 'NewDoctor',
            exclude: ['id'],
          }),
        },
      },
    })
    doctor: Omit<Doctor, 'id'>,
  ): Promise<Doctor> {
    return this.doctorRepository.create(doctor);
  }

  @post(`${basePath}/bulk`)
  @response(200, {
    description: 'Doctor model instance',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Doctor),
        },
      },
    },
  })
  async createAll(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Doctor, {exclude: ['id']}),
          },
        },
      },
    })
    doctor: Omit<Doctor, 'id'>[],
  ): Promise<Doctor[]> {
    return this.doctorRepository.createAll(doctor);
  }

  @get(`${basePath}/count`)
  @response(200, {
    description: 'Doctor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Doctor) where?: Where<Doctor>): Promise<Count> {
    return this.doctorRepository.count(where);
  }

  @get(`${basePath}`)
  @response(200, {
    description: 'Array of Doctor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Doctor, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Doctor) filter?: Filter<Doctor>): Promise<Doctor[]> {
    return this.doctorRepository.find(filter);
  }

  @patch(`${basePath}`)
  @response(200, {
    description: 'Doctor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doctor, {partial: true}),
        },
      },
    })
    doctor: Doctor,
    @param.where(Doctor) where?: Where<Doctor>,
  ): Promise<Count> {
    return this.doctorRepository.updateAll(doctor, where);
  }

  @get(`${basePath}/{id}`)
  @response(200, {
    description: 'Doctor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Doctor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Doctor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Doctor>,
  ): Promise<Doctor> {
    return this.doctorRepository.findById(id, filter);
  }

  @patch(`${basePath}/{id}`)
  @response(204, {
    description: 'Doctor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doctor, {partial: true}),
        },
      },
    })
    doctor: Doctor,
  ): Promise<void> {
    await this.doctorRepository.updateById(id, doctor);
  }

  @del(`${basePath}/{id}`)
  @response(204, {
    description: 'Doctor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.doctorRepository.deleteById(id);
  }
}
