import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
  ) {}

  create(dto: CreateAssetDto) {
    const asset = this.assetRepo.create(dto);
    return this.assetRepo.save(asset);
  }

  findAll() {
    return this.assetRepo.find({ order: { asset_id: 'ASC' } });
  }

  async findOne(id: number) {
    const asset = await this.assetRepo.findOneBy({ asset_id: id });
    if (!asset) {
      throw new NotFoundException(`Asset dengan id ${id} tidak ditemukan`);
    }
    return asset;
  }

  async update(id: number, dto: UpdateAssetDto) {
    const asset = await this.findOne(id);
    Object.assign(asset, dto);
    return this.assetRepo.save(asset);
  }

  async remove(id: number) {
    const asset = await this.findOne(id);
    await this.assetRepo.remove(asset);
    return {message: 'Asset berhasil dihapus' }
  }
}
