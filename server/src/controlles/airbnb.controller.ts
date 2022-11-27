import { Request, Response } from 'express';
import { collections } from '../config/mongoose';

const getListings = async (req: Request, res: Response) => {
  console.log('hi from getListings');
  const { page, perPage } = req.query;
  if (!page || !perPage) {
    return res.status(400).send('Missing page or perPage query params');
  }
  const skip: number = (+page - 1) * +perPage;

  const query = {};
  const totalMatches = await collections.abbListings?.countDocuments(query);
  console.log(
    '🚀 ~ file: airbnb.controller.ts ~ line 13 ~ totalMatches',
    totalMatches,
  );

  const listings = await collections.abbListings
    ?.find()
    .skip(skip)
    .limit(+perPage)
    .toArray();
  return res.json({ listings, totalMatches });
};

export default getListings;
