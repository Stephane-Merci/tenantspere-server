import { Property } from '../entities/property.entity';

export interface PropertyRepository {
  save(property: Property): Promise<Property>;
  findById(id: string): Promise<Property | null>;
  findAll(): Promise<Property[]>;
  update(property: Property): Promise<Property>;
  delete(id: string): Promise<void>;
}
