import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Address from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(addressBody: any) {
    const newAddress = await this.addressRepository.create(addressBody);
    await this.addressRepository.save(newAddress);
    return newAddress;
  }

  getAllAddressesWithUsers() {
    return this.addressRepository.find({
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          email: true,
          name: true,
        },
      },
    });
  }
}
