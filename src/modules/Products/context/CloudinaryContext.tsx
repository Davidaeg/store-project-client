import React, { PropsWithChildren } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';

type CloudinaryContexType = {
  cld: Cloudinary;
};

export const CloudinaryContex = React.createContext({} as CloudinaryContexType);

export const CloudinaryProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const cld = new Cloudinary({
    cloud: { cloudName: `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}` }
  }); //TODO: move to env

  return (
    <CloudinaryContex.Provider value={{ cld }}>
      {children}
    </CloudinaryContex.Provider>
  );
};
