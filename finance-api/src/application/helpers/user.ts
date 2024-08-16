import { isUUID } from 'class-validator';

export const checkIdIsValid = (id: string): boolean => isUUID(id);
