import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './infrastructure/schemas/property.schema';
import { MongoPropertyRepository } from './infrastructure/repositories/property.repository';
import { PropertyUseCases } from './application/use-cases/property.use-case';
import { PropertyController } from './presentation/controllers/property.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }])],
  controllers: [PropertyController],
  providers: [
    PropertyUseCases,
    { provide: 'PropertyRepository', useClass: MongoPropertyRepository },
  ],
})
export class PropertyModule {}
