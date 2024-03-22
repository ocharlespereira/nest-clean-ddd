import { HasheComparer } from '@/domain/forum/application/cryptography/hasher-compare'
import { HashGenerator } from '@/domain/forum/application/cryptography/hasher-generator'

export class FakeHasher implements HashGenerator, HasheComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
