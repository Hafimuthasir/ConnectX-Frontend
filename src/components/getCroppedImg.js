export const getCroppedImg = async (imageSrc, pixelCrop, outputPixelRatio) => {
    const image = new Image();
    image.src = imageSrc;
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    const pixelRatio = window.devicePixelRatio || 1;
  
    canvas.width = pixelCrop.width * pixelRatio * outputPixelRatio;
    canvas.height = pixelCrop.height * pixelRatio * outputPixelRatio;
  
    image.onload = () => {
      ctx.drawImage(
        image,
        pixelCrop.x * pixelRatio,
        pixelCrop.y * pixelRatio,
        pixelCrop.width * pixelRatio,
        pixelCrop.height * pixelRatio,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };
  
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(URL.createObjectURL(blob));
        },
        'image/jpeg',
        1
      );
    });
  };
  