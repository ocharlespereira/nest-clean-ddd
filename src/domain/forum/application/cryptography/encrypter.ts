export abstract class Encrypter {
  abstract encrypt(payload: Record<string, unknown>): Promise<string> // Reacord = key and value ("name": "node")
}
