import React from "react";
import { Button, Card, Table } from "react-bootstrap";

const Datatable = ({
                       data,
                       columns,
                       handleEditCallback= undefined,
                       handleDetailsCallback= undefined,
                       actions = []
}) => {

    // id column won't show in the table
    const getColumn = item => {
        const tds = [];

        for (const property in item) {
            if (property !== 'id' && property != 'created_at') {
                tds.push(<td key={property} style={{ whiteSpace: 'pre' }}>{item[property]}</td>);
            }
        }

        return tds;
    };


    return (
        <Card>
            <Card.Body className="m-0 p-0">
                { data.length ?
                    <Table striped bordered hover size="sm" className="mb-0 pb-0">
                        <thead>
                        <tr>
                            {
                                columns.map((col, idx) =>
                                    <th key={idx}> {col} </th>
                                )
                            }
                            {
                                actions.length ?  <th> Actions </th> : <></>
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item, idx) =>
                                <tr key={idx}>
                                    { getColumn(item) }
                                    {
                                        actions.includes('update') ?
                                            <td>
                                                <Button size="sm" variant="warning" type="button"
                                                        onClick={() => handleEditCallback(item.id)}>
                                                    Update
                                                </Button>
                                            </td> : <></>
                                    }
                                    {
                                        actions.includes('details') ?
                                            <td>
                                                <Button size="sm" variant="info" type="button"
                                                        onClick={() => handleDetailsCallback(item.id)}>
                                                    Details
                                                </Button>
                                            </td> : <></>
                                    }
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
