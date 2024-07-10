import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropertyRepository } from '../../domain/repositories/property.repository.interface';
import { Property as DomainProperty } from '../../domain/entities/property.entity';
import { Property, PropertyDocument } from '../schemas/property.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoPropertyRepository implements PropertyRepository {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  private toDomainProperty(propertyDocument: PropertyDocument): DomainProperty {
    return new DomainProperty(
      propertyDocument._id.toString(),
      propertyDocument.address,
      propertyDocument.rentalPrice,
      propertyDocument.description,
    );
  }

  async save(property: DomainProperty): Promise<DomainProperty> {
    const createdProperty = new this.propertyModel({
      address: property.address,
      rentalPrice: property.rentalPrice,
      description: property.description,
    });
    const savedProperty = await createdProperty.save();
    return this.toDomainProperty(savedProperty);
  }

  async findById(id: string): Promise<DomainProperty | null> {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) return null;
    return this.toDomainProperty(property);
  }

  async findAll(): Promise<DomainProperty[]> {
    const properties = await this.propertyModel.find().exec();
    return properties.map(property => this.toDomainProperty(property));
  }

  async update(property: DomainProperty): Promise<DomainProperty> {
    const updatedProperty = await this.propertyModel.findByIdAndUpdate(
      property.id,
      {
        address: property.address,
        rentalPrice: property.rentalPrice,
        description: property.description,
      },
      { new: true },
    ).exec();
    return this.toDomainProperty(updatedProperty);
  }

  async delete(id: string): Promise<void> {
    await this.propertyModel.findByIdAndDelete(id).exec();
  }
}
