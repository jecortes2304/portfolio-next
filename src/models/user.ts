import { model, models, Schema } from "mongoose";

const User = new Schema({
    username: {
        type: String,
        required: [true, "The username is required"],
        unique:true,
        min: 6,
        max: 255,
        trim: true
    },
    name: {
        type: String,
        required: [true, "The name is required"],
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        unique:true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: [true, "The password is required"],
        minlength: 6
    },
    role: {
        ref: "roles",
        type: Schema.Types.ObjectId
    },
    img: {
        type: String,
        allowNull: true
    }
},{
    timestamps: true,
    versionKey: false
});

const UserModel = models.user || model('user', User);

export default UserModel;
