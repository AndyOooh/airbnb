import { useEffect, useState } from 'react';
import api from '../api/axios.config';
import Listing from './Listing';

type Listingtype = {
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

function Listings() {
  const [listings, setListings] = useState<Listingtype[]>([]);
  const [perPage, setPerPage] = useState(6);
  console.log('🚀 ~ file: Listings.tsx ~ line 29 ~ perPage', perPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMatches, setTotalMatches] = useState(0);

  const getListings = async (_page: number): Promise<void> => {
    try {
      const { data } = await api.get(`/airbnb?page=${_page}&perPage=${perPage}`);
      console.log('🚀 ~ file: Listings.tsx ~ line 12 ~ data', data);
      setListings(data.listings);
      setTotalMatches(+data.totalMatches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListings(currentPage);
  }, [perPage]);

  const handlePageChange = (button: string) => {
    switch (button) {
      case 'first':
        getListings(1);
        setCurrentPage(1);
        break;
      case 'last':
        getListings(Math.floor(totalMatches / perPage));
        setCurrentPage(Math.floor(totalMatches / perPage));
        break;
      case 'next':
        getListings(currentPage + 1);
        setCurrentPage((prev) => prev + 1);
        break;
      case 'prev':
        getListings(currentPage - 1);
        setCurrentPage((prev) => prev - 1);
        break;

      default:
        break;
    }
  };

  const handleSort: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    const { value } = e.target;
    switch (value) {
      case 'cheapest':
        setListings([...listings].sort((a, b) => a.price.$numberDecimal - b.price.$numberDecimal));
        break;
      case 'expensive':
        setListings([...listings].sort((a, b) => a.price.$numberDecimal + b.price.$numberDecimal));
        break;
      case 'rating':
        setListings(
          [...listings].sort(
            (a, b) => a.review_scores.review_scores_rating - b.review_scores.review_scores_rating,
          ),
        );
        break;
      case 'bathrooms':
        setListings(
          [...listings].sort((a, b) => a.bathrooms.$numberDecimal - b.bathrooms.$numberDecimal),
        );
        break;
      case 'beds':
        setListings([...listings].sort((a, b) => a.beds - b.beds));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <p>Listings matching your criteria: {totalMatches}</p>
      <div className="w-full flex justify-between items-center">
        <p>
          You are on page {currentPage} of {Math.floor(totalMatches / perPage)}
        </p>
        <nav className="flex gap-4 mb-2 text-lg font-semibold ">
          <button
            type="button"
            onClick={() => handlePageChange('first')}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            type="button"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="underline">{currentPage}</span>
          <button
            type="button"
            onClick={() => handlePageChange('next')}
            disabled={currentPage * perPage === totalMatches}
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => handlePageChange('last')}
            disabled={currentPage * perPage === totalMatches}
          >
            Last
          </button>
        </nav>
        <div className="flex gap-4">
          <div>
            <label htmlFor="sort">
              Sort
              <select name="sort" id="sort" onChange={handleSort}>
                <option value="rating">Rating</option>
                <option value="cheapest">Cheapest</option>
                <option value="expensive">Most expensive</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="perPage">
              Per page
              <select name="perPage" id="perPage" onChange={(e) => setPerPage(+e.target.value)}>
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="listings_grid ">
        {listings?.map((listing) => (
          <Listing key={listing.name} listing={listing} />
        ))}
      </div>
    </>
  );
}

export default Listings;
