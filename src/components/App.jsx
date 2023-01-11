
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { NewSearchBar } from './Searchbar/Searchbar';
import { fetchImages } from '../Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spiner } from './Spiner/Spiner';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [modalImg, setModalImg] = useState('');
  

  useEffect(() => {
     if (query === '') {
      setStatus('idle');
      return;
    }
  
    const fetchData = async () => {
      try {
        setStatus('loading');
        const res = await fetchImages(query, page);
        if (res.total === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setImages(prevState => [...prevState, ...res.hits]);
        setStatus('finished');
      }
      catch (error) {
       toast.error('Oops! Something went wrong! Please try again.');
        setStatus('idle');
      }
    }
     fetchData();
    
  }, [page, query]);


  const  handleSubmit = search => {
    setQuery(search);
    setPage(1);
    setImages([]);
      };
  
 const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = (image) => {
    setModalImg( image );
  }

  return (
    <>
      <div>
       <NewSearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} onClick={toggleModal}/>
      {status === 'loading' && <Spiner />}
      {images.length > 11 && <Button loadMore={loadMore} />}
      {modalImg && <Modal image={modalImg} onClose={toggleModal} />}
        <Toaster />
        </div>
    </>
  )
}


