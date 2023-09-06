import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import addNotification from "react-push-notification";

const AddNotifications = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterNotificationMsg, setEnterNotificationMsg] = useState("");
  const [enterProductImg, setEnterProductImg] = useState("null");
  const [loading, setLoading] = useState(false);
  const currentTime = new Date();
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await collection(db, "notifications");

      // Set isOpened to false for the new notification
      const notificationData = {
        notificationName: enterTitle,
        notificationMsg: enterNotificationMsg,
        timestamp: currentTime,
        isOpened: false,
      };

      const storageRef = ref(
        storage,
        `productImages/${Date.now() + enterProductImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        () => {
          toast.error("Images upload unsuccessful");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, notificationData);
          });
        }
      );

      // New notification with isOpened set to false
      addNotification({
        title: "Notification Title",
        subtitle: "Notification Subtitle (optional)",
        message: "Qurtuba Online Academy Sent A Message",
        theme: "darkblue",
        native: true,
        duration: 9000,
      });

      setLoading(false);
      toast.success("Notifications successfully added");
      navigate("/dashboard/all-notifications");
    } catch (err) {
      setLoading(false);
      toast.error("Notifications not added, please try again");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5 ">Loading....</h4>
            ) : (
              <>
                <h4>Send Notification</h4>
                <br />
                <br />
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Subject</span>
                    <input
                      type="text"
                      placeholder="Enter message subject"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Message</span>
                    <input
                      type="text"
                      placeholder="Enter your message"
                      value={enterNotificationMsg}
                      onChange={(e) =>
                        setEnterNotificationMsg(e.target.value)
                      }
                      required
                    />
                  </FormGroup>

                  <p>Time: {currentTime.toString()}</p>

                  <button className="buy__btn">Send Notification</button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddNotifications;
