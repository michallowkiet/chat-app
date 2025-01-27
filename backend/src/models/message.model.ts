import { IMessage } from '@/types/types.js';
import { Model, model, Schema } from 'mongoose';

const messageSchema = new Schema<IMessage, Model<IMessage>>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Message = model('Message', messageSchema);

export default Message;
