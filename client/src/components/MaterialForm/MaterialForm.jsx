import plus from "../../public/plus.png";

const MaterialForm = () => {
  return (
    <div>
      <form>
        <input placeholder="Your Material Brand"></input>
        <input placeholder="Your Material"></input>
        <button>
          <img src={plus}></img>
        </button>
      </form>
    </div>
  );
};

export default MaterialForm;
