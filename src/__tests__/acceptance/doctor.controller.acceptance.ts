import {Client, expect} from '@loopback/testlab';

import {NewApplication} from '../..';
import {Doctor} from '../../models';
import {DoctorRepository} from '../../repositories';
import {setupApplication} from './test-helper';
import {Filter} from '@loopback/repository';

describe('Doctor Controller', function () {
  let app: NewApplication;
  let client: Client;
  let doctorRepository: DoctorRepository;
  const basePath = '/doctors';

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  before(givenRepositories);

  after(async () => {
    await app.stop();
  });

  it('gives status 200 when doctor instance is sent', async () => {
    const doctor = new Doctor({
      consultationFee: 500,
      location: 'Delhi',
      phoneNumber: '34343443',
      name: 'birla',
      specialization: 'Cardio',
      rating: 4,
    });
    await client.post(`${basePath}`).send(doctor).expect(200);
  });

  it('gives status 200 when bulk doctor instance is sent', async () => {
    const doctor = [
      new Doctor({
        consultationFee: 500,
        location: 'Delhi',
        phoneNumber: '34343443',
        name: 'birla',
        specialization: 'Cardio',
        rating: 4,
      }),
      new Doctor({
        consultationFee: 600,
        location: 'Delhi2',
        phoneNumber: '438483',
        name: 'kjfdjk',
        specialization: 'Physi0',
        rating: 2,
      }),
    ];
    await client.post(`${basePath}/bulk`).send(doctor).expect(200);
  });

  it('gives status 200 when doctor count is asked', async () => {
    const doctor = new Doctor({
      consultationFee: 500,
      location: 'Delhi',
      phoneNumber: '34343443',
      name: 'birla',
      specialization: 'Cardio',
      rating: 4,
    });
    await doctorRepository.create(doctor);
    const countResponse = await client.get(`${basePath}/count`);
    expect(countResponse.body).to.have.property('count');
  });

  it('gives status 200 when doctor query is asked', async () => {
    const doctor = new Doctor({
      consultationFee: 500,
      location: 'Delhi',
      phoneNumber: '34343443',
      name: 'birla',
      specialization: 'Cardio',
      rating: 4,
    });
    const response = await doctorRepository.create(doctor);
    await client.get(`${basePath}/${response.id}`).expect(200);
  });

  it('gives status 200 when all doctor names  are updated', async () => {
    const doctor = new Doctor({
      consultationFee: 500,
      location: 'Delhi',
      phoneNumber: '34343443',
      name: 'birla',
      specialization: 'Cardio',
      rating: 4,
    });
    await doctorRepository.create(doctor);
    await client
      .patch(`${basePath}`)
      .send({
        name: 'bilu',
      })
      .expect(200);
  });

  it('gives status 204 when specific doctor names  is updated', async () => {
    const doctor = new Doctor({
      consultationFee: 500,
      location: 'Delhi',
      phoneNumber: '34343443',
      name: 'birla',
      specialization: 'Cardio',
      rating: 4,
    });
    const response = await doctorRepository.create(doctor);
    await client
      .patch(`${basePath}/${response.id}`)
      .send({
        name: 'kilu',
      })
      .expect(204);
  });

  it('gives status 204 when specific doctor name is deleted', async () => {
    const doctor = new Doctor({
      consultationFee: 500,
      location: 'Delhi',
      phoneNumber: '34343443',
      name: 'birla',
      specialization: 'Cardio',
      rating: 4,
    });
    const response = await doctorRepository.create(doctor);
    await client.del(`${basePath}/${response.id}`).expect(204);
  });

  it('gives status 200 when specific doctor query is filtered', async () => {
    const doctor = new Doctor({
      consultationFee: 500,
      location: 'Delhi',
      phoneNumber: '34343443',
      name: 'birla',
      specialization: 'Cardio',
      rating: 4,
    });
    await doctorRepository.create(doctor);
    const filter: Filter<Doctor> = {
      where: {
        consultationFee: 500,
      },
    };
    await client
      .get(`${basePath}`)
      .query({
        filter: JSON.stringify(filter),
      })
      .expect(200);
  });

  async function givenRepositories() {
    doctorRepository = await app.getRepository(DoctorRepository);
  }
});
