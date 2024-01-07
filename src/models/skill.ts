import { model, models, Schema } from "mongoose";

const Skill = new Schema({
  name: {
    type: String,
    required: true
  },
  percent: {
    type: Number,
    required: true
  },
  logo: {
    type: String,
    required: false,
    allowNull: true
  },
},{
  timestamps: true,
  versionKey: false
});

const SkillModel = models.skills || model('skills', Skill);

export default  SkillModel;