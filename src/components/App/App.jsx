import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { featchPhotos } from "../../gallery-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Circles } from "react-loader-spinner";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

const App = () => {
  const [topic, setTopic] = useState("");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  //function for search images by value from searchbar(input)
  const handleInpSearchValue = async (newTopic) => {
    setDatas([]);
    setTopic(newTopic);
    setPage(1);
    // const data = await featchPhotos(newTopic, 1);
    // setDatas(data.results);
  };

  //function for button which load more images when u press her
  const handleLoadMore = () => {
    setPage(page + 1);
    if (totalPages <= page) {
      console.log("error");
    }
  };

  //function for open image in modal and set image for modal window
  const handleImageClick = (photo) => {
    setSelectedImage(photo);
    setModalIsOpen(true);
  };

  function closeModal() {
    setSelectedImage(null);
    setModalIsOpen(false);
  }

  useEffect(() => {
    // check topic
    if (topic === "") {
      return;
    }
    //function in useEfect for load more Photos and more...
    async function getMorePhotos() {
      try {
        //show loader while loading photos
        setLoading(true);
        const res = await featchPhotos(topic, page);
        console.log(res.results);
        //seted total pages for controled how many pages we get
        setTotalPages(res.total_pages);
        //copy photos and added new(one more page) and seted error as false bc we getted photos
        if (res.results.length === 0 && page === 1) {
          setError(true);
        } else {
          setDatas((prevDatas) => [...prevDatas, ...res.results]);
          setError(false);
        }
      } catch (error) {
        //setted error as true bc we getted some errors
        setError(true);
        toast.error("Error please reload page");
      } finally {
        // off loader anyway
        setLoading(false);
      }
    }
    getMorePhotos();
  }, [topic, page]);

  return (
    <div>
      <SearchBar onSubmit={handleInpSearchValue} />
      {loading && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}

      {modalIsOpen && selectedImage && (
        <ImageModal
          onClose={closeModal}
          photo={selectedImage}
          customStyles={customStyles}
        />
      )}
      {topic !== "" && totalPages >= page && (
        <ImageGallery photos={datas || []} onImageClick={handleImageClick} />
      )}
      {error && <ErrorMessage />}
      {datas.length > 0 && totalPages > 1 && page < totalPages && (
        <LoadMoreBtn onSubmit={handleLoadMore} />
      )}

      <Toaster position="top-right" />
    </div>
  );
};
export default App;
