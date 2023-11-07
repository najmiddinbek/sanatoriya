import { Schema, model } from "mongoose";

const RoomsSchema = new Schema({
    selectOptionCost: { type: String, required: true },
    selectOptionType: { type: String, required: true },
    selectOptionDay: { type: String, required: true },
    Rooms: { type: Schema.Types.ObjectId, ref: 'Rooms' }
}, { timestamps: true });

const Room = model("Room", RoomsSchema)
export default Room