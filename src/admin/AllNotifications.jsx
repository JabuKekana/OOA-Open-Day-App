import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("notifications");
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "notifications", id));
    toast.success("Notification Deleted Successfully");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <h3 className="py-5">Loading...</h3>
                  ) : (
                    productsData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.notificationName}</td>
                        <td>
                          {item.timestamp ? (
                            item.timestamp.toDate().toLocaleString()
                          ) : (
                            // Display a placeholder if timestamp is missing
                            "N/A"
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              deleteProduct(item.id);
                            }}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
