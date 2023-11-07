import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    yangiFoydalanuvchiIsmi: { type: String, required: true },
    yangiFoydalanuvchiFamilyasi: { type: String, required: true },
    yangiFoydalanuvchitelefonRaqami: { type: Number, required: true, unique: true },
    yangifoydalanuvchiYoshi: { type: Number, required: true },
    yashashManzili: { type: String, required: true },
    batafsilMalumot: { type: String, required: true },
    selectOptionJins: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Bemor = model("Bemor", UserSchema)

export default Bemor