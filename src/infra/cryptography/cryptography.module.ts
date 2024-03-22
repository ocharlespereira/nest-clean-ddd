import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HasheComparer } from '@/domain/forum/application/cryptography/hasher-compare'
import { HashGenerator } from '@/domain/forum/application/cryptography/hasher-generator'
import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HasheComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HasheComparer, HashGenerator],
})
export class CryptographyModule {}
