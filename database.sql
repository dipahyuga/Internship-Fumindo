CREATE TABLE asset (
	asset_id	SERIAL PRIMARY KEY,
	asset_name	VARCHAR(100) NOT NULL,
	stock_quantity	INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
	category	VARCHAR(20) NOT NULL CHECK (category IN ('Consumable', 'Non-Consumable'))
);