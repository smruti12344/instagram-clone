import { useState } from "react";
import useShowToasta from "./useShowToasta";

function usePreviewImg() {
  const [selectImg, setSelectImg] = useState(null);
  const showToast = useShowToasta();
  const maxImgSizeinBytes = 2 * 1024 * 1024; // 2MB

  const handleImgChange = (e) => {
    const img = e.target.files[0];
      //restricted for choose image  and size
    if (img && img.type.startsWith("image/")) {
      if (img.size > maxImgSizeinBytes) {
        showToast("Error", "File size must be less than 2MB", "error");
        setSelectImg(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectImg(reader.result);
      };
      reader.onerror = () => {
        showToast("Error", "Failed to read the file", "error");
        setSelectImg(null);
      };

      reader.readAsDataURL(img);
    } else {
      showToast("Error", "Please select an image file", "error");
      setSelectImg(null);
    }
  };

  return { selectImg, handleImgChange, setSelectImg };
}

export default usePreviewImg;
