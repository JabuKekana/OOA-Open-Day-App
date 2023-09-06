import React from "react";
import { motion } from "framer-motion";
import "../../styles/notification-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const NotificationsCard = ({ item }) => {
  // const dispatch = useDispatch();

  // const addToCart = () => {
  //   dispatch(
  //     cartActions.addItem({
  //       id: item.id,
  //       notificationName: item.notificationName,
  //       price: item.price,
  //       timestamp: item.currentTime,
  //     })
  //   );

  //   toast.success("Notification Sent Succesfully");
  // };

  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/notifications/${item.id}`}>
              {item.notificationName}
              <br />
              <span className="timestamp">
                {item.timestamp
                  ? item.timestamp.toDate().toLocaleString()
                  : // Display a placeholder if timestamp is missing
                    "N/A"}
              </span>
            </Link>
          </h3>
          <span>{item.category}</span>
        </div>
      </div>
    </Col>
  );
};

export default NotificationsCard;
