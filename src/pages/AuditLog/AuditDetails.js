import React from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";


const AuditDetails = ({ data, isOpen, closeCallback }) => {

    const formatDataValues = value => {
        let item = JSON.parse(value);
        return  JSON.stringify(item, null, 4);
    };

    return (
        <Modal show={isOpen} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title> Audit Log Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        {
                            Object.keys(data).map(function (property, idx) {
                                return (
                                    <Row key={property} style={{
                                        borderBottom: '1px dotted gray',
                                        marginTop: '10px'
                                    }}>
                                        <Col>
                                            <h5><b>{property} :</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                {
                                                    (property === 'old_values' || property === 'new_values') ?
                                                        <pre dangerouslySetInnerHTML={{
                                                            __html: formatDataValues(data[property]),
                                                        }} />  : `${data[property]}`
                                                }
                                            </h5>
                                        </Col>
                                    </Row>
                                );
                            })
                        }
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeCallback}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AuditDetails;
