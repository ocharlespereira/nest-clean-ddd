import { UseCaseError } from '@/core/errors/use-case-error'

export class StudentAlreadyexistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student ${identifier} already exists.`)
  }
}
