import { DataTypes, Model, Optional } from "sequelize";
import { dbConnection } from "../../config/config";

interface UserAttributes {
  id?: number;
  fullname?: string | null;
  email?: string | null;
  phone?: string | null;
  password?: string | null;
  accessToken?: string | null;
  isActive?: boolean | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public fullname!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public accessToken!: string;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    sequelize: dbConnection,
    underscored: false,
  }
);

//User.belongsTo(Role, { foreignKey: "roleId" });

export { User };
