import {Schema, models, model} from "mongoose";

const Role = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  permissions: [String]
},{
  versionKey: false
});

const RoleModel = models.roles || model('roles', Role);

export default RoleModel;