export abstract class HasheComparer {
  abstract hash(plain: string): Promise<string>
}
