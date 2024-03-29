import User from '../../users/entities/user.entity';

const mockedUser: User = {
  id: 1,
  email: 'user@email.com',
  phoneNumber: '841111111111',
  isPhoneNumberConfirmed: false,
  name: 'John',
  password: 'hash',
  address: {
    id: 1,
    street: 'streetName',
    city: 'cityName',
    country: 'countryName',
  },
  isTwoFactorAuthenticationEnabled: false,
  isRegisteredWithGoogle: false,
  created_at: new Date(),
  updated_at: new Date(),
};

export default mockedUser;
