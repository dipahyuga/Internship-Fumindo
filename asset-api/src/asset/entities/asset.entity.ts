import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('asset')
export class Asset {
    @PrimaryGeneratedColumn()
    asset_id: number;

    @Column({ type: 'varchar', length: 100 })
    asset_name: string;

    @Column({ type: 'int', default: 0 })
    stock_quantity: number;

    @Column({ type: 'varchar', length: 20 })
    category: 'Consumable' | 'Non-Consumable';
}