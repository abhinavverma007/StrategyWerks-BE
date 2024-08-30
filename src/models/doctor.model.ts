import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'doctor',
})
export class Doctor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    name: 'name',
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    name: 'specialization',
  })
  specialization: string;

  @property({
    type: 'string',
    name: 'phone_number',
  })
  phoneNumber?: string;

  @property({
    type: 'string',
    name: 'location',
  })
  location?: string;

  @property({
    type: 'number',
    name: 'rating',
  })
  rating?: number;

  @property({
    type: 'number',
    name: 'consultation_fee',
  })
  consultationFee?: number;

  constructor(data?: Partial<Doctor>) {
    super(data);
  }
}
