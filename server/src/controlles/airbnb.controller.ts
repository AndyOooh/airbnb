import { Request, Response } from 'express';
import { collections } from '../config/mongoose';

const getListings = async (req: Request, res: Response) => {
  console.log('hi from getListings');
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 6;
  const sort = (req.query.sort as string) || 'price';
  console.log(
    '🚀 ~ file: airbnb.controller.ts ~ line 9 ~ sort',
    sort,
    typeof sort,
  );

  const skip: number = (page - 1) * perPage;
  const query = {};
  const totalMatches = await collections.abbListings?.countDocuments(query);

  const listings = await collections.abbListings
    ?.find({}, { allowDiskUse: true })
    .sort(sort, -1)
    .allowDiskUse()
    .skip(skip)
    .limit(+perPage)
    .toArray();
  return res.json({ listings, totalMatches });
};

export default getListings;
