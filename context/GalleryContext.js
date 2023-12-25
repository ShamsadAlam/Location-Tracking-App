import React, { useState, createContext } from "react";

const ProjectGalleryContext = createContext();

export const ProjectGalleryProvider = ({ children }) => {
  const [gallery, setGallery] = useState([]);

  return (
    <ProjectGalleryContext.Provider value={{ gallery, setGallery }}>
      {children}
    </ProjectGalleryContext.Provider>
  );
};

export default ProjectGalleryContext;
