import type { NextApiRequest, NextApiResponse } from 'next';
import { InsertOneResult, MongoClient, ObjectId } from 'mongodb';

type incomingData = {
  email?: string;
  name?: string;
  message?: string;
  id?: ObjectId;
};

type outData = {
  message: string;
  msg?: incomingData;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<outData>) => {
  if ((req.method = 'POST')) {
    const { email, name, message } = req.body as incomingData;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage: incomingData = { email, name, message };

    let client: MongoClient;

    const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.wee0h.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
    //const connectionString = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-shard-00-00.wee0h.mongodb.net:27017,cluster0-shard-00-01.wee0h.mongodb.net:27017,cluster0-shard-00-02.wee0h.mongodb.net:27017/${process.env.MONGODB_DATABASE}?ssl=true&replicaSet=atlas-c61772-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: (error as { message: string }).message });
      return;
    }

    const db = client.db();

    let result: InsertOneResult;
    try {
      result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: 'Storing data failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', msg: newMessage });
    return;
  }
};

export default handler;
