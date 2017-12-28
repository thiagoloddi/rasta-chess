export default function buyer(Schema) {
	return new Schema({
    move: { type: String, required: true },
    board: { type: String, required: true },
    winner: { type: String, required: true },
    captured: { type: String, default: null },
    isCheck: { type: Boolean, default: false },
    isCheckmate: { type: Boolean, default: false },
    isRepetition: { type: Boolean, default: false },
    isStalemate: { type: Boolean, default: false },
    W: { type: Number, default: 0 },
    B: { type: Number, default: 0 },
    D: { type: Number, default: 0 },
	});
}
