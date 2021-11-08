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
    try {
      client = await MongoClient.connect(
        'mongodb+srv://nextjs-admin:dlrlxw6jNMRLRDn4@cluster0.wee0h.mongodb.net/nextjs?retryWrites=true&w=majority',
      );
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database' });
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
