// import React, { useState } from 'react';

// const ImageUploader = () => {
//   const [uploadedImage, setUploadedImage] = useState(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       setUploadedImage(reader.result);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className='mt-5 'style={{marginLeft:'300px'}}>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
      
//       {uploadedImage && (
//         <div>
//           <h2>Uploaded Image Preview</h2>
//           <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '50%',height:'50%' }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploader;








// import React, { useState } from 'react';
// import Cropper from 'react-easy-crop';

// const ImageCropper = () => {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       setUploadedImage(reader.result);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//     console.log(croppedArea, croppedAreaPixels);
//     // You can perform additional actions here, such as updating the state with cropped data
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />

//       {uploadedImage && (
//         <div>
//           <h2>Uploaded Image Preview</h2>
//           <Cropper
//             image={uploadedImage}
//             crop={crop}
//             zoom={zoom}
//             aspect={4 / 3} // Set your desired aspect ratio
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             onCropComplete={onCropComplete}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageCropper;


import React, { useState } from 'react';
import Cropper from 'react-easy-crop';

const ImageCropper = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    // You can use croppedAreaPixels to crop the image
  };

  const handleCrop = async () => {
    const croppedImage = await getCroppedImage();
    setCroppedImage(croppedImage);
  };

  const getCroppedImage = async () => {
    const canvas = document.createElement('canvas');
    const image = new Image();
    image.src = uploadedImage;
  
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    canvas.width = crop.width;
    canvas.height = crop.height;
  
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject('Failed to create blob from canvas.');
            return;
          }
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        },
        'image/jpeg',
        1 // Quality parameter
      );
    });
  };
  
  
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {uploadedImage && (
        <div>
          <h2>Uploaded Image Preview</h2>
          <div style={{ width: '500px', height: 'auto', margin: 'auto', position: 'relative' }}>
            <div style={{ width: '50%', height: '500px' }}>
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3} // Set your desired aspect ratio
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                containerSize={{ width: '50%', height: '40%' }} // Set the container size to occupy the desired area
              />
            </div>
          </div>
          <button onClick={handleCrop}>Crop Image</button>
        </div>
      )}

      {croppedImage && (
        <div>
          <h2>Cropped Image</h2>
          <img src={croppedImage} alt="Cropped" style={{ maxWidth: '50%', height: '400px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
