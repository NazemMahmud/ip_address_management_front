import React from "react";
import { Button, Card, Table } from "react-bootstrap";

const Datatable = ({ data, handleEditCallback }) => {
    return (
        <Card>
            <Card.Body className="m-0 p-0">
                { data.length ?
                    <Table striped bordered hover size="sm" className="mb-0 pb-0">
                        <thead>
                        <tr>
                            <th>IP Address</th>
                            <th>Label</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((info, idx) =>
                                <tr key={idx}>
                                    <td> {info.ip} </td>
                                    <td> {info.label} </td>
                                    <td>
                                        <Button size="sm" variant="warning" type="button"
                                                onClick={() => handleEditCallback(info.id)}>
                                            Update
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table> :
                    <div className="justify-content-center align-items-center p-5">
                        <h2> No Data Found </h2>
                    </div>
                }

            </Card.Body>
        </Card>
    );
};

export default Datatable;
