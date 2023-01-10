
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
      }
       setStatus('idle');
    }
    
     fetchData();
    
    // return ()=>{}
  },
    [page, query]);


  const  handleSubmit = search => {
    setQuery(search);
    setPage(1);
    setImages([]);
      };
  

  return (
    <>
       <NewSearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {status === 'loading' && <Spiner />}
    </>
  )
}

// export class App extends Component {
//   state = {
//     query: '',
//     status: 'idle',
//     page: 1,
//     images: [],
//     modalImg: '',
//   };


//   async componentDidUpdate(_, prevState) {
//     const { page, query } = this.state;
  
//       if (prevState.query !== query || prevState.page !== page) {
//          try {
//         this.setState({ status: 'loading' })
//         const res = await fetchImages(query, page);
//         if (res.total === 0) {
//           toast.error(
          //   'Sorry, there are no images matching your search query. Please try again.'
          // );
//         }
//          this.setState(prevState => ({
//            images: [...prevState.images, ...res.hits],
//            status: 'finished'
//          }));
//       }
//      catch (error) {
//            toast.error('Oops! Something went wrong! Please try again.');
//            }
//            this.setState({ status: 'idle' });
//   }
//   }


//      handleSubmit = search => {
//       this.setState({
//         query: search,
//         page: 1,
//       images: [],
//       });
//   };

 

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   toggleModal = (image) => {
//     this.setState({ modalImg: image });
//   }

//   render() {
//     const { images, status, modalImg } = this.state;
//     console.log({images});
//     return (
//       <div>
//         <NewSearchBar onSubmit={this.handleSubmit} />
//         <ImageGallery images={images} onClick={this.toggleModal} />
//         {status === 'loading' && <Spiner />}
//         {status === 'finished' && <Button loadMore={this.loadMore} />}
//         {modalImg && <Modal image={modalImg} onClose={this.toggleModal} />}
//         <ToastContainer />
//       </div>
//     );
//   }
// }



