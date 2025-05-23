import "../Assets/css/userprofilestyles.css"; 
import profile from "../Assets/images/pfp_placeholder.png";
import placeholder from "../Assets/images/book-cover-placeholder.png";
import axios from "axios";
import { useEffect, useState } from "react";
import UserBookUpload from "./UserBookUpload";
import {jwtDecode} from 'jwt-decode';
import EditProfileForm from "../Forms/EditProfileForm";
import { useNavigate } from 'react-router-dom';

const hosting = "https://key-gertrudis-alhusseain-8243cb58.koyeb.app"
// const hosting = "http://localhost:8080"

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [role, setRole] = useState(null)
  const [numberofaddedbooks, setNumberOfAddedBooks] = useState(0);
  const [userReviews, setUserReviews] = useState([])
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    link.id = "bootstrap-css";
    document.head.appendChild(link);

    axios.get(`${hosting}/user/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      setData(response.data);
      const token = localStorage.getItem("token");
      if (token) {
        const decoded_token = jwtDecode(token);
        console.log(decoded_token);
        setRole(decoded_token.role);
      } else {
        console.error("No token found in localStorage");
      }
    })
    .catch((error) => {
      console.error("There was an error fetching the user data!", error);
    }); 

    axios.get(`${hosting}/user/numberofaddedbooks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }). then((response) => {
      setNumberOfAddedBooks(response.data.numberOfBooks);
    })
    .catch((error) => {
      console.error("There was an error fetching the number of added books!", error);
    });
    axios.get(`${hosting}/user/userReviews`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }). then((response) => {
      setUserReviews(response.data.reviews);
    })
    .catch((error) => {
      console.error("There was an error fetching the number of added books!", error);
    });
    return () => {
      const existing = document.getElementById("bootstrap-css");
      if (existing) existing.remove();
    };
  }, [isModalOpen]);
  
  return(
    <div className="row">
  <div className="col-lg-12">
    <div className="page-content">
      <div className="row">
        <div className="col-lg-12">
          <div className="main-profile">
            <div className="row">
              <div className="col-lg-3">
                <img
                  src={data["profile_pic"] || profile}
                  alt="Profile"
                  style={{ borderRadius: '23px' }}
                />
              </div>
              <div className="col-lg-4 align-self-center">
                <div className="main-info header-text">
                  <h4>{data["first_name"]} {data["last_name"]}</h4>
                  <p>{data["bio"]}</p>
                  <div className="main-button">
                    <a onClick={() => openModal()} style={{ marginRight: '10px' }}>Edit Info</a>
                    <a onClick={() => navigate("/stream")}>Go live</a>
                    {isModalOpen && (<EditProfileForm closeModal={closeModal} data={data} />)}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 align-self-center">
                <ul>
                  <li>Favorited books<span>{data["fav_books"]}</span></li>
                  <li>Listen later<span>{data["listen_later"]}</span></li>
                  <li>Reviews<span>{userReviews.length}</span></li>
                  <li>Uploaded books<span>{numberofaddedbooks}</span></li>
                </ul>
              </div>
            </div>
            {role === "admin" && <UserBookUpload />}
          </div>
        </div>
      </div>

      <div className="gaming-library profile-library">
        <div className="col-lg-12">
          <div className="heading-section">
            <h4>Your Reviews</h4>
            {userReviews.length === 0 ? (
              <p style={{ textDecorationColor: "grey" }}>You don't have any reviews yet</p>
            ) : (
              <div>
                {userReviews.map((review, index) => (
                  <div key={review.id} className={`item ${index === userReviews.length - 1 ? 'last-item' : ''}`}>
                    <ul>
                      <li>
                        <img src={review.audiobook.image} alt={review.audiobook.title} className="templatemo-item"/>
                      </li>
                      <li style={{marginRight: "50px"}}>
                        <h4>{review.audiobook.title}</h4>
                        <span>{review.audiobook.author}</span>
                      </li>
                      <li>
                        <h4>Rating</h4>
                        <span>{review.rating} / 10</span>
                      </li>
                      <li>
                        <h4>Review</h4>
                        <span>{review.review_text}</span>
                      </li>
                      <li>
                        <h4>Date Added</h4>
                        <span>{new Date(review.created_at).toLocaleDateString()}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)}

export default User