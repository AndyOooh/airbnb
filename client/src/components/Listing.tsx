import { FaBed, FaDollarSign, FaShower, FaStar } from 'react-icons/fa';
import { BiBed } from 'react-icons/bi';

type ListingProps = {
  listing: {
    name: string;
    images: {
      picture_url: string;
    };
    review_scores: {
      review_scores_rating: number;
    };
    address: {
      country: string;
      market: string;
    };
    beds: number;
    bathrooms: {
      $numberDecimal: number;
    };
    price: {
      $numberDecimal: number;
    };
  };
};

function Listing({ listing }: ListingProps) {
  const title = listing.name.length > 30 ? `${listing.name.slice(0, 30)}...` : listing.name;
  return (
    <article className="listing_card">
      <div className="h-60 w-full rounded-lg overflow-hidden">
        <img src={listing.images?.picture_url} alt="" className="object-cover" />
      </div>
      <div className="flex flex-col gap-2 px-4 pt-1 pb-2">
        <div className="flex text-sm justify-between">
          <p>
            {listing.address.country}, {listing.address.market}
          </p>
          <div className="flex justify-center items-center gap-1">
            <FaStar className=" text-gray-700" />
            {listing.review_scores.review_scores_rating / 10 || 'No reviews'}
          </div>
        </div>
        <p className="w-full text-center font-semibold"> {title} </p>
        <div className="flex items-center gap-2">
          <FaShower className="text-md text-gray-700" />
          {Math.floor(listing.bathrooms.$numberDecimal)} bathrooms
        </div>
        <div className="flex items-center gap-2">
          <FaBed className="text-md text-gray-700" />
          {listing.beds} beds
        </div>
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-md text-gray-700" />$
          {Math.floor(listing.price.$numberDecimal)} per night
        </div>
      </div>
    </article>
  );
}

export default Listing;
