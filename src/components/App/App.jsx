import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import 'modern-normalize';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreBtnHidden, setIsLoadMoreBtnHidden] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    setIsLoading(true);
    setIsLoadMoreBtnHidden(false);

    async function fetchData() {
      const BASE_URL = 'https://pixabay.com/api/';
      const MY_KEY = '32997819-c25a939264b27cca8c9e33adb';

      try {
        const resp = await axios.get(
          `${BASE_URL}?q=${searchValue}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        let totalHits = resp.data.totalHits;

        if (totalHits === 0) {
          toast.error(
            'Sorry, the request did not return a result. Please try again.',
            {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            }
          );
          setIsLoading(false);
          setItems([]);
          return;
        } else {
          if (page === 1) {
            setItems([...resp.data.hits]);
          } else {
            setItems(prevState => [...prevState, ...resp.data.hits]);
          }
          setIsLoading(false);
        }

        if (page * 12 >= totalHits) {
          setIsLoadMoreBtnHidden(true);
          toast.success("All results found.", {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [page, searchValue]);

  const handleFormSubmit = searchValue => {
    setSearchValue(searchValue);
    setPage(1);
  };

  const btnLoadMoreClick = () => {
    setIsLoading(true);
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && (
        <div className={css.vortexWrapper}>
          <Loader />
        </div>
      )}

      <ImageGallery items={items} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {items.length !== 0 && (
        <div hidden={isLoadMoreBtnHidden} className={css.vortexWrapper}>
          {!isLoading ? <Button onClick={btnLoadMoreClick} /> : <Loader />}
        </div>
      )}
    </>
  );
};

