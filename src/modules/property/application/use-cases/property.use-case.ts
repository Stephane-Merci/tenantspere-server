import { Inject, Injectable } from '@nestjs/common';
import { PropertyRepository } from '../../domain/repositories/property.repository.interface';
import { Property } from '../../domain/entities/property.entity';
import { CreatePropertyDto, UpdatePropertyDto } from '../../domain/dto/property.dto';

@Injectable()
export class PropertyUseCases {
  constructor(
    @Inject('PropertyRepository')
    private readonly propertyRepository: PropertyRepository,
  ) {}

  async createProperty(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = new Property(
      null,
      createPropertyDto.address,
      createPropertyDto.rentalPrice,
      createPropertyDto.description,
    );
    return this.propertyRepository.save(property);
  }

  async getPropertyById(id: string): Promise<Property | null> {
    return this.propertyRepository.findById(id);
  }

  async getAllProperties(): Promise<Property[]> {
    return this.propertyRepository.findAll();
  }

  async updateProperty(updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    const property = new Property(
      updatePropertyDto.id,
      updatePropertyDto.address,
      updatePropertyDto.rentalPrice,
      updatePropertyDto.description,
    );
    return this.propertyRepository.update(property);
  }

  async deleteProperty(id: string): Promise<void> {
    return this.propertyRepository.delete(id);
  }
}
