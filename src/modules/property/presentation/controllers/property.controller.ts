import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { CreatePropertyDto, UpdatePropertyDto } from '../../domain/dto/property.dto';
import { Property } from '../../domain/entities/property.entity';
import { PropertyUseCases } from '../../application/use-cases/property.use-case';

@Controller('api/main/properties')
export class PropertyController {
  constructor(private readonly propertyUseCases: PropertyUseCases) {}

  @Post()
  async createProperty(@Body() createPropertyDto: CreatePropertyDto): Promise<Property> {
    return this.propertyUseCases.createProperty(createPropertyDto);
  }

  @Get(':id')
  async getPropertyById(@Param('id') id: string): Promise<Property | null> {
    return this.propertyUseCases.getPropertyById(id);
  }

  @Get()
  async getAllProperties(): Promise<Property[]> {
    return this.propertyUseCases.getAllProperties();
  }

  @Put()
  async updateProperty(@Body() updatePropertyDto: UpdatePropertyDto): Promise<Property> {
    return this.propertyUseCases.updateProperty(updatePropertyDto);
  }

  @Delete(':id')
  async deleteProperty(@Param('id') id: string): Promise<void> {
    return this.propertyUseCases.deleteProperty(id);
  }
}
