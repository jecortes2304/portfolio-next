import { model, models, Schema } from "mongoose";

const Project = new Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
        unique: true,
        min: 6,
        max: 255,
        trim: true
    },
    type: {
        type: String,
        required: [true, "The type is required"],
        min: 4,
        max: 255
    },
    banner_path: {
        type: String,
        required: [true, "The banner_path is required"],
    },
    logo: {
        type: String,
        required: false,
    },
    images_url: [{
        type: String,
        required: false,
    }],
    repository_url: {
        unique: true,
        type: String,
        required: true
    },
    publish_url: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["Development", "Finished", "Discontinued", "Deprecated", "Paused", "Maintenance"],
        required: true
    },
    tech_stack: [{
        type: String,
        required: true,
    }],
    description: {
        type: String,
        required: [true, "The description is required"],
        min: 50,
        max: 500
    },
}, {
    timestamps: true,
    versionKey: false
});

const ProjectModel = models.project || model('project', Project);

export default ProjectModel;