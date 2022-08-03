import React from "react";
import { Button, Card, Table } from "react-bootstrap";

const Datatable = ({ data }) => {
    return (
        <Card>
            <Card.Body className="m-0 p-0">
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
                        data.length ?
                            data.map((info, idx) =>
                                <tr key={idx}>
                                    <td> {info.ip} </td>
                                    <td> {info.label} </td>
                                    <td>
                                        <Button variant="warning" type="button">
                                            Update
                                        </Button>
                                    </td>
                                </tr>
                            ) : <></>
                    }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Datatable;
