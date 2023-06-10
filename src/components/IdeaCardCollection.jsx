import IdeaCard from "./IdeaCard";

const IdeaCardCollection = ({ currentItems }) => {
  
    return (
      <>
        {currentItems.map((item) => (
          <IdeaCard key={item.id} item={item} />
        ))}
      </>
    );
  };

  export default IdeaCardCollection