import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@config/database';

interface StoreAdAttributes {
  id: number;
  storeId: number;
  templateId: string;
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  placement: 'banner' | 'between_products';
  textPosition?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  textColor?: string;
  textFont?: string;
  mainTextSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  subTextSize?: 'xs' | 'sm' | 'base';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type StoreAdCreationAttributes = Optional<StoreAdAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class StoreAd extends Model<StoreAdAttributes, StoreAdCreationAttributes> implements StoreAdAttributes {
  declare id: number;
  declare storeId: number;
  declare templateId: string;
  declare title: string;
  declare description: string;
  declare imageUrl?: string;
  declare linkUrl?: string;
  declare placement: 'banner' | 'between_products';
  declare textPosition?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  declare textColor?: string;
  declare textFont?: string;
  declare mainTextSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  declare subTextSize?: 'xs' | 'sm' | 'base';
  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

StoreAd.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'store_id',
      references: {
        model: 'stores',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    templateId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'template_id',
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'image_url',
    },
    linkUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'link_url',
    },
    placement: {
      type: DataTypes.ENUM('banner', 'between_products'),
      allowNull: false,
      defaultValue: 'banner',
    },
    textPosition: {
      type: DataTypes.ENUM('top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'),
      allowNull: true,
      defaultValue: 'center',
      field: 'text_position',
    },
    textColor: {
      type: DataTypes.STRING(7),
      allowNull: true,
      defaultValue: '#ffffff',
      field: 'text_color',
    },
    textFont: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'Cairo-SemiBold',
      field: 'text_font',
    },
    mainTextSize: {
      type: DataTypes.ENUM('sm', 'base', 'lg', 'xl', '2xl'),
      allowNull: true,
      defaultValue: 'lg',
      field: 'main_text_size',
    },
    subTextSize: {
      type: DataTypes.ENUM('xs', 'sm', 'base'),
      allowNull: true,
      defaultValue: 'base',
      field: 'sub_text_size',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    modelName: 'StoreAd',
    tableName: 'store_ads',
    timestamps: true,
    underscored: false,
  }
);

export default StoreAd;
