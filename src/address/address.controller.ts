import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() addressBody: any) {
    return this.addressService.create(addressBody);
  }

  @Get()
  findAll() {
    return this.addressService.getAllAddressesWithUsers();
  }
}
