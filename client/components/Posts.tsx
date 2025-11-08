import React, { useState } from "react";
import "./styles.css";

interface Data {
  id: number;
  created_at: string;
  user_id: number | null;
  country: string;
  category: string | null;
  text: string | null;
  image: string | null;
}

interface PostsProps {
  countries?: Data[];
}

const Posts: React.FC<PostsProps> = ({ countries }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    category: "",
    text: "",
    image: "",
  });

  console.log(countries, " !!! ");

  // const list = [
  //   { country: "Armenia", food: "Dolma" },
  //   { country: "Japan", food: "omurice" },
  //   { country: "Japan", food: "yakitori" },
  // ];

  const countryfilter = countries?.map((item) => {
    return item.country;
  });
  console.log(countryfilter);

  const newSet = new Set([...countryfilter]);
  console.log(newSet);
  // const countryfilter = list?.map((item) => {
  //   return item.country;
  // });
  // console.log(countryfilter);

  // const newSet = new Set([...countryfilter]);
  // console.log(newSet);

  // const addS = Array.from(newSet).map((country) => {
  //   return country + "s";
  // });

  // console.log(addS);
  interface set {
    newSet: String;
  }
  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>Post</button>

      {showForm && (
        <div className="popup">
          <form className="post-form">
            <h2>Create a Post</h2>

            <label>Country</label>
            <select name="country">
              <option value="">Choose a country</option>
              {Array.from(newSet)?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label>Category</label>
            <select name="category">
              <option value="Food">Food</option>
              <option value="Customs">Customs</option>
              <option value="Games">Games</option>
              <option value="Rituals">Rituals</option>
              <option value="Media">Media</option>
            </select>
            <textarea placeholder="Title" />

            <textarea placeholder="" />
            <button> Upload Media </button>
            <button type="submit" id="submitbutton">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Posts;
